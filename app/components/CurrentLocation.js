import React from 'react';
import classNames from 'classnames';

import'../styles/CurrentLocation.css';

class CurrentLocation extends React.Component {

	toggleFavorite() {
		this.props.onFavoriteToggle(this.props.location);
	}

	render() {
		var starClassName = classNames({
			'glyphicon': true,
			'glyphicon-star-empty': !this.props.favorite,
			'glyphicon-star': this.props.favorite
		});

		// in an e6 class this needs to bound explicitly to the right context
		// eg. 'this.methodName.bind(this)' or else 'this' will be 'undefined'
		return (
			<div className='current-location'>
				<h4 className='save-location'>
					<span className='title-prefix'>daily weather</span>
					<span>{this.props.location.place_name}</span>
				</h4>
				<span className={starClassName} onClick={this.toggleFavorite.bind(this)} aria-hidden='true'></span>
			</div>
		);
	}
};

// Not sure if I like this syntax
// but this is how its done in es6:
//
// static class properties
CurrentLocation.propTypes = {
	location: React.PropTypes.object
};

CurrentLocation.defaultProps = {
	favorite: {},
	location: {}
};

export default CurrentLocation;
