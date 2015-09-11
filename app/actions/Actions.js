var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatchers/Dispatcher');
var LocationSource = require('../sources/LocationSource');

var Actions = {
	addFavorite(item) {
		Dispatcher.handleViewAction({
			actionType: Constants.ADD_FAVORITE,
			item: item
		});
	},

	removeFavorite(item) {
		Dispatcher.handleViewAction({
			actionType: Constants.REMOVE_FAVORITE,
			item: item
		});
	},

	setActiveLocation(name) {
		Dispatcher.handleViewAction({
			actionType: Constants.SET_ACTIVE_LOCATION,
			name: name
		});
	},

	fetchLocations() {
		LocationSource.fetch()
			.then((locations) => {
				Actions.updateLocations(locations);
			})
			.catch((errorMessage) => {
				Actions.locationsFailed(errorMessage);
			});
	},

	locationsFailed(errorMessage) {
		Dispatcher.handleViewAction({
			actionType: Constants.LOCATIONS_FAILED,
			locations: errorMessage
		})
	},

	updateLocations(data) {
		Dispatcher.handleViewAction({
			actionType: Constants.UPDATE_LOCATIONS,
			locations: data
		})
	}
};

module.exports = Actions;