var React = require('react');

var DATA = require('./Data');
//var localStorage = require('./LocalStorage'); @todo: use this class

var SearchBox = require('./SearchBox');
var Forecast = require('./Forecast');
var Map = require('./Map');
var CurrentLocation = require('./CurrentLocation');
var LocationList = require('./LocationList');


var App = React.createClass({

	getInitialState(){

		// Extract the favorite locations from local storage

		var favorites = [];

		if(localStorage.favorites){
			favorites = JSON.parse(localStorage.favorites);
		}

		// Nobody would get mad if we center it on Paris by default

		return {
			favorites: favorites,
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

	toggleFavorite(location){

		if(this.isAddressInFavorites(location)){
			this.removeFromFavorites(location);
		}
		else{
			this.addToFavorites(location);
		}

	},

	addToFavorites(location){

		var favorites = this.state.favorites;

		favorites.push({
			location: {
				name: location.name,
				address: location.address
			},
			timestamp: Date.now()
		});

		this.setState({
			favorites: favorites
		});

		localStorage.favorites = JSON.stringify(favorites);
	},

	removeFromFavorites(location){

		var favorites = this.state.favorites;
		var index = -1;

		for(var i = 0; i < favorites.length; i++){

			if(favorites[i].location.address == location.address){
				index = i;
				break;
			}

		}

		// If it was found, remove it from the favorites array

		if(index !== -1){

			favorites.splice(index, 1);

			this.setState({
				favorites: favorites
			});

			localStorage.favorites = JSON.stringify(favorites);
		}

	},

	isAddressInFavorites(location) {

		var favorites = this.state.favorites;

		for(var i = 0; i < favorites.length; i++){

			if(favorites[i].location.address == location.address){
				return true;
			}

		}

		return false;
	},

	searchForAddress(location_name){

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

	render(){
		var listItems = DATA.getListItems();
		var locations = DATA.getCurrentLocationItems(this.state.location.name);

		return (

			<div>
				<div className={"row"}>
					<div className={"col-md-12"}>
						<CurrentLocation location={this.state.location}
								 favorite={this.isAddressInFavorites(this.state.location)}
								 onFavoriteToggle={this.toggleFavorite} />
					</div>
				</div>
				<div className={"row"}>
					<div className={"col-md-3"}>
						<SearchBox onSearch={this.searchForAddress} label="Locations" data={listItems}/>
						<LocationList locations={this.state.favorites} activeLocation={this.state.location}
									  onClick={this.searchForAddress} />
					</div>
					<div className={"col-md-9"}>
						<Forecast locations={locations}/>
						<br/>
						<div className={"col-md-8"}>
							<Map coords={this.state.location.coords} />
						</div>


					</div>
				</div>
			</div>

		);
	}

});

module.exports = App;