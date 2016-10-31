class GoogleMapsProxy {
	constructor(element) {
		this.element = element;

		this.init();
	}

	init() {
		try {
			// try catch 3rd party code
			this.map = new google.maps.Map(this.element, {});
			this.marker = new google.maps.Marker({});
			this.info = new google.maps.InfoWindow({});

		} catch (e) {
			this.element.innerHTML = 'Google maps unavailable..';
			console.warn(e.message);
		}
	}

	setMarker(options) {
		// set marker only when map available
		if (this.map) {
			this._setMapOptions(options);
			this._setMarkerOptions(options);
			this._setInfoOptions(options);

			// show window by default
			this.info.open(this.map, this.marker);
		}
	}

	_setMapOptions(options) {
		this.map.setOptions({
			zoom: 8,
			mapTypeControl: false,
			center: {
				lat: options.lat,
				lng: options.lng
			}
		});
	}

	_setMarkerOptions(options) {
		this.marker.setOptions({
			map: this.map,
			position: {
				lat: options.lat,
				lng: options.lng
			}
		});
	}

	_setInfoOptions(options) {
		var windowMarkup = `<div class="info">Weather station: <br/> ` +
			`${options.name} <br/> ${options.lat} - ${options.lng}</div>`;

		this.info.setOptions({
			content: windowMarkup
		});
	}
}

export default GoogleMapsProxy;
