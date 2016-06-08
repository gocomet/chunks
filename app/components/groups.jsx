var React = require('react');
var Group = require('./group.jsx');
var store = require('../store.js');

var Groups = React.createClass({
	addGroup: function(e) {
		store.dispatch({
			type: 'GROUPS#NEW'
		});
	},

	render: function() {
		return (
			<div className='bin row'>
				<div className='row'>
					<div className='column small-12'>
						<h2 className='text-center'>
							Groups
							<button
								onClick={this.addGroup}
								className='button heading-action'>
								New Group
							</button>
						</h2>
					</div>
				</div>
				
				<div className='row'>
					<div className='column small-12'>
						{this.props.groups.map(function(group) {
							return <Group model={group} key={group.id} />;
						})}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Groups;
