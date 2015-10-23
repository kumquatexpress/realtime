require 'sinatra/base'
require 'sinatra/config_file'
require 'redis'
require 'oj'
require 'net/http'
require 'uri'
require 'pry'
require 'json'
require 'active_support'

Oj.default_options = {mode: :object}

class RiotWrapper
  def initialize(api_key)
    @base_params = {api_key: api_key}
    @base_url = "https://na.api.pvp.net/api/lol/na/v2.2"
  end

  def get_latest_match_for_summoner(summoner_id)
    req = URI("#{@base_url}/matchlist/by-summoner/#{summoner_id}")
    req.query = URI.encode_www_form(@base_params.merge!({beginIndex: 0, endIndex: 1}))
    resp = Net::HTTP.get_response(req)
    
    validate_and_respond(resp){ JSON(resp.body)["matches"].first["matchId"] }
  end

  def get_match_details(match_id)
    req = URI("#{@base_url}/match/#{match_id}")
    req.query = URI.encode_www_form(@base_params)
    resp = Net::HTTP.get_response(req)
    
    validate_and_respond(resp){ resp.body }
  end

  def validate_and_respond(resp, &data)
    if resp.kind_of? Net::HTTPSuccess
      yield
    else
      raise "#{resp.code} encountered from riot for #{resp.uri}"
    end
  end
end

class Procs < Sinatra::Base
  register Sinatra::ConfigFile
  config_file("conf.yml")

  redis = Redis.new
  riot_api = RiotWrapper.new(settings.API_KEY)

  get '/game/latest/:summoner_id' do
    latest_match_id = riot_api.get_latest_match_for_summoner(params[:summoner_id])
    if redis.get(params[:summoner_id]) == latest_match_id.to_s
      304 
    else
      redis.set(params[:summoner_id], latest_match_id)
      [200, riot_api.get_match_details(latest_match_id)]
    end
  end
end
