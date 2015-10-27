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
        <Widget summoner={summoner} key={summoner.id}/>
      );
    });
    var parts = _.partition(widgets, function(w, idx){ return idx % 2; });
    return (
      <div className="flex-item items col-md-12">
        <div className="flex-container pb1 px1">
          <div className="flex-item col-md-6">{parts[1]}</div>
          <div className="flex-item col-md-6">{parts[0]}</div>
        </div>
      </div>
    );
	}
});

module.exports = WidgetList;