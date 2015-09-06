var React = require('react');

var FavoritesItem = React.createClass({

	propTypes: {
		location: React.PropTypes.object,
		onClick: React.PropTypes.func.isRequired,
		active: React.PropTypes.bool
	},

	handleClick() {
		// TODO: catch error
		this.props.onClick(this.props.location.name);
	},

	render() {

		var cn = 'list-group-item';

		if (this.props.active) {
			cn += ' active-location';
		}

		return (
			<a className={cn} onClick={this.handleClick}>
				{this.props.location.name}
				<span className='glyphicon glyphicon-menu-right'></span>
			</a>
		);

	}

});

module.exports = FavoritesItem;
