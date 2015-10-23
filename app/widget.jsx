var React = require('react');

var Widget = React.createClass({
  getDefaultProps() {
    return {
        name: 'untitled'  
    };
  },
  getInitialState() {
    return {
      num: 0
    };
  },
  render() {
    return (
      <div>
        <span>{this.props.name}</span>
      </div>
    );
  }
});

module.exports = Widget;