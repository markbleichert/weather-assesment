var React = require('react');
var LocationItem = require('./LocationItem');

var LocationList = React.createClass({

	render() {

		var locations = this.props.locations.map((loc, index) => {

			var active = this.props.activeLocation.address == loc.location.address;

			// Passing the onClick callback of this
			// LocationList to each LocationItem.
			return (
				<LocationItem
					key={index}
					location={loc.location}
					timestamp={loc.timestamp}
					active={active}
					onClick={this.props.onClick}
				/>
			);
		});

		if (!locations.length) {
			return null;
		}

		return (
			<div className='col-xs-12 col-md-offset-0'>
				<span className='list-group-item active'>Favorite Locations</span>
				{locations}
			</div>
		);

	}

});

module.exports = LocationList;
