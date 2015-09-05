var React = require('react');
var WeatherNavBar = require('./WeatherNavBar');
var WeatherItem = require('./WeatherItem');
var moment = require('moment');

require('../../styles/WeatherBox.css');

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
		console.log('active props location', this.props.activeLocation);
		console.log('active state location', this.state.activeLocation);
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
