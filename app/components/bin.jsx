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
			location: 'bin'
		};
	},

	// hover: function(props, monitor, component) {
	// },

	// canDrop: function(props, monitor) {
	// }
};

/**
 * define props to be injected
 * into Component
 */
function collect(connect, monitor) {
  return {
    highlighted: monitor.canDrop(),
    hovered: monitor.isOver(),
    connectDropTarget: connect.dropTarget()
  };
}

var Bin = React.createClass({
	addChunk: function(e) {
		store.dispatch({
			type: 'CHUNKS#NEW'
		});
	},

	render: function() {
		return this.props.connectDropTarget(
			<div className='bin row'>
				<div className='row'>
					<div className='column small-12'>
						<h2 className='text-center'>
							Bin
							<button
								ref='addChunkBtn'
								onClick={this.addChunk}
								className='button heading-action'>
								New Chunk
							</button>
						</h2>
					</div>
				</div>
				
				<div className='row'>
					<div className='column small-12' ref='chunksContainer'>
						{this.props.chunks.map(function(chunk) {
							return <Chunk model={chunk} key={chunk.id} />;
						})}
					</div>
				</div>
			</div>
		);
	}
});

module.exports = DropTarget('chunk', spec, collect)(Bin);
