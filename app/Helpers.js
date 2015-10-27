var _ = require('lodash');

var Helpers = {
	massageData: function(matchData){
		var players = [];
		_.forEach(matchData["participants"], function(p){
			var player = {};
			var identity = _.find(matchData.participantIdentities, {"participantId": p.participantId}).player;
			player.name = identity.summonerName;
			player.id = identity.summonerId;
			player.teamId = p.teamId == 100 ? "blueTeam" : "redTeam";
			player.lane = p.timeline.lane;
			player.role = p.timeline.role;
			player.tier = p.highestAchievedSeasonTier;
			player.champion = p.championId;
			player.stats = p.stats;
			players.push(player);
		});
		return {"players": players, "matchId": matchData.matchId};
	}
}

module.exports = Helpers;