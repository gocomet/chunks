var React = require('react');
var HTML5Backend = require('react-dnd-html5-backend');
var DragDropContext = require('react-dnd').DragDropContext;
var Calendar = require('./calendar.jsx');
var Bin = require('./bin.jsx');
var Metrics = require('./metrics.jsx');

var App = React.createClass({
	render() {
		return (
			<div className='app'>
				<Metrics scheduledChunks={this.props.scheduledChunks} binChunks={this.props.binChunks} />
				<Calendar chunks={this.props.scheduledChunks} />
				<Bin chunks={this.props.binChunks} />
			</div>
		);
	}
});

module.exports = DragDropContext(HTML5Backend)(App);
