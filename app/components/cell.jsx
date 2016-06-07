var React = require('react');
var Chunk = require('./chunk.jsx');
var DropTarget = require('react-dnd').DropTarget;
var store = require('../store.js');

/**
 * define drag and drop behaviour
 */
var spec = {
	drop: function(props, monitor, component) {
		var item = monitor.getItem();
		var pos = props.pos;

		return {
			location: 'cell',
			pos: pos
		};
	},

	// hover: function(props, monitor, component) {
	// },

	// can drop if there is no chunk here
	canDrop: function(props, monitor) {
		return !props.chunk;
	}
};

/**
 * define props to be injected
 * into Component
 */
function collect(connect, monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver() && monitor.canDrop(),
    connectDropTarget: connect.dropTarget()
  };
}

var Cell = React.createClass({
	render: function() {
		var chunk = '';

		if (this.props.chunk) {
			chunk = <Chunk model={this.props.chunk} />
		}

		return this.props.connectDropTarget(
			<div className={ this.props.hovered ? 'cell highlight' : 'cell' }>
				{chunk}
			</div>
		);
	}
});

module.exports = DropTarget('chunk', spec, collect)(Cell);
