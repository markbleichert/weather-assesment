var React = require('react');
var LocationItem = require('./LocationItem');

var LocationList = React.createClass({

	render(){

		var self = this;

		var locations = this.props.locations.map(function(l){

			var active = self.props.activeLocation.address == l.location.address;

			// Passing the onClick callback of this
			// LocationList to each LocationItem.
			return <LocationItem
						location={l.location}
						timestamp={l.timestamp}
						active={active}
						onClick={self.props.onClick} />
		});

		if(!locations.length){
			return null;
		}

		return (
			<div className="col-xs-12 col-md-offset-0">
				<span className="list-group-item active">Saved Locations</span>
				{locations}
			</div>
		)

	}

});

module.exports = LocationList;