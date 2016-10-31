var React = require('react');
var WeatherNavBar = require('./WeatherNavBar');
var WeatherItem = require('./WeatherItem');

require('../../styles/WeatherBox.css');

var WeatherBox = React.createClass({

	propTypes: {
		locations: React.PropTypes.arrayOf(React.PropTypes.object)
	},

	getDefaultProps() {
		return {
			locations: []
		};
	},

	getInitialState() {
		return {
			activeLocation: this.props.locations[0]
		};
	},

	componentWillReceiveProps(nextProps) {
		// reset our active state, since we will receive new locations
		this.setState({
			activeLocation: nextProps.locations[0]
		});
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
