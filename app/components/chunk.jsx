/**
 * dear god fix the mess that is
 * tightly-coupled action data manipulation and view
 * why why why
 */
var _ = require('underscore');
var React = require('react');
var DragSource = require('react-dnd').DragSource;
var store = require('../store.js');
var Textfield = require('./textfield.jsx');

var spec = {
	/**
	 * decsribe the object being dragged
	 * let's drag all props since we want these
	 * to generate a duplicate Chunk on.drop
	 */
	beginDrag: function(props) {
		return props.model;
	},

	/**
	 * only allow to drag to calendar
	 * if not scheduled yet
	 */
	// canDrag: function(props, monitor) {
	// 	return !props.isScheduled;
	// },

	/**
	 * when item is dropped,
	 * schedule it
	 * by cell position
	 */
	endDrag: function(props, monitor, component) {
		var dropResult;

		if (!monitor.didDrop()) {
			return;
		}

		dropResult = monitor.getDropResult();

		if (dropResult.location === 'bin') {
			component.unschedule();
		} else if (dropResult.location === 'cell') {
			component.schedule(dropResult.pos);
		}
	}
};

/**
 * collect
 * returns an object of props
 * to be used within our new render method
 * accessed via `this.props`
 */
function collect(connect, monitor) {
	return {
		connectDragSource: connect.dragSource(),
		isDragging: monitor.isDragging()
	};
}

var Chunk = React.createClass({
	schedule: function(pos) {
		store.dispatch({
			type: 'CHUNKS#UPDATE',
			id: this.props.model.id,
			isScheduled: true,
			pos: pos
		});
	},

	unschedule: function() {
		store.dispatch({
			type: 'CHUNKS#UPDATE',
			id: this.props.model.id,
			isScheduled: false,
			pos: null
		});
	},

	destroy: function(e) {
		e.preventDefault();
		
		store.dispatch({
			type: 'CHUNKS#DELETE',
			id: this.props.model.id
		});

		store.dispatch({
			type: 'GROUPS#REMOVE_CHUNK',
			id: this.props.model.groupId,
			chunkId: this.props.model.id
		});
	},

	duplicate: function(e) {
		var _this = this;
		var addedChunk;

		e.preventDefault();
		e.stopPropagation();

		store.dispatch(_.extend({}, this.props.model, {
			type: 'CHUNKS#NEW'
		}));

		addedChunk = store.find('chunks', function(chunk) {
			var thisModel = _.omit(_this.props.model, 'id');
			var chunkModel = _.omit(chunk, 'id');
			var matches = true;
			Object.keys(thisModel).forEach(function(prop) {
				if (thisModel[prop] !== chunkModel[prop]) {
					matches = false;
				}
			});
			return matches;
		});

		if (this.props.model.groupId) {
			store.dispatch({
				type: 'GROUPS#ADD_CHUNK',
				id: this.props.model.groupId,
				chunkId: addedChunk.id
			});
		}
	},

	updateLabel: function(e) {
		store.dispatch({
			type: 'CHUNKS#UPDATE',
			id: this.props.model.id,
			label: e.target.value
		});
	},

	updateGroup: function(e) {
		var value = parseInt(e.target.value, 10);
		var group = store.find('groups', value);
		var chunk = this.props.model;

		if (chunk.groupId && chunk.groupId !== value) {
			store.dispatch({
				type: 'GROUPS#REMOVE_CHUNK',
				id: chunk.groupId,
				chunkId: chunk.id
			});
		}

		store.dispatch({
			type: 'CHUNKS#UPDATE',
			id: chunk.id,
			groupId: value
		});

		store.dispatch({
			type: 'GROUPS#ADD_CHUNK',
			id: value,
			chunkId: chunk.id
		});
	},

	render: function() {
		var allGroups = store.getState().groups;
		var bgColor = this.props.model.color;
		var thisGroupId;
		var thisGroup;

		if (this.props.model.groupId) {
			thisGroup = store.find('groups', this.props.model.groupId);
			if (thisGroup) {
				bgColor = thisGroup.color;
				thisGroupId = thisGroup.id;
			}
		}

		return this.props.connectDragSource(
			<div className='chunk' style={{ backgroundColor: bgColor, opacity: this.props.isDragging ? 0.5 : 1 }}>
				<Textfield value={this.props.model.label} changehandler={this.updateLabel} />
				
				<select value={thisGroupId ? thisGroupId: 'none'} onChange={this.updateGroup}>
					<option key={0} value='none'>---</option>
					{allGroups.map(function(group, i) {
						return <option key={++i} value={group.id}>{group.name}</option>;
					})}
				</select>
				
				<div className='controls'>
					<button className='destroy control' onClick={this.destroy}>x</button>
					<button className='duplicate control' onClick={this.duplicate} style={{ display: this.props.model.isScheduled ? 'none': 'inline-block' }}>+</button>
				</div>
			</div>
		);
	}
});

module.exports = DragSource('chunk', spec, collect)(Chunk);
