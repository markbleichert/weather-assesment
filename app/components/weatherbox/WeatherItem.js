var React = require('react');
var moment = require('moment');
var cn = require('classnames');
var Util = require('../../util/util');

var WeatherItem = React.createClass({

	render() {

		var probability = this.props.currentItem.precipitation_probability;

		var imageClassName = cn({
			'weather-daily-img': true,
			'wi': true,
			'wi-rain': Util.inRange(probability, 81, 100),
			'wi-showers': Util.inRange(probability, 50, 80),
			'wi-day-showers': Util.inRange(probability, 15, 49),
			'wi-day-sunny': Util.inRange(probability, 0, 14)
		});

		var itemClassNames = cn({
			'list-group-item': true,
			'weather-by-day-item': true
		});

		var dateDay = moment(this.props.currentItem.datetime).format('ddd');
		var dateWeekMonth = moment(this.props.currentItem.datetime).format('MM/DD');

		return (
			<div className={itemClassNames}>
				<div className={imageClassName}></div>
				<div className='temperature max'>{this.props.currentItem.temperature_max}</div>
				<div className='temperature min'>{this.props.currentItem.temperature_min}</div>
				<span className='percipitation pb'>Percipitation {this.props.currentItem.precipitation_probability} %</span>
				<span className='percipitation mm'>{this.props.currentItem.precipitation_mm} mm</span>

				<div className='big-date list-group-item'>
					<span>
						<strong>{dateDay}</strong>
					</span>
					<span>
						<em>{dateWeekMonth}</em>
					</span>
				</div>
			</div>
		)

	}

});

module.exports = WeatherItem;
