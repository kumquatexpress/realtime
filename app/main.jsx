// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var Widget = require('./widget.jsx');
var RefreshMixin = require('./refresh.js');
var Constants = require('./constants.js');

var MainWindow = React.createClass({
	mixins: [RefreshMixin],
	componentDidMount() {
		this.setInterval(this.poll, 3000);
	},
	poll() {

	}
  render() {
    return (
    	<div className="mainWindow">
	      <Widget name="hello world"/>
	      <Widget name="widget 2"/>
	      <Widget />
      </div>
    );
  }
});

ReactDOM.render(
  <MainWindow />,
  document.getElementById('main')
);
