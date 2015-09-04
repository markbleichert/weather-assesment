class StoreManager {

	constructor() {
		this.stores = {};
	}

	getStore(name) {
		return this.stores[name];
	}

	addStore(name, storeInstance) {
		if (name in this.stores) {
			console.warn(`StoreManager.addStore: Store "${name}" already added`);
			return;
		}

		this.stores[name] = storeInstance;
	}
}

module.exports = StoreManager;
