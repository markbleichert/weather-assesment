var React = require('react');

var LocationItem = React.createClass({

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
				{this.props.location.address}
				<span className='glyphicon glyphicon-menu-right'></span>
			</a>
		);

	}

});

module.exports = LocationItem;
