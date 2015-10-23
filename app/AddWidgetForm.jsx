var React = require('react');

var AddWidgetForm = React.createClass({
	submitForm() {
		this.state.id //save to server
	},
	inputChange(e) {
		this.setState({id: e.target.value})
	},
  render() {
    return (
      <div>
      	<button onClick={this.submitForm}>Add Widget</button>
      	<input type="text" onChange={this.inputChange}/>
      </div>
    );
  }
});

module.exports = AddWidgetForm;