var React = require('react');

var Player = React.createClass({
    render() {
        return (
        	<div className={"rounded mb1 p1 raise-1 "+ this.props.data.teamId}>
            <h4>Player</h4>
            <div className="flex-container">
	            <div className="flex-item col-xs-6">
	            	<div>Name: {this.props.data.name}</div>
	            	<div>Id: {this.props.data.id}</div>
	            </div>
	            <div className="flex-item col-xs-6">
	            	<div>Rank: {this.props.data.tier}</div>
	            	<div>Role: {this.props.data.lane}</div>
	            </div>
	          </div>
          </div>
        );
    }
});

module.exports = Player;