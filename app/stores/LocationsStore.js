var Constants = require('../constants/Constants');
var Dispatcher = require('../dispatchers/Dispatcher');
var EventEmitter = require('events').EventEmitter;

class LocationsStore extends EventEmitter {
	constructor(locations) {
		super();
		this.activeLocation = 'Amsterdam';
		this.locations = [];

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

	setActiveLocation(name) {
		this.activeLocation = name;
	}

	updateLocations(locations) {
		this.locations = locations;
	}

	getLocationItems() {
		return this.locations.filter((location) => {
			if (location.place_name == this.activeLocation) {
				return (location);
			}
		});
	}

	getLocationList() {
		var uniqueLocations = {};

		return this.locations.filter((location) => {

			var test = (location.station_id in uniqueLocations);
			// should not depend on data in order
			// ensure unique locations
			if (test) {
				return false;
			} else {
				uniqueLocations[location.station_id] = true;
				return true;
			}

		}).map(location => {
			return {
				value: location.place_name,
				label: location.place_name
			};
		});
	}

	registerDispatcher() {
		return Dispatcher.register((payload) => {
			var action = payload.action;

			switch (action.actionType) {
				case Constants.SET_ACTIVE_LOCATION:
					this.setActiveLocation(payload.action.name);
					break;

				case Constants.UPDATE_LOCATIONS:
					this.updateLocations(payload.action.locations);
					break;

				case Constants.LOCATIONS_FAILED:
					// for now just log it !
					console.log(payload.action.locations);
					break;

			}

			this.emitChange();

			return true;
		});
	}
}

module.exports = LocationsStore;
