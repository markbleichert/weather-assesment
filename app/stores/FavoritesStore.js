var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatchers/Dispatcher');
var EventEmitter = require('events').EventEmitter;

class FavoritesStore extends EventEmitter {
	constructor(storage) {
		super();
		this.storage = storage;
		this.favorites = storage.getItems();
		this.normalize();
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

	// This method was added for backwards compatibility from previous
	// version. Old items with different api will be removed from storage.
	// This method should probably be moved to storage class
	normalize() {
		this.getFavorites().forEach((obj) => {
			// remove stale items from previous versions
			if (!obj.location.hasOwnProperty('place_name')) {
				console.warn('Removed invalid favorite from storage');
				this.remove(obj.location);
			}
		});
	}

	isFavorite(location) {
		if (!location) {
			return false;
		} else {
			return (this._getByName(location) !== null);
		}
	}

	_getByName(location) {
		var favorites = this.getFavorites();
		var result = null;

		favorites.some((loc) => {
			if (loc.location.place_name == location.place_name) {
				result = loc;
				return true;
			}
		});

		return result;
	}

	add(location) {
		var favorites = this.getFavorites();

		if (!this.isFavorite(location)) {
			favorites.push({
				location: {
					place_name: location.place_name
				},
				timestamp: Date.now()
			});

			// put updated array back into storage
			this.storage.update(favorites);
		}
	}

	remove(location) {
		var favorites = this.getFavorites();
		var index = -1;

		for (var i = 0; i < favorites.length; i++) {
			if (favorites[i].location.place_name == location.place_name) {
				index = i;
				break;
			}
		}

		// If it was found, remove it from the favorites array
		if (index !== -1) {
			favorites.splice(index, 1);

			// put updated array back into storage
			this.storage.update(favorites);

		}
	}

	getFavorites() {
		return this.favorites;
	}

	registerDispatcher() {
		return Dispatcher.register((payload) => {
			var action = payload.action;

			switch (action.actionType) {
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
