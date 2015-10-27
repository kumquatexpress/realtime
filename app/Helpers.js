var _ = require('lodash');

var Helpers = {
	massageData: function(matchData){
		var players = [];
		_.forEach(matchData["participants"], function(p){
			var player = _.merge(p, {});
			var identity = _.find(matchData.participantIdentities, {"participantId": p.participantId}).player;
			player["name"] = identity["summonerName"];
			player["id"] = identity["summonerId"];
			player["teamId"] = player["teamId"] == 100 ? "blueTeam" : "redTeam";
			players.push(player);
		});
		return {"players": players, "matchId": matchData.matchId};
	}
}

module.exports = Helpers;