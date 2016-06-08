/**
 * Colorpicker
 * persistantly store color value
 * while allowing user to pick
 * - <value:string>
 * - <changehandler:function>
 */
var React = require('react');

var Colorpicker = React.createClass({
	componentDidMount: function() {
		this.refs.colorpicker.value = this.props.value;
	},

	render: function() {
		return (
			<div className='colorpicker'>
				<input ref='colorpicker' type='color' onBlur={this.props.changehandler} />
		 	</div>
		);
	}
});

module.exports = Colorpicker;
