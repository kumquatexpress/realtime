require 'pry'
class RiotWrapper
  def initialize(api_key, region="na")
    @base_params = {api_key: api_key}
    @base_url = "https://na.api.pvp.net/api/lol"
    @region = region
  end

  def get_latest_match_for_summoner(summoner_id)
    req = URI("#{@base_url}/#{@region}/v2.2/matchlist/by-summoner/#{summoner_id}")
    req.query = URI.encode_www_form(@base_params.merge!({beginIndex: 0, endIndex: 1}))
    resp = Net::HTTP.get_response(req)

    validate_and_respond(resp){ JSON(resp.body)["matches"].first }
  end

  def get_static_data(type, id)
    req = URI("#{@base_url}/static-data/#{@region}/v1.2/#{type}")
    req.query = URI.encode_www_form(@base_params.merge!({beginIndex: 0, endIndex: 1}))
    resp = Net::HTTP.get_response(req)
    
    validate_and_respond(resp){ JSON(resp.body)["matches"].first["matchId"] }    
  end

  def get_match_details(match_id)
    req = URI("#{@base_url}/#{@region}/v2.2/match/#{match_id}")
    req.query = URI.encode_www_form(@base_params)
    resp = Net::HTTP.get_response(req)
    
    validate_and_respond(resp){ JSON(resp.body) }
  end

  def get_summoner_id(name)
    req = URI("#{@base_url}/#{@region}/v1.4/summoner/by-name/#{name}")
    req.query = URI.encode_www_form(@base_params)
    resp = Net::HTTP.get_response(req) 
    
    validate_and_respond(resp){ JSON(resp.body)[name] }
  end

  def validate_and_respond(resp, &data)
    if resp.kind_of? Net::HTTPSuccess
      yield
    else
      raise "#{resp.code} encountered from riot for #{resp.uri}"
    end
  end
end
