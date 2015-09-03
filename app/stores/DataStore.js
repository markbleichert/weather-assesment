class DataStore {
	constructor(data) {
		this.data = data;
	}

	getCurrentLocationItems(location_id) {
		return this.data.filter(function (obj) {
			// change naming this is confusing ! place_name == location_id
			if (obj.place_name == location_id) {
				return (obj);
			}
		});
	}
	getListItems() {
		var arr = [];
		var lastId = null;

		this.data.forEach(function (obj) {
			if (obj.station_id !== lastId) {

				// check if ID property is used ok in react iterator
				arr.push({
					id: obj.station_id,
					value: obj.place_name,
					label: obj.place_name
				});
			}
			lastId = obj.station_id;
		});
		return arr;
	}
}

module.exports = new DataStore(require('../fixtures/Data'));
