var React = require('react');

var SearchBox = require('./SearchBox');
var Forecast = require('./Forecast');
var WeatherBox = require('./weatherbox/WeatherBox');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var FavoritesList = require('./favorites/FavoritesList');
var FavoriteActions = require('../actions/FavoriteActions');
var LocationActions = require('../actions/LocationActions');
var Chart = require('./Chart');

require('../styles/global.less');

var App = React.createClass({

	propTypes: {
		locations: React.PropTypes.object.isRequired,
		favorites: React.PropTypes.object.isRequired
	},

	onFavoritesChange() {
		this.setState({
			favorites: this.props.favorites.getFavorites()
		});
	},

	onLocationChange() {
		this.setState({
			locationList: this.props.locations.getLocationList(),
			currentLocationSet: this.props.locations.getLocationItems()
		});
	},

	componentWillMount() {
		this.props.favorites.addChangeListener(this.onFavoritesChange);
		this.props.locations.addChangeListener(this.onLocationChange);
	},

	componentWillUnmount() {
		this.props.favorites.removeChangeListener(this.onFavoritesChange);
		this.props.locations.removeChangeListener(this.onLocationChange);
	},

	componentDidMount() {
		LocationActions.fetchLocations();
	},

	getInitialState() {
		return {
			favorites: [],
			currentLocationSet: [],
			locationList: []
		};
	},

	getFormattedStatus(status = 'ERR') {
		var map = {
			'ERR': 'Unexpect error occured',
			'ZERO_RESULTS': 'No results found',
			'OK': ''
		};

		return map[status];
	},

	toggleFavorite(location) {
		if (this.props.favorites.isFavorite(location)) {
			FavoriteActions.removeFavorite(location);
		}
		else {
			FavoriteActions.addFavorite(location);
		}
	},

	isFavorite(location) {
		return this.props.favorites.isFavorite(location);
	},

	onNewLocation(location_name) {
		LocationActions.setActiveLocation(location_name);
	},

	render() {
		// show placeholder until data is loaded
		if (!this.state.locationList.length) {
			return (
				<div className='loading'>Loading..</div>
			);
		}

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
							onSearch={this.onNewLocation}
							label='Locations'
							data={this.state.locationList} />

						<FavoritesList
							locations={this.state.favorites}
							activeLocation={this.state.currentLocationSet[0]}
							onClick={this.onNewLocation} />
					</div>
					<div className={'col-md-9'}>
						<div className={'row'}>
							<div className={'col-md-12'}>
								<CurrentLocation
									location={this.state.currentLocationSet[0]}
									favorite={this.isFavorite(this.state.currentLocationSet[0])}
									onFavoriteToggle={this.toggleFavorite} />
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-md-6'}>
								<WeatherBox
									locations={this.state.currentLocationSet} />
							</div>
							<div className={'col-md-6'}>
								<Map location={this.state.currentLocationSet[0]} />
							</div>
						</div>
						<div className={'row'}>
							<div className={'col-md-8'}>
								<h4>5 day forecast</h4>
								<Forecast locations={this.state.currentLocationSet}/>
							</div>
							<div className={'col-md-4'}>
								<h4>Percipitation outlook</h4>
								<Chart locations={this.state.currentLocationSet}/>
							</div>
						</div>
					</div>
				</div>
			</div>

		);
	}

});

module.exports = App;
