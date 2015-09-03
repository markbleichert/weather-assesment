var React = require('react');

var SearchBox = require('./SearchBox');
var Forecast = require('./Forecast');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');
var store = require('../stores/FavoritesStore');
var dataStore = require('../stores/DataStore');


require('../styles/global.less');

var App = React.createClass({

	getInitialState() {

		return {
			favorites: store.getAll(),
			location: {
				name: 'Amsterdam',
				address: 'Amsterdam, Netherlands',
				coords: {
					lat: 52.3,
					lng: 4.766667
				}
			}

		};
	},

	toggleFavorite(location) {
		if (this.isAddressInFavorites(location)) {
			this.removeFromFavorites(location);
		}
		else {
			this.addToFavorites(location);
		}
	},

	addToFavorites(location) {

		var favorites = store.getAll();

		store.add(location);

		this.setState({
			favorites: store.getAll()
		});
	},

	removeFromFavorites(location) {
		store.remove(location);

		this.setState({
			favorites: store.getAll()
		});

	},

	isAddressInFavorites(location) {
		return (store.getByAddress(location.address) !== null);
	},

	searchForAddress(location_name) {

		//TODO: search based longtitude/latitude

		GMaps.geocode({
			address: location_name,
			callback: (results, status) => {

				if (status !== 'OK') return;

				var latlng = results[0].geometry.location;

				this.setState({
					location: {
						name: location_name,
						address: results[0].formatted_address,
						coords: {
							lat: latlng.lat(),
							lng: latlng.lng()
						}
					}
				});

			}
		});

	},

	render() {

		// get the necessary data from the datastore
		var listItems = dataStore.getListItems();
		var locations = dataStore.getCurrentLocationItems(this.state.location.name);

		return (

			<div>
				<div className={'row'}>
					<div className={'col-md-12'}>
						<CurrentLocation location={this.state.location}
								 favorite={this.isAddressInFavorites(this.state.location)}
								 onFavoriteToggle={this.toggleFavorite} />
					</div>
				</div>
				<div className={'row'}>
					<div className={'col-md-3'}>
						<SearchBox onSearch={this.searchForAddress} label='Locations' data={listItems}/>
						<LocationList locations={this.state.favorites} activeLocation={this.state.location}
									  onClick={this.searchForAddress} />
					</div>
					<div className={'col-md-9'}>
						<Forecast locations={locations}/>
						<br/>
						<div className={'col-md-8'}>
							<Map coords={this.state.location.coords} />
						</div>


					</div>
				</div>
			</div>

		);
	}

});

module.exports = App;
