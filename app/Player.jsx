var React = require('react');

var Player = React.createClass({
    render() {
        return (
        	<div className={"rounded mb1 p1 raise-1 "+ this.props.data.teamId}>
            <h4>Player</h4>
            <div>Name: {this.props.data.name}</div>
            <div>Id: {this.props.data.id}</div>
          </div>
        );
    }
});

module.exports = Player;