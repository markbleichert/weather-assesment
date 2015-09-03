import React from 'react';
import Select from 'react-select';

var SearchBox = React.createClass({
	getInitialState () {
		return {
			searchable: true,
			disabled: false,
			selectValue: ''
		};
	},

	updateValue (newValue) {
		// 3rd part callbacks always in try/catch
		var cb = this.props.onSearch;
		if (typeof cb == 'function') {
			try {
				cb(newValue);
			} catch (e) {
				console.error(`Unable to call onSearch: ${e.message}`);
			}
		}
	},

	render () {
		return (
			<div id="find-a-forecast" className="section">
				<h2>Find a forecast</h2>
				<Select ref="stateSelect"
						options={this.props.data}
						searchable={this.state.searchable}
						disabled={this.state.disabled}
						onChange={this.updateValue}
				/>
			</div>
		);
	}
});


module.exports = SearchBox;