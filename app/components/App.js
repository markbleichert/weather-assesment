var React = require('react');

var SearchBox = require('./SearchBox');
var Forecast = require('./Forecast');
var WeatherBox = require('./weatherbox/WeatherBox');
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
				address: 'Rinse Hofstraweg, 1118 Schiphol, Netherlands',
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

	//todo: move to store ?
	isAddressInFavorites(location) {
		var store = this.props.stores.getStore('FavoritesStore');
		return (store.getByAddress(location.address) !== null);
	},

	getFormattedStatus(status = 'ERR') {
		var map = {
			'ERR': 'Unexpect error occured',
			'ZERO_RESULTS' : 'No results found',
			'OK': ''
		}

		return map[status];
	},

	searchForAddress(location_name) {

		// get the location object from the data by name entered in search
		var dataStore = this.props.stores.getStore('DataStore');
		var location = dataStore.getLocationByName(location_name);

		var options = {
			'location': {
				'lat': location.latitude,
				'lng': location.longitude
			},
			'callback': (results, status) => {


				if (status === 'OK') {

					var latlng = results[0].geometry.location;

					this.setState({
						searchStatus: this.getFormattedStatus(status),
						location: {
							name: location_name,
							address: results[0].formatted_address,
							coords: {
								lat: latlng.lat(),
								lng: latlng.lng()
							}
						}
					});
				} else {
					// no results found !
					this.setState({
						searchStatus: this.getFormattedStatus(status)
					});
				}
			}
		};

		GMaps.geocode(options);

	},

	render() {

		var dataStore = this.props.stores.getStore('DataStore');

		// get the necessary data from the datastore
		var listItems = dataStore.getListItems();
		var currentlocationItems = dataStore.getCurrentLocationItems(this.state.location.name);

		return (

			<div>
				<div className={'row'}>
					<div className={'col-md-12'}>

					</div>
				</div>
				<div className={'row'}>
					<div className={'col-md-3'}>
						<br/>
						<SearchBox onSearch={this.searchForAddress}
							label='Locations'
							data={listItems}
							status={this.state.searchStatus}/>

						<LocationList locations={this.state.favorites}
							activeLocation={this.state.location}
							onClick={this.searchForAddress} />
					</div>
					<div className={'col-md-9'}>
						<div className={'row'}>
							<div className={'col-md-12'}>
								<CurrentLocation location={this.state.location}
									favorite={this.isAddressInFavorites(this.state.location)}
									onFavoriteToggle={this.toggleFavorite} />
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-md-5'}>
								<WeatherBox locations={currentlocationItems} />
							</div>
							<div className={'col-md-7'}>
								<Map coords={this.state.location.coords} />
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-md-12'}>
								<Forecast locations={currentlocationItems}/>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}

});

module.exports = App;
