var Redux = require('redux');
var Lockr = require('lockr');
var chunksController = require('./controllers/chunks.js');
var groupsController = require('./controllers/groups.js');

var store = Redux.createStore(Redux.combineReducers({
	chunks: chunksController,
	groups: groupsController
}));

/**
 * wrap Redux store to add convenient filter methods
 */
var storeWrapper = {
	getState: function() {
		return store.getState.call(store);
	},

	dispatch: function(action) {
		var dispatched = store.dispatch.apply(store, [action]);
		var collection = dispatched.type.substr(0, dispatched.type.indexOf('#')).toLowerCase();
		
		// when an event is dispatched,
		// save the store results by collection
		Lockr.set(collection, this.getState()[collection]);

		return dispatched;
	},

	subscribe: function(callback) {
		return store.subscribe.apply(store, [callback]);
	},

	filter: function(collectionName, filterProp) {
		var collection = this.getState()[collectionName];

		return collection.filter(function(item) {
			return item[filterProp];
		});
	},

	not: function(collectionName, filterProp) {
		var collection = this.getState()[collectionName];

		return collection.filter(function(item) {
			return !item[filterProp];
		});
	},

	find: function(collectionName, recordID) {
		var collection = this.getState()[collectionName];

		return collection.filter(function(item) {
			return item.id === recordID;
		})[0];
	}
};

module.exports = storeWrapper;
