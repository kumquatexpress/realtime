require 'sinatra/base'
require 'sinatra/config_file'
require 'redis'
require 'oj'
require 'net/http'
require 'uri'
require 'pry'
require 'json'
require 'active_support'
require 'ruby_sightstone'

Oj.default_options = {mode: :object}

class Procs < Sinatra::Base
  register Sinatra::ConfigFile
  set :public_folder, 'public'

  config_file("conf.yml")
  redis = Redis.new
  riot_api = RubySightstone.new(settings.API_KEY, "na")
  
  before "/*" do
    content_type :json
  end

  get "/" do
    redirect '/index.html'
  end

  error do
    content_type :json
    status 400

    e = env['sinatra.error']
    {:result => 'error', :message => e.message}.to_json
  end

  get '/game/latest/:summoner_id' do
    latest_match_id = riot_api.latest_match(params[:summoner_id])["matchId"]
    if redis.get(params[:summoner_id]) == latest_match_id.to_s
      [200, redis.get(latest_match_id)]
    else
      begin
        data = riot_api.match(latest_match_id)
        redis.set(params[:summoner_id], latest_match_id)
        redis.set(latest_match_id, data.to_json)
        [200, data.to_json]
      rescue RiotAPIException => e
        redis.del(params[:summoner_id])
        redis.del(latest_match_id)
        raise "Wasn't able to access the Riot API #{e}"
      end
    end
  end

  get '/summoner/:name' do
    name = params[:name].downcase
    summ_id = redis.get(name)
    unless summ_id
      begin
        summ_id = riot_api.summoner(name)[name]["id"]
        redis.set(name, summ_id)
      rescue RiotAPIException => e
        redis.del(name)
        raise "Wasn't able to access the Riot API #{e}"
      end
    end
    [200, {id: summ_id}.to_json]
  end
end
