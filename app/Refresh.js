var React = require('react');

var RefreshMixin = {
  componentWillMount() {
    this.intervals = [];
  },
  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount() {
    this.intervals.forEach(clearInterval);  
  }
};

module.exports = RefreshMixin;