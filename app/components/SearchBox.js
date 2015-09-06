var React = require('react');
var Select = require('react-select');

require('react-select/less/default.less');
require('../styles/SearchBox.css');

var SearchBox = React.createClass({

	propTypes: {
		data: React.PropTypes.arrayOf(React.PropTypes.object),
		status: React.PropTypes.string,
		onSearch: React.PropTypes.func.isRequired
	},

	getDefaultProps() {
		return {
			data: [],
			status: ''
		};
	},

	getInitialState() {
		return {
			searchable: true,
			disabled: false,
			selectValue: ''
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
			<div id='find-a-forecast' className='section'>
				<h2>Find weather forecast</h2>
				<Select ref='stateSelect'
						options={this.props.data}
						searchable={this.state.searchable}
						disabled={this.state.disabled}
						onChange={this.updateValue}
				/>
				<span className='status'>{this.props.status}</span>
			</div>
		);
	}
});

module.exports = SearchBox;
