var _ = require('lodash');

var Helpers = {
	massageData: function(matchData){
		var players = [];
		_.forEach(matchData["participants"], function(p){
			var player = _.merge(p, {});
			var identity = _.find(matchData.participantIdentities, {"participantId": p.participantId}).player;
			player["name"] = identity["summonerName"];
			player["id"] = identity["summonerId"];
			players.push(player);
		});
		return {"players": players};
	}
}

module.exports = Helpers;