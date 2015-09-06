var React = require('react');
var moment = require('moment');
var cn = require('classnames');
var DateBox = require('./DateBox');

var WeatherNavBarItem = React.createClass({

	propTypes: {
		location: React.PropTypes.object.isRequired,
		onClick: React.PropTypes.func.isRequired,
		active: React.PropTypes.bool
	},

	getDefaultProps() {
		return {
			location: {},
			active: false
		};
	},

	handleClick() {
		this.props.onClick(this.props.location);
	},

	render() {
		var itemClassNames = cn({
			'list-group-item': true,
			'weather-navbar-item': true,
			'active-location': this.props.active
		});

		return (
			<a className={itemClassNames} onClick={this.handleClick}>
				<DateBox datetime={this.props.location.datetime} />
			</a>
		);

	}

});

module.exports = WeatherNavBarItem;
