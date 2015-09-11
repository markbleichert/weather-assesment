var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatchers/Dispatcher');
var EventEmitter = require('events').EventEmitter;

class FavoritesStore extends EventEmitter {
	constructor(resource) {
		super();
		this.resource = resource;
		this.registerDispatcher();
	}
	emitChange() {
		this.emit('change');
	}

	addChangeListener(callback) {
		this.on('change', callback);
	}

	removeChangeListener(callback) {
		this.removeChangeListener('change', callback);
	}

	add(location) {
		this.resource.addFavorite(location)
	}

	remove(location) {
		this.resource.removeFavorite(location);
	}

	getFavorites() {
		return this.resource.getFavorites();
	}

	isFavorite(location) {
		return this.resource.isFavorite(location)
	}

	registerDispatcher() {
		return Dispatcher.register((payload) => {
			var action = payload.action;

			switch(action.actionType) {
				case Constants.ADD_FAVORITE:
					this.add(payload.action.item);
					break;

				case Constants.REMOVE_FAVORITE:
					this.remove(payload.action.item);
					break;

			}

			this.emitChange();

			return true;
		});
	}
};

module.exports = FavoritesStore;