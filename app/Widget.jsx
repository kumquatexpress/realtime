var React = require('react');

var Widget = React.createClass({
  getDefaultProps() {
    return {
        name: 'unknown'  
    };
  },
  render() {
    return (
      <div>
        <div>Summoner: {this.props.name}</div>
        <div>Latest match id: {this.props.data.matchId}</div>
      </div>
    );
  }
});

module.exports = Widget;