var React = require('react');
var moment = require('moment');
var LineChart = require("react-chartjs").Line;

require('../styles/Chart.css');

var Chart = React.createClass({
	render: function() {

		var chartData = {
			labels: this.props.locations.map((location) => {
				return moment(location.datetime).format('ddd');
			}),

			datasets: [
				{
					label: "Percipitation in mm",
					fillColor: "rgba(220,220,220,0.2)",
					strokeColor: "rgba(220,220,220,1)",
					pointColor: "rgba(220,220,220,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(220,220,220,1)",

					data: this.props.locations.map((location) => {
						return location.precipitation_probability;
					})
				},
				{
					label: "Percipitation probability",
					fillColor: "rgba(151,187,205,0.2)",
					strokeColor: "rgba(151,187,205,1)",
					pointColor: "rgba(151,187,205,1)",
					pointStrokeColor: "#fff",
					pointHighlightFill: "#fff",
					pointHighlightStroke: "rgba(151,187,205,1)",

					data: this.props.locations.map((location) => {
						return location.precipitation_mm;
					})
				}
			]
		};

		return (
			<LineChart className='PercipitationChart' data={chartData} />
		);
	}
});

module.exports = Chart;