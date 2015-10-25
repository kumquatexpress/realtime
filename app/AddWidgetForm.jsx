var React = require('react');

var AddWidgetForm = React.createClass({
	submitForm() {
		var summ_name = this.refs.summ_name.value.trim();
		$.ajax({
			url: this.props.submitUrl+summ_name,
			success: function(data){
				var summoner = {};
				summoner["id"] = data["id"];
				summoner["name"] = summ_name;
				this.props.onSubmit(summoner);
			}.bind(this)
		});
	},
  render() {
    return (
      <div>
      	<button onClick={this.submitForm}>Add Widget</button>
      	<input type="text" placeholder="Summoner name" ref="summ_name"/>
      </div>
    );
  }
});

module.exports = AddWidgetForm;