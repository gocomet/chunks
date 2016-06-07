var React = require('react');
var Cell = require('./cell.jsx');

var Calendar = React.createClass({
	render: function() {
		var chunks = [];

		this.props.chunks.forEach(function(chunk) {
			chunks[chunk.pos] = chunk;
		});

		return (
			<div className='calendar row'>
				<div className='row text-center'>
					<div className='column small-12'>
						<h2>Week</h2>
					</div>
				</div>

				<div className='row text-center'>
					<div className='column small-2'>
						<h3>Hour</h3>
					</div>
					<div className='column small-2'>
						<h3>Monday</h3>
					</div>
					<div className='column small-2'>
						<h3>Tuesday</h3>
					</div>
					<div className='column small-2'>
						<h3>Wednesday</h3>
					</div>
					<div className='column small-2'>
						<h3>Thursday</h3>
					</div>
					<div className='column small-2'>
						<h3>Friday</h3>
					</div>
				</div>

				<hr />

				<div className='row text-center cal-row'>
					<div className='column small-2'>
						<h3>1</h3>
					</div>
					<div className='column small-2'>
						<Cell pos={0} chunk={chunks[0]} />
					</div>
					<div className='column small-2'>
						<Cell pos={7} chunk={chunks[7]} />
					</div>
					<div className='column small-2'>
						<Cell pos={14} chunk={chunks[14]} />
					</div>
					<div className='column small-2'>
						<Cell pos={21} chunk={chunks[21]} />
					</div>
					<div className='column small-2'>
						<Cell pos={28} chunk={chunks[28]} />
					</div>
				</div>

				<div className='row text-center cal-row'>
					<div className='column small-2'>
						<h3>2</h3>
					</div>
					<div className='column small-2'>
						<Cell pos={1} chunk={chunks[1]} />
					</div>
					<div className='column small-2'>
						<Cell pos={8} chunk={chunks[8]} />
					</div>
					<div className='column small-2'>
						<Cell pos={15} chunk={chunks[15]} />
					</div>
					<div className='column small-2'>
						<Cell pos={22} chunk={chunks[22]} />
					</div>
					<div className='column small-2'>
						<Cell pos={29} chunk={chunks[29]} />
					</div>
				</div>

				<div className='row text-center cal-row'>
					<div className='column small-2'>
						<h3>3</h3>
					</div>
					<div className='column small-2'>
						<Cell pos={2} chunk={chunks[2]} />
					</div>
					<div className='column small-2'>
						<Cell pos={9} chunk={chunks[9]} />
					</div>
					<div className='column small-2'>
						<Cell pos={16} chunk={chunks[16]} />
					</div>
					<div className='column small-2'>
						<Cell pos={23} chunk={chunks[23]} />
					</div>
					<div className='column small-2'>
						<Cell pos={30} chunk={chunks[30]} />
					</div>
				</div>

				<div className='row text-center cal-row'>
					<div className='column small-2'>
						<h3>4</h3>
					</div>
					<div className='column small-2'>
						<Cell pos={3} chunk={chunks[3]} />
					</div>
					<div className='column small-2'>
						<Cell pos={10} chunk={chunks[10]} />
					</div>
					<div className='column small-2'>
						<Cell pos={17} chunk={chunks[17]} />
					</div>
					<div className='column small-2'>
						<Cell pos={24} chunk={chunks[24]} />
					</div>
					<div className='column small-2'>
						<Cell pos={31} chunk={chunks[31]} />
					</div>
				</div>

				<div className='row text-center cal-row'>
					<div className='column small-2'>
						<h3>5</h3>
					</div>
					<div className='column small-2'>
						<Cell pos={4} chunk={chunks[4]} />
					</div>
					<div className='column small-2'>
						<Cell pos={11} chunk={chunks[11]} />
					</div>
					<div className='column small-2'>
						<Cell pos={18} chunk={chunks[18]} />
					</div>
					<div className='column small-2'>
						<Cell pos={25} chunk={chunks[25]} />
					</div>
					<div className='column small-2'>
						<Cell pos={32} chunk={chunks[32]} />
					</div>
				</div>

				<div className='row text-center cal-row'>
					<div className='column small-2'>
						<h3>6</h3>
					</div>
					<div className='column small-2'>
						<Cell pos={5} chunk={chunks[5]} />
					</div>
					<div className='column small-2'>
						<Cell pos={12} chunk={chunks[12]} />
					</div>
					<div className='column small-2'>
						<Cell pos={19} chunk={chunks[19]} />
					</div>
					<div className='column small-2'>
						<Cell pos={26} chunk={chunks[26]} />
					</div>
					<div className='column small-2'>
						<Cell pos={33} chunk={chunks[33]} />
					</div>
				</div>

				<div className='row text-center cal-row'>
					<div className='column small-2'>
						<h3>7</h3>
					</div>
					<div className='column small-2'>
						<Cell pos={6} chunk={chunks[6]} />
					</div>
					<div className='column small-2'>
						<Cell pos={13} chunk={chunks[13]} />
					</div>
					<div className='column small-2'>
						<Cell pos={20} chunk={chunks[20]} />
					</div>
					<div className='column small-2'>
						<Cell pos={27} chunk={chunks[27]} />
					</div>
					<div className='column small-2'>
						<Cell pos={34} chunk={chunks[34]} />
					</div>
				</div>
			</div>
		);
	}
});

module.exports = Calendar;
