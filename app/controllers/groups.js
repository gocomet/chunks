/**
 * groupsController
 * controller actions relating to the groups collection
 * keep in mind this is actually a reducer function
 * for use in the Redux pattern
 */

var _ = require('underscore');
var Lockr = require('lockr');

var MODEL = require('../models/group.js');
var COLLECTION_NAME = 'groups';

// get localstorage by default
var DEFAULT_COLLECTION = Lockr.get(COLLECTION_NAME) || [];

var controller = function(state, action) {
	if (!state) {
		state = DEFAULT_COLLECTION;
	}

	switch (action.type) {
		case 'GROUPS#RESET':
			return [];

		case 'GROUPS#NEW':
			var newRecord = _.extend(
				{},
				_.omit(MODEL, 'chunkIds'),
				{ chunkIds: [] },
				_.omit(action, 'type', 'id'),
				{ id: +new Date() }
			);
			console.log(action);
			console.log(newRecord);
			return state.concat([newRecord]);

		case 'GROUPS#UPDATE':
			return state.map(function(record) {
				if (record.id !== action.id) {
					return record;
				}
				return _.extend({}, record, _.omit(action, 'type', 'id'));
			});

		case 'GROUPS#ADD_CHUNK':
			return state.map(function(record) {
				var group;
				var i;

				if (record.id !== action.id) {
					return record;
				}

				group = _.extend({}, record);
				i = group.chunkIds.indexOf(action.chunkId);
				if (i === -1) {
					group.chunkIds.push(action.chunkId);
				}

				return group;
			});

		case 'GROUPS#REMOVE_CHUNK':
			return state.map(function(record) {
				var group;
				var i;

				if (record.id !== action.id) {
					return record;
				}

				group = _.extend({}, record);
				i = group.chunkIds.indexOf(action.chunkId);
				if (i !== -1) {
					group.chunkIds = group.chunkIds.splice(i, 1);
				}

				return group;
			});

		case 'GROUPS#DELETE':
			return state.filter(function(record) {
				return record.id !== action.id;
			});

		default:
			return state;
	}
};

module.exports = controller;
