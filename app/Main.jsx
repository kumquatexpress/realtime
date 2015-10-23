// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Widget = require('./Widget.jsx');
var AddWidgetForm = require('./AddWidgetForm.jsx')
var RefreshMixin = require('./Refresh.js');
var Constants = require('./Constants.js');

var MainWindow = React.createClass({
  mixins: [RefreshMixin],
  getInitialState() {
    return {
      data: []
    };
  },
  componentDidMount() {
    this.setInterval(this.poll, 3000);
  },
  poll() {

  },
  render() {
    var widgets = this.state.data.map(function(player){
      return (
        <Widget name={player.name} data={player.data}/>
      );
    });
    return (
      <div className="mainWindow">
        <div id="items">{widgets}</div>
        <AddWidgetForm />
      </div>
    );
  }
});

ReactDOM.render(
  <MainWindow />,
  document.getElementById('main')
);
