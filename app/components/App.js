var React = require('react');

var SearchBox = require('./SearchBox');
var Forecast = require('./Forecast');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');

require('../styles/global.less');

var App = React.createClass({

	propTypes: {
		stores: React.PropTypes.object
	},

	getInitialState() {
		var store = this.props.stores.getStore('FavoritesStore');

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
		var store = this.props.stores.getStore('FavoritesStore');

		var favorites = store.getAll();

		store.add(location);

		this.setState({
			favorites: store.getAll()
		});
	},

	removeFromFavorites(location) {
		var store = this.props.stores.getStore('FavoritesStore');

		store.remove(location);

		this.setState({
			favorites: store.getAll()
		});

	},

	isAddressInFavorites(location) {
		var store = this.props.stores.getStore('FavoritesStore');
		return (store.getByAddress(location.address) !== null);
	},

	searchForAddress(location_name) {

		//TODO: search based longtitude/latitude
		// 'location': {lat: 40.731, lng: -73.997},

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

		var dataStore = this.props.stores.getStore('DataStore');

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
