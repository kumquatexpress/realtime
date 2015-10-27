var React = require('react');
var Player = require('./Player.jsx');
var _ = require('lodash');

var Widget = React.createClass({
  getDefaultProps() {
    return {
        summoner: Object()
    };
  },
  shouldComponentUpdate(nextProps, nextState) {
    return true;//this.props.summoner.matchData || nextProps.summoner.matchData.matchId != this.props.summoner.matchData.matchId;
  },
  render() {
    var redPlayers;
    var bluePlayers;
    if(this.props.summoner.matchData){
      redPlayers = _.map(_.filter(this.props.summoner.matchData.players, {"teamId": "redTeam"}), function(player){
        return (
          <Player data={player} key={player.id}/>
        );
      });
      bluePlayers = _.map(_.filter(this.props.summoner.matchData.players, {"teamId": "blueTeam"}), function(player){
        return (
          <Player data={player} key={player.id}/>
        );
      });
    }
    return (
      <div className="flex-item col-sm-12 summoner">
        <h4>Summoner: {this.props.summoner.name}</h4>
        <div className="flex-container pb1 px1">
          <div className="flex-item col-xs-12">
            {redPlayers}
          </div>
          <div className="flex-item col-xs-12">
            {bluePlayers}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Widget;