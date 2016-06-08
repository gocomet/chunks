var React = require('react');
var ReactDOM = require('react-dom');
var store = require('./store.js');
var App = require('./components/app.jsx');

function render() {
	ReactDOM.render(
		<App scheduledChunks={store.filter('chunks', 'isScheduled')} binChunks={store.not('chunks', 'isScheduled')} groups={store.getState().groups} />,
		document.getElementById('app')
	);
}

store.subscribe(render);
render();
