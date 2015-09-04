
class FavoritesStore {
	constructor() {
		this.localStorage = localStorage;

	}

	getAll() {
		return JSON.parse(this.localStorage.getItem('favorites')) || [];
	}

	getByAddress(address) {
		var favorites = this.getAll();
		var result = null;

		favorites.some((loc) => {
			if (loc.location.address == address) {
				result = loc;
				return true;
			}
		});

		return result;
	}

	updateStorage(favorites) {
		this.localStorage.setItem('favorites', JSON.stringify(favorites));
	}

	add(location) {
		var favorites = this.getAll();

		favorites.push({
			location: {
				name: location.name,
				address: location.address
			},
			timestamp: Date.now()
		});

		this.updateStorage(favorites);
	}

	remove(location) {

		var favorites = this.getAll();
		var index = -1;

		for (var i = 0; i < favorites.length; i++) {

			if (favorites[i].location.address == location.address) {
				index = i;
				break;
			}

		}

		// If it was found, remove it from the favorites array

		if (index !== -1) {

			favorites.splice(index, 1);

			this.updateStorage(favorites);

		}
	}
}

// for now init here !
module.exports = FavoritesStore;
