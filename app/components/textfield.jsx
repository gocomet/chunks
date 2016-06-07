/**
 * Textfield
 * toggles between text and an input field when clicked
 * requires two props:
 * - <value:string>
 * - <changehandler:function>
 */
var React = require('react');

var Textfield = React.createClass({
	getInitialState: function() {
		return { isEditing: false };
	},

	startEditing: function(e) {
		this.setState({
			isEditing: true
		});
	},

	checkForEnter: function(e) {
		if (e.charCode === 13) {
			this.stopEditing();
		}
	},

	stopEditing: function(e) {
		this.setState({
			isEditing: false
		});
	},

	componentDidUpdate: function() {
		if (this.refs.input) {
			this.refs.input.focus();
		}
	},

	render: function() {
		var textField;
		if (this.state.isEditing) {
			textField = <input
	 			type='text'
	 			ref='input'
	 			value={this.props.value}
	 			onChange={this.props.changehandler}
	 			onBlur={this.stopEditing}
	 			onKeyPress={this.checkForEnter} />;
		} else {
			textField = <a href='javascript:void(0)' onClick={this.startEditing}>{this.props.value}</a>;
		}

		return (
			<div className='textfield'>
				{textField}
		 	</div>
		);
	}
});

module.exports = Textfield;
