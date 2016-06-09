var React = require('react');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;
var Calendar = require('./calendar.jsx');
var Bin = require('./bin.jsx');
var Metrics = require('./metrics.jsx');
var Groups = require('./groups.jsx');

var App = React.createClass({
	render() {
		return (
			<div className='app'>
				<Metrics scheduledChunks={this.props.scheduledChunks} binChunks={this.props.binChunks} groups={this.props.groups} />
				<Calendar chunks={this.props.scheduledChunks} />
				<Bin chunks={this.props.binChunks} />
				<Groups groups={this.props.groups} />
			</div>
		);
	}
});

module.exports = DragDropContext(HTML5Backend)(App);
