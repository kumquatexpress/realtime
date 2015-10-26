// main.js
var React = require('react');
var WidgetList = require('./WidgetList.jsx');
var AddWidgetForm = require('./AddWidgetForm.jsx')
var RefreshMixin = require('./Refresh.js');
var Constants = require('./Constants.js');
var Helpers = require('./Helpers.js');
var update = require('react-addons-update');
var _ = require('lodash');

var MainWindow = React.createClass({
  mixins: [RefreshMixin],
  getInitialState() {
    return {
      data: {}
    };
  },
  componentDidMount() {
    this.setInterval(this.poll, 5000);
  },
  replaceSummoner(summoner) {
    var pId = summoner.id;
    var newData = update(this.state.data, {$merge: {pId: summoner}});
    this.setState({
      data: newData
    });
  },
  poll() {
    _.forEach(this.state.data, function(summoner){
      $.ajax({
        url: Constants.procsGameUrl + summoner.id,
        contentType: 'application/json',
        success: function(data){
        	var massagedData = Helpers.massageData(data);
          summoner["matchData"] = massagedData;
          this.replaceSummoner(summoner);
        }.bind(this)
      });
    }.bind(this));
  },
  render() {
    return (
      <div className="mainWindow">
        <WidgetList widgets={this.state.data}/>
        <AddWidgetForm submitUrl={Constants.procsSummUrl} onSubmit={this.replaceSummoner}/>
      </div>
    );
  }
});

module.exports = MainWindow;
