var React = require('react');

require('../styles/Map.css');

var Map = React.createClass({

	propTypes: {
		location: React.PropTypes.object
	},

	getDefaultProps() {
		return {
			location: {}
		};
	},

	componentDidMount() {

		// Only componentDidMount is called when the component is first added to
		// the page. This is why we are calling the following method manually.
		// This makes sure that our map initialization code is run the first time.
		// This kind of works like a class contructor ;-)

		this.componentDidUpdate();
	},

	componentDidUpdate() {
		var lat = this.props.location.latitude;
		var lng = this.props.location.longitude;

		if (this.lastLat == lat && this.lastLng == lng) {

			// The map has already been initialized at these coordinates.
			// Return from this method so that we don't reinitialize it
			// and cause it to flicker.
			return;
		}

		this.lastLat = lat;
		this.lastLng = lng;

		// get the map dom element
		var mapDomElement = React.findDOMNode(this.refs.map)

		// create the map with our coordinates
		var map = new google.maps.Map(mapDomElement, {
			zoom: 8,
			mapTypeControl: false,
			center: {
				lat: lat,
				lng: lng
			}
		});


		// build info window content
		var contentString = `<div class="info">Weather station: <br/> ${this.props.location.place_name} <br/> ${lat} - ${lng}</div>`;

		var infowindow = new google.maps.InfoWindow({
			content: contentString
		});

		// Adding a marker to the location we are showing
		var marker = new google.maps.Marker({
			position: {
				lat: lat,
				lng: lng
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
				<div ref='map' className='map'></div>
			</div>
		);
	}

});

module.exports = Map;
