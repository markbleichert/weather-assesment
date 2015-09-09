var React = require('react');

var SearchBox = require('./SearchBox');
var Forecast = require('./Forecast');
var WeatherBox = require('./weatherbox/WeatherBox');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var FavoritesList = require('./favorites/FavoritesList');
var Actions = require('../actions/Actions');

require('../styles/global.less');

var App = React.createClass({

	propTypes: {
		locations: React.PropTypes.object.isRequired,
		favorites: React.PropTypes.object.isRequired
	},

	onChange() {
		this.setState({
			favorites: this.props.favorites.getFavorites()
		})
	},

	componentWillMount() {
		this.props.favorites.addChangeListener(this.onChange);
	},

	componentWillUnmount() {
		this.props.favorites.removeChangeListener(this.onChange)
	},

	getInitialState() {
		return {
			favorites: this.props.favorites.getFavorites(),
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

	getFormattedStatus(status = 'ERR') {
		var map = {
			'ERR': 'Unexpect error occured',
			'ZERO_RESULTS': 'No results found',
			'OK': ''
		}

		return map[status];
	},

	toggleFavorite(location) {
		if (this.props.favorites.isAddressInFavorites(location.address)) {
			Actions.removeFavorite(location);
		}
		else {
			Actions.addFavorite(location);
		}
	},

	isAddressInFavorites(location) {
		return this.props.favorites.isAddressInFavorites(location.address);
	},

	searchForAddress(location_name) {

		// get the location object from the data by name entered in search
		var location = this.props.locations.getLocationByName(location_name);

		var options = {
			location: {
				lat: location.latitude,
				lng: location.longitude
			},
			callback: (results, status) => {

				if (status === 'OK') {

					this.setState({
						searchStatus: this.getFormattedStatus(status),
						location: {

							name: location_name,
							address: results[0].formatted_address,
							coords: {
								lat: location.latitude,
								lng: location.longitude
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
		var store = this.props.locations;

		// get needed data from store
		var listItems = store.getListItems();
		var currentlocationItems = store.getCurrentLocationItems(this.state.location.name);

		return (

			<div>
				<div className={'row'}>
					<div className={'col-md-12'}>

					</div>
				</div>
				<div className={'row'}>
					<div className={'col-md-3'}>
						<br/>
						<SearchBox
							onSearch={this.searchForAddress}
							label='Locations'
							data={listItems}
							status={this.state.searchStatus}/>

						<FavoritesList
							locations={this.state.favorites}
							activeLocation={this.state.location}
							onClick={this.searchForAddress} />
					</div>
					<div className={'col-md-9'}>
						<div className={'row'}>
							<div className={'col-md-12'}>
								<CurrentLocation
									location={this.state.location}
									favorite={this.isAddressInFavorites(this.state.location)}
									onFavoriteToggle={this.toggleFavorite} />
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-md-6'}>
								<WeatherBox
									activeLocation={this.state.location}
									locations={currentlocationItems} />
							</div>
							<div className={'col-md-6'}>
								<Map
									coords={this.state.location.coords}
									address={this.state.location.address} />
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-md-12'}>
								<h4>5 day forecast</h4>
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
