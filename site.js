var React = require('react');
var ReactDOM = require('react-dom');
var MainWindow   = require("./app/Main.jsx");
require ('./css/styles.less');

const initialModel = window.INITIAL_MODEL;

ReactDOM.render(<MainWindow />, document.getElementById("main"));