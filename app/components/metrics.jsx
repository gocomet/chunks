var React = require('react');
var Metrics = React.createClass({
	render: function() {
		var binLength = this.props.binChunks.length;
		var calLength = this.props.scheduledChunks.length;
		var totalLength = binLength + calLength;
		return (
			<div className='metrics row'>
				<div className='metrics-groups row'>
					<div className='column small-12 medium-4 text-center'>
						Groups here
					</div>
				</div>
				<div className='metrics-chunks row'>
					<div className='column small-12 text-center'>
						Chunks
					</div>
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
			</div>
		);
	}
});

module.exports = Metrics;
