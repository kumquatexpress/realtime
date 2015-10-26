var React = require('react');
var Player = require('./Player.jsx');
var _ = require('lodash');

var Widget = React.createClass({
  getDefaultProps() {
    return {
        summoner: Object()
    };
  },
  render() {
    var matchPlayers;
    if(this.props.summoner.matchData){
      matchPlayers = _.map(this.props.summoner.matchData.players, function(player){
        return (
          <Player data={player}/>
        );
      });
    }
    return (
      <div>
        <div>Summoner: {this.props.summoner.name}</div>
        <div>
          <h4>Latest match data</h4>
          {matchPlayers}
        </div>
      </div>
    );
  }
});

module.exports = Widget;