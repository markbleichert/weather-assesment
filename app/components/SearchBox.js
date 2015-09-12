var React = require('react');
var Select = require('react-select');

require('react-select/less/default.less');
require('../styles/SearchBox.css');

var SearchBox = React.createClass({

	propTypes: {
		data: React.PropTypes.arrayOf(React.PropTypes.object),
		onSearch: React.PropTypes.func.isRequired
	},

	getDefaultProps() {
		return {
			data: []
		};
	},

	updateValue(newValue) {
		// good practice to put 3rd part callbacks in try/catch
		var cb = this.props.onSearch;
		if (typeof cb == 'function') {
			try {
				cb(newValue);
			} catch (e) {
				console.error(`Unable to call onSearch: ${e.message}`);
			}
		}
	},

	render() {
		return (
			<div id='find-a-forecast'>
				<h2>Find weather forecast</h2>
				<Select
					options={this.props.data}
					onChange={this.updateValue}
				/>
			</div>
		);
	}
});

module.exports = SearchBox;
