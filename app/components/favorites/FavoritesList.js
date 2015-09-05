var React = require('react');
var FavoritesItem = require('./FavoritesItem');

require('../../styles/Favorites.css')

var FavoritesList = React.createClass({

	render() {

		var locations = this.props.locations.map((loc, index) => {

			var active = this.props.activeLocation.address == loc.location.address;

			// Passing the onClick callback of this
			// FavoritesList to each FavoritesItem.
			return (
				<FavoritesItem
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
			<div id='favorites-box'>
				<span className='list-group-item active'>Favorite Locations</span>
				{locations}
			</div>
		);
	}
});

module.exports = FavoritesList;
