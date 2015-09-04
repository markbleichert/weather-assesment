var React = require('react');
var moment = require('moment');
var cn = require('classnames');

require('../styles/Forecast.css');

function inRange(num, rangeStart, rangeEnd) {
	return (num <= Math.max(rangeStart, rangeEnd) && num >= Math.min(rangeStart, rangeEnd));
}

var Forecast = React.createClass({

	renderWeather(weather, index) {
		// using moment.js to format ISO date string to day format
		var day = moment(weather.datetime).format('ddd');

		var probability = weather.precipitation_probability;

		// uses weather-icons from erikflowers.github.io
		var imageClassName = cn({
			'daily-img': true,
			'wi': true,
			'wi-rain': inRange(probability, 81, 100),
			'wi-showers': inRange(probability, 50, 80),
			'wi-day-showers': inRange(probability, 15, 49),
			'wi-day-sunny': inRange(probability, 0, 14)
		});

		var itemClassName = cn({
			'daily-item': true,
			'active': index === 0
		});

		return (
			<li className={itemClassName} key={index}>
				<div className={'daily-date'}>{day}</div>
				<span className={imageClassName}></span>
				<span className={'daily-temp'}>{weather.temperature_max}</span>
				<span className={'daily-temp min'}>{weather.temperature_min}</span>
				<span className={'daily-rain'}>Rain {weather.precipitation_probability} %</span>
			</li>
		);
	},

	renderChildren() {
		return this.props.locations.map(this.renderWeather);
	},

	render() {

		return (
			<div className={'tabbed-forecast'}>
				<ul className={'daily'}>
					{this.renderChildren()}
				</ul>
			</div>
		);
	}
});

module.exports = Forecast;
