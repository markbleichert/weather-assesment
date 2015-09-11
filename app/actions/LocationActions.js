var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatchers/Dispatcher');
var LocationSource = require('../sources/LocationSource');


var LocationActions = {
	setActiveLocation(name) {
		Dispatcher.handleViewAction({
			actionType: Constants.SET_ACTIVE_LOCATION,
			name: name
		});
	},

	fetchLocations() {
		LocationSource.fetch()
			.then((locations) => {
				this.updateLocations(locations);
			})
			.catch((errorMessage) => {
				this.locationsFailed(errorMessage);
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

module.exports = LocationActions;