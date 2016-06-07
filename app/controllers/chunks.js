var _ = require('underscore');
var Lockr = require('lockr');
var CHUNK_MODEL = require('../models/chunk.js');

// get localstorage by default
var DEFAULT_CHUNKS = Lockr.get('chunks') || [];

var i = 0;

var chunksController = function(state, action) {
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

module.exports = chunksController;
