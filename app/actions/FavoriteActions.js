var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatchers/Dispatcher');

var FavoriteActions = {
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
	}
}

module.exports = FavoriteActions;
