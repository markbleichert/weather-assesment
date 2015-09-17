class FavoritesSource {
	constructor(localStorage) {
		this.localStorage = localStorage;
	}

	update(favorites) {
		this.localStorage.setItem('favorites', JSON.stringify(favorites));
	}

	getItems() {
		return JSON.parse(this.localStorage.getItem('favorites')) || [];
	}
}

module.exports = FavoritesSource;
