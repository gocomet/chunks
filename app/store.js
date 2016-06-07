var Redux = require('redux');
var Lockr = require('lockr');
var chunksReducer = require('./stores/chunks.js');

var store = Redux.createStore(Redux.combineReducers({
	chunks: chunksReducer
}));

/**
 * wrap Redux store to add convenient filter methods
 */
var storeWrapper = {
	getStore: function() {
		return store.getState.call(store);
	},

	dispatch: function(action) {
		var dispatched = store.dispatch.apply(store, [action]);
		
		// when an event is dispatched, save the store results
		Lockr.set('chunks', store.getState.call(store).chunks);

		return dispatched;
	},

	subscribe: function(callback) {
		return store.subscribe.apply(store, [callback]);
	},

	filter: function(collectionName, filterProp) {
		var collection = store.getState.call(store)[collectionName];

		return collection.filter(function(item) {
			return item[filterProp];
		});
	},

	not: function(collectionName, filterProp) {
		var collection = store.getState.call(store)[collectionName];

		return collection.filter(function(item) {
			return !item[filterProp];
		});
	}
};

module.exports = storeWrapper;
