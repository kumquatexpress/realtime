var React = require('react');
var Widget = require('./Widget.jsx');
var _ = require('lodash');

var WidgetList = React.createClass({
	getDefaultProps() {
    return {
  		widgets: []
    };
  },
  render() {
		var widgets = _.map(this.props.widgets, function(summoner){
      return (
        <Widget summoner={summoner}/>
      );
    });
    return (
      <div id="items">{widgets}</div>
    );
	}
});

module.exports = WidgetList;