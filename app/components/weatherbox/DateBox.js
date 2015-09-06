var React = require('react');
var moment = require('moment');
var cn = require('classnames');
var Util = require('../../util/util');

var DateBox = React.createClass({

	propTypes: {
		dateTime: React.PropTypes.object.isRequired,
		dayFormat: React.PropTypes.string
	},

	getDefaultProps() {
		return {
			dateTime: {},
			dayFormat: 'ddd'
		};
	},

	render() {
		var dateDay = moment(this.props.datetime).format(this.props.dayFormat);
		var dateWeekMonth = moment(this.props.datetime).format('MM/DD');

		return (
			<div className='big-date'>
				<span className='big'>
					{dateDay}
				</span>
				<span className='small'>
					{dateWeekMonth}
				</span>
			</div>
		)
	}
});

module.exports = DateBox;
