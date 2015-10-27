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
      <div className="flex-item widgetForm col-sm-12">
      	<input className="input" required type="text" placeholder="Summoner name" ref="summ_name"/>
        <button className="btn green ghost block" onClick={this.submitForm}>Add Widget</button>
      </div>
    );
  }
});

module.exports = AddWidgetForm;