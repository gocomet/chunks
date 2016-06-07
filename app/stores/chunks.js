var Lockr = require('lockr');
var _ = require('underscore');

// TODO: store using some persistant form of memory
var DEFAULT_CHUNKS = Lockr.get('chunks') || [];

// define chunk data structure
var CHUNK_MODEL = {
	name: 'chunk',
	label: 'Chunk',
	isScheduled: false,
	isEditing: false,
	id: null,
	pos: null
};

var i = 0;

var chunks = function(state, action) {
	if (!state) {
		state = DEFAULT_CHUNKS;
	}

	switch (action.type) {
		case 'CHUNKS#NEW':
			return state.concat([_.extend(
				{},
				CHUNK_MODEL,
				_.omit(action, 'type'),
				{ id: ++i }
			)]);
		
		case 'CHUNKS#START_EDITING':
			return state.map(function(chunk) {
				if (chunk.id !== action.id) {
					return chunk;
				}
				return _.extend({}, chunk, { isEditing: true });
			});

		case 'CHUNKS#STOP_EDITING':
			return state.map(function(chunk) {
				if (chunk.id !== action.id) {
					return chunk;
				}
				return _.extend({}, chunk, { isEditing: false });
			});

		case 'CHUNKS#UPDATE_LABEL':
			return state.map(function(chunk) {
				if (chunk.id !== action.id) {
					return chunk;
				}
				return _.extend({}, chunk, { label: action.label });
			});

		case 'CHUNKS#SCHEDULE':
			return state.map(function(chunk) {
				if (chunk.id !== action.id) {
					return chunk;
				}
				return _.extend({}, chunk, { isScheduled: true, pos: action.pos });
			});
		
		case 'CHUNKS#UNSCHEDULE':
			return state.map(function(chunk) {
				if (chunk.id !== action.id) {
					return chunk;
				}
				return _.extend({}, chunk, { isScheduled: false, pos: null });
			});

		case 'CHUNKS#DELETE':
			return state.filter(function(chunk) {
				return chunk.id !== action.id;
			});

		default:
			return state;
	}
};

module.exports = chunks;
