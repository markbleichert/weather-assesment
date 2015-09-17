class FavoritesSource {
	constructor(storage) {
		this.storage = storage;
	}

	update(favorites) {
		this.storage.setItem('favorites', JSON.stringify(favorites));
	}

	getItems() {
		return JSON.parse(this.storage.getItem('favorites')) || [];
	}
}

module.exports = FavoritesSource;
