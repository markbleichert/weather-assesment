var React = require('react');

require('../styles/Forecast.css');

var Weather = React.createClass({
	render: function() {

		// replace this with momnet.js stuff
		var days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
		var date = new Date(this.props.location.datetime.replace(/-/g,"/"));
		var day = days[date.getDay()];

		var itemClassName = "daily-item";
		var imageClassName = "daily-img";

		var probability = this.props.location.precipitation_probability;


		if (probability >= 85 && probability <= 101) {
			imageClassName += " wet";
		} else if (probability >= 50 && probability <= 84.9) {
			imageClassName += " rainy";
		} else if (probability > 0 && probability <= 49.9) {
			imageClassName += " sunny-and-wet";
		} else /* it is less than 50 */ {
			imageClassName += " sunny-and-wet";
		}

		if (this.props.active) {
			itemClassName += " active";
		}

		return (
			<li className={itemClassName}>
				<div className={"daily-date"}>{day}</div>
				<span className={imageClassName}></span>
				<span className={"daily-temp"}>{this.props.location.temperature_max}</span>
				<span className={"daily-temp min"}>{this.props.location.temperature_min}</span>
				<span className={"daily-rain"}>Rain {this.props.location.precipitation_probability} %</span>
			</li>
		);
	}
});

var Forecast = React.createClass({

	render: function() {

		var rows = [];
		var lastId = null;
		var id = 0;

		var rows = this.props.locations.map(location => {

			var active = (id == 0)? true : false;

			if (location.station_id !== lastId) {
				return (<Weather active={active} location={location} key={id++}/>);
			}

		});

		return (
			<div className={"tabbed-forecast"}>
				<ul className={"daily"}>{rows}</ul>
			</div>
		);
	}
});

module.exports = Forecast;
