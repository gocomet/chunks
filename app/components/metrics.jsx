var React = require('react');
var Metrics = React.createClass({
	render: function() {
		var binLength = this.props.binChunks.length;
		var calLength = this.props.scheduledChunks.length;
		var totalLength = binLength + calLength;
		return (
			<div className='metrics row'>
				<div className='column small-12 medium-4 text-center'>
					Scheduled Chunks: {calLength}
				</div>
				<div className='column small-12 medium-4 text-center'>
					Unscheduled Chunks: {binLength}
				</div>
				<div className='column small-12 medium-4 text-center'>
					Total Chunks: {totalLength}
				</div>
			</div>
		);
	}
});

module.exports = Metrics;
