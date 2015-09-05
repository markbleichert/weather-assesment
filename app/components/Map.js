var React = require('react');

require('../styles/Map.css');

var Map = React.createClass({

	componentDidMount() {

		// Only componentDidMount is called when the component is first added to
		// the page. This is why we are calling the following method manually.
		// This makes sure that our map initialization code is run the first time.
		// This kind of works like a class contructor ;-)

		this.componentDidUpdate();
	},

	componentDidUpdate() {

		if (this.lastLat == this.props.coords.lat && this.lastLng == this.props.coords.lng) {

			// The map has already been initialized at these coordinates.
			// Return from this method so that we don't reinitialize it
			// and cause it to flicker.
			return;
		}

		this.lastLat = this.props.coords.lat;
		this.lastLng = this.props.coords.lng;

		// create the map with our coordinates
		var map = new google.maps.Map(document.getElementById('map'), {
			zoom: 10,
			center: {
				lat: this.props.coords.lat,
				lng: this.props.coords.lng,
			}
		});


		// build info window content
		var coords = `${this.lastLat} - ${this.lastLng}`;
		var contentString = `<div>${coords}</div>`;

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		// Adding a marker to the location we are showing
		var marker = new google.maps.Marker({
			position: {
				lat: this.props.coords.lat,
				lng: this.props.coords.lng
			},
			map: map
		});

		// open by default
		infowindow.open(map, marker);

	},

	render() {

		return (
			<div className='map-holder'>
				<p>Loading...</p>
				<div id='map'></div>
			</div>
		);
	}

});

module.exports = Map;
