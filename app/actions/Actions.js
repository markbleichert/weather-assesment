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
	}
};

module.exports = Actions;