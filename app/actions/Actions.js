var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatchers/Dispatcher');

var Actions = {
	addFavorite: function (item) {
		Dispatcher.handleViewAction({
			actionType: Constants.ADD_FAVORITE,
			item: item
		});
	},

	removeFavorite: function (item) {
		Dispatcher.handleViewAction({
			actionType: Constants.REMOVE_FAVORITE,
			item: item
		});
	},

	setActiveLocation: function (name) {
		Dispatcher.handleViewAction({
			actionType: Constants.SET_ACTIVE_LOCATION,
			name: name
		});
	}
};

module.exports = Actions;