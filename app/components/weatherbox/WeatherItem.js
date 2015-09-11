var React = require('react');
var moment = require('moment');
var cn = require('classnames');
var DateBox = require('./DateBox');
var Util = require('../../util/util');

var WeatherItem = React.createClass({

	propTypes: {
		currentItem: React.PropTypes.object
	},

	getDefaultProps() {
		return {
			currentItem: {}
		};
	},

	getImageClasses(probability) {
		return cn({
			'weather-daily-img': true,
			'wi': true,
			'wi-rain': Util.inRange(probability, 81, 100),
			'wi-showers': Util.inRange(probability, 50, 80),
			'wi-day-showers': Util.inRange(probability, 15, 49),
			'wi-day-sunny': Util.inRange(probability, 0, 14)
		});
	},

	render() {

		var imageClassNames = this.getImageClasses(this.props.currentItem.precipitation_probability);

		return (
			<div className='list-group-item weather-by-day-item'>
				<div className={imageClassNames}></div>
				<div className='temperature max'>{this.props.currentItem.temperature_max}</div>
				<div className='temperature min'>{this.props.currentItem.temperature_min}</div>
				<span className='percipitation pb'>Percipitation {this.props.currentItem.precipitation_probability} %</span>
				<span className='percipitation mm'>{this.props.currentItem.precipitation_mm} mm</span>
				<DateBox datetime={this.props.currentItem.datetime} />
			</div>
		);

	}

});

module.exports = WeatherItem;
