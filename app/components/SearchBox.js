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

		this.props.onSearch(newValue);

		this.setState({
			selectValue: newValue || null
		});

		//@todo: remove text value in searchbox
	},
	focusStateSelect () {
		this.refs.stateSelect.focus();
	},

	render () {
		return (
			<div id="find-a-forecast" className="section">
				<h2>Find a forecast</h2>
				<Select ref="stateSelect" options={this.props.data} searchable={this.state.searchable} disabled={this.state.disabled} value={this.state.selectValue} onChange={this.updateValue}  />
			</div>
		);
	}
});


module.exports = SearchBox;