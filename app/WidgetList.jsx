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
		let widgets = _.map(this.props.widgets, function(summoner){
      return (
        <Widget summoner={summoner} key={summoner.id}/>
      );
    });
    let columnLength = widgets.length;
    if(columnLength > 4){
      columnLength = 4;
    }
    let parts = _.groupBy(widgets, function(w, idx){ return idx % columnLength; });
    let columns = _.map(parts, function(ws){
      return (
        <div className={"flex-item col-md-"+12/columnLength}>{ws}</div>
        );
    });
    return (
      <div className="flex-item items col-md-12">
        <div className="flex-container pb1 px1">
          {columns}
        </div>
      </div>
    );
	}
});

module.exports = WidgetList;