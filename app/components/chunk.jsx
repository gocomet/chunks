var React = require('react');
var DragSource = require('react-dnd').DragSource;
var store = require('../store.js');

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
	startEditing: function(e) {
		store.dispatch({
			type: 'CHUNKS#START_EDITING',
			id: this.props.model.id
		});
	},

	checkForEnter: function(e) {
		if (e.charCode === 13) {
			this.stopEditing();
		}
	},

	stopEditing: function(e) {
		store.dispatch({
			type: 'CHUNKS#STOP_EDITING',
			id: this.props.model.id
		});
	},

	updateLabel: function(e) {
		store.dispatch({
			type: 'CHUNKS#UPDATE_LABEL',
			id: this.props.model.id,
			label: e.target.value
		});

		store.dispatch({
			type: 'SCHEDULED_CHUNKS#UPDATE_LABEL',
			id: this.props.model.id,
			label: e.target.value
		});
	},

	componentDidUpdate: function() {
		if (this.refs.labelInput) {
			this.refs.labelInput.focus();
		}
	},

	schedule: function(pos) {
		store.dispatch({
			type: 'CHUNKS#SCHEDULE',
			id: this.props.model.id,
			pos: pos
		});
	},

	unschedule: function() {
		store.dispatch({
			type: 'CHUNKS#UNSCHEDULE',
			id: this.props.model.id,
			pos: null
		});
	},

	destroy: function(e) {
		e.preventDefault();
		store.dispatch({
			type: 'CHUNKS#DELETE',
			id: this.props.model.id
		});
	},

	duplicate: function(e) {
		e.preventDefault();
		e.stopPropagation();
		store.dispatch({
			type: 'CHUNKS#NEW',
			label: this.props.model.label
		});
	},

	render: function() {
		var textField;
		var classNames;
		var duplicateButton;

		classNames = this.props.model.name + ' ' + (this.props.model.isScheduled ? 'scheduled': 'unscheduled');

		if (this.props.model.isEditing) {
			textField = <input
	 			type='text'
	 			ref='labelInput'
	 			value={this.props.model.label}
	 			onChange={this.updateLabel}
	 			onBlur={this.stopEditing}
	 			onKeyPress={this.checkForEnter} />
		} else {
			textField = <h2>{this.props.model.label}</h2>
		}

		if (!this.props.model.isScheduled) {
			duplicateButton	= <button className='duplicate control' onClick={this.duplicate}>+</button>;
		} else {
			duplicateButton = '';
		}

		return this.props.connectDragSource(
			<div className={classNames} onClick={this.startEditing} style={{ opacity: this.props.isDragging ? 0.5 : 1 }}>
				{textField}
				<div className='controls'>
					<button className='destroy control' onClick={this.destroy}>x</button>
					{duplicateButton}
				</div>
			</div>
		);
	}
});

module.exports = DragSource('chunk', spec, collect)(Chunk);
