var React = require('react');
var WeatherNavBarItem = require('./WeatherNavBarItem');
var moment = require('moment');

var WeatherNavBar = React.createClass({

	render() {

		var weatherNavBarItems = this.props.locations.map((loc, index) => {

			var activeDay = moment(this.props.activeLocation.datetime).format('dddd');
			var locDay = moment(loc.datetime).format('dddd');
			var active = (activeDay === locDay);

			// Passing the onClick callback
			return (
				<WeatherNavBarItem
					key={index}
					location={loc}
					active={active}
					onClick={this.props.onClick}
					/>
			);
		});

		if (!weatherNavBarItems.length) {
			return null;
		}

		return (
			<div className='weather-location-navigation'>
				{weatherNavBarItems}
			</div>
		);

	}

});

module.exports = WeatherNavBar;
