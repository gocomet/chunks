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
		e.preventDefault();
		e.stopPropagation();
		var addedChunk = store.dispatch(_.extend({}, this.props.model, {
			type: 'CHUNKS#NEW'
		}));

		if (this.props.model.groupId) {
			store.dispatch({
				type: 'GROUPS#ADD_CHUNK',
				id: value,
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
		var value = parseInt(e.target.options[e.target.selectedIndex].value, 10);
		var group = store.find('groups', value);
		var chunk = this.props.model;
		
		if (this.props.model.groupId && this.props.model.groupId !== value) {
			store.dispatch({
				type: 'GROUPS#REMOVE_CHUNK',
				id: this.props.model.groupId,
				chunkId: this.props.model.id
			});
		}

		store.dispatch({
			type: 'CHUNKS#UPDATE',
			id: this.props.model.id,
			groupId: value
		});

		store.dispatch({
			type: 'GROUPS#ADD_CHUNK',
			id: value,
			chunkId: this.props.model.id
		});
	},

	render: function() {
		var allGroups = store.getState().groups;
		var bgColor = this.props.model.color;
		var thisGroup;
		var thisGroupId;

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
				
				<select onChange={this.updateGroup}>
					<option key={0} value='none'>---</option>
					{allGroups.map(function(group, i) {
						var opt;
						i += 1;
						if (group.id === thisGroupId) {
							opt = <option key={i} value={group.id} selected>{group.name}</option>;
						} else {
							opt = <option key={i} value={group.id}>{group.name}</option>;
						}
						return opt;
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
