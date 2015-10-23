require 'sinatra/base'
require 'sinatra/config_file'
require 'redis'
require 'oj'
require 'net/http'
require 'uri'
require 'pry'
require 'json'
require 'active_support'

Oj.default_options = {mode: :object }

class GameData

end

class RiotWrapper < Sinatra::Base
	register Sinatra::ConfigFile
	config_file("conf.yml")

	base_params = {api_key: settings.API_KEY}
	redis = Redis.new

	get '/game/latest/:summoner_id' do
		req = URI("https://na.api.pvp.net/api/lol/na/v2.2/matchlist/by-summoner/#{params[:summoner_id]}")
		req.query = URI.encode_www_form(base_params.merge!({beginIndex: 0, endIndex: 1}))

		resp = Net::HTTP.get_response(req)
		latest_match_id = JSON(resp.body)["matches"].first["matchId"]
		if redis.get(params[:summoner_id]) == latest_match_id.to_s
			304 
		else
			redis.set(params[:summoner_id], latest_match_id)
			[200, Oj.dump({id: latest_match_id})]
		end
	end

	get '/game/:match_id' do
		req = URI("https://na.api.pvp.net/api/lol/na/v2.2/match/#{params[:match_id]}")
		req.query = URI.encode_www_form(base_params)

		resp = Net::HTTP.get_response(req)
		Oj.load(resp.body)
	end
end