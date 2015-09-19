var React = require('react');
var GoogleMaps = require('../adapters/GoogleMapsProxy');

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
		var mapDomElement = React.findDOMNode(this.refs.map);
		this.map = new GoogleMaps(mapDomElement);
	},

	componentDidUpdate() {
		this.map.setMarker({
			lat: this.props.location.latitude,
			lng: this.props.location.longitude,
			name: this.props.location.place_name
		});
	},

	render() {
		return (
			<div className='map-holder'>
				<div ref='map' className='map'>
					<p>Loading...</p>
				</div>
			</div>
		);
	}

});

module.exports = Map;
