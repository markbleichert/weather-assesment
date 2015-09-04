var React = require('react');

var App = require('./components/App');
var DataStore = require('./stores/DataStore');
var FavStore = require('./stores/FavoritesStore');
var StoresManager = require('./stores/StoresManager');

var data = require('./fixtures/data-json');

// configuring stores and using store-manager
var stores = new StoresManager();

stores.addStore('DataStore', new DataStore(data));
stores.addStore('FavoritesStore', new FavStore(window.localStorage));

React.render(
	<App stores={stores}/>,
	document.getElementById('main')
);
