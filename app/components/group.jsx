var React = require('react');
var store = require('../store.js');
var Textfield = require('./textfield.jsx');
var Colorpicker = require('./colorpicker.jsx');

var Group = React.createClass({
	destroy: function(e) {
		e.preventDefault();
		
		store.dispatch({
			type: 'GROUPS#DELETE',
			id: this.props.model.id
		});

		this.props.model.chunkIds.forEach(function(id) {
			store.dispatch({
				type: 'CHUNKS#UPDATE',
				id: id,
				groupId: null
			});
		});
	},

	updateName: function(e) {
		store.dispatch({
			type: 'GROUPS#UPDATE',
			id: this.props.model.id,
			name: e.target.value
		});
	},

	updateColor: function(e) {
		store.dispatch({
			type: 'GROUPS#UPDATE',
			id: this.props.model.id,
			color: e.target.value
		});	
	},

	render: function() {
		return (
			<div className='chunk' style={{ backgroundColor: this.props.model.color }}>
				<Textfield value={this.props.model.name} changehandler={this.updateName} />
				<Colorpicker value={this.props.model.color} changehandler={this.updateColor} />
				<div className='controls'>
					<button className='destroy control' onClick={this.destroy}>x</button>
				</div>
			</div>
		);
	}
});

module.exports = Group;
