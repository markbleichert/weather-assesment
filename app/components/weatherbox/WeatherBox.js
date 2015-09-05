var React = require('react');
var WeatherNavBar = require('./WeatherNavBar');
var WeatherItem = require('./WeatherItem');

require('../../styles/DailyWeather.css');

var WeatherBox = React.createClass({
	getInitialState() {
		return {
			activeLocation: this.props.locations[0]
		};
	},

	handleClick(location) {
		this.setState({
			activeLocation: location
		});
	},

	render() {

		return (
			<div id='weatherbox' className=''>
				<WeatherNavBar locations={this.props.locations}
					onClick={this.handleClick}
					activeLocation={this.state.activeLocation} />

				<WeatherItem currentItem={this.state.activeLocation} />

			</div>
		);
	}
});


module.exports = WeatherBox;
