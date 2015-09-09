var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatchers/Dispatcher');

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
	}
};

module.exports = Actions;