require 'sinatra/base'
require 'sinatra/config_file'
require 'redis'
require 'oj'
require 'net/http'
require 'uri'
require 'pry'
require 'json'
require 'active_support'
require 'sqlite3'
require 'sequel'
require_relative './api/riot_wrapper.rb'

Oj.default_options = {mode: :object}

class Procs < Sinatra::Base
  register Sinatra::ConfigFile

  config_file("conf.yml")
  # DB = Sequel.connect("sqlite://#{settings.DB_NAME}")
  redis = Redis.new
  riot_api = RiotWrapper.new(settings.API_KEY)
  # require_relative 'db/dao.rb'
  # DAO::setup(DB)
  set :public_folder, 'public'

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
    latest_match_id = riot_api.get_latest_match_for_summoner(params[:summoner_id])["matchId"]
    if redis.get(params[:summoner_id]) == latest_match_id.to_s
      304
    else
      redis.set(params[:summoner_id], latest_match_id)
      data = riot_api.get_match_details(latest_match_id)
      [200, data.to_json]
    end
  end

  get '/summoner/:name' do
    name = params[:name].downcase
    summ_id = redis.get(name)
    unless summ_id
      summ_id = riot_api.get_summoner_id(name)["id"]
      redis.set(name, summ_id)
    end
    [200, {id: summ_id}.to_json]
  end
end
