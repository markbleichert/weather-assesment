var React = require('react');
var moment = require('moment');
var cn = require('classnames');

var WeatherNavBarItem = React.createClass({

	propTypes: {
		location: React.PropTypes.object.isRequired,
		onClick: React.PropTypes.func.isRequired,
		active: React.PropTypes.bool
	},

	handleClick() {
		this.props.onClick(this.props.location);
	},

	render() {

			var formattedDate = moment(this.props.location.datetime).format('ddd');

			var itemClassNames = cn({
				'list-group-item': true,
				'weather-navbar-item': true,
				'active-location': this.props.active
			});

		return (
			<a className={itemClassNames} onClick={this.handleClick}>
				{formattedDate}
			</a>
		);

	}

});

module.exports = WeatherNavBarItem;
