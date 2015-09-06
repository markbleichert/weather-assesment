var React = require('react');
var classNames = require('classnames');

var FavoritesItem = React.createClass({

	propTypes: {
		location: React.PropTypes.object,
		onClick: React.PropTypes.func.isRequired,
		active: React.PropTypes.bool
	},

	getDefaultProps: function () {
		return {
			location: {},
			active: false
		};
	},

	handleClick() {
		this.props.onClick(this.props.location.name);
	},

	render() {

		var itemClassNames = classNames({
			'list-group-item': true,
			'active-location': this.props.active
		});

		return (
			<a className={itemClassNames} onClick={this.handleClick}>
				{this.props.location.name}
				<span className='glyphicon glyphicon-menu-right'></span>
			</a>
		);

	}

});

module.exports = FavoritesItem;
