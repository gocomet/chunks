/**
 * chunksController
 * controller actions relating to the chunks collection
 * keep in mind this is actually a reducer function
 * for use in the Redux pattern
 */

var _ = require('underscore');
var Lockr = require('lockr');

var COLLECTION_NAME = 'chunks';
var MODEL = require('../models/chunk.js');

// get localstorage by default
var DEFAULT_COLLECTION = Lockr.get(COLLECTION_NAME) || [];

var i = 0;

var controller = function(state, action) {
	if (!state) {
		state = DEFAULT_COLLECTION;
	}

	switch (action.type) {
		case 'CHUNKS#RESET':
			return [];
		case 'CHUNKS#NEW':
			return state.concat([_.extend(
				{},
				MODEL,
				_.omit(action, 'type', 'id'),
				{ id: ++i }
			)]);

		case 'CHUNKS#UPDATE':
			return state.map(function(record) {
				if (record.id !== action.id) {
					return record;
				}
				return _.extend({}, record, _.omit(action, 'type', 'id'));
			});

		case 'CHUNKS#DELETE':
			return state.filter(function(record) {
				return record.id !== action.id;
			});

		default:
			return state;
	}
};

module.exports = controller;
