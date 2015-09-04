var React = require('react');
var App = require('./App');

var DataStore = require('../stores/DataStore.js');
var FavStore = require('../stores/FavoritesStore.js');
var StoresManager = require('../stores/StoresManager.js');

var data = require('../fixtures/Data.js');

// configuring stores and using store-manager
var stores = new StoresManager();

stores.addStore('DataStore', new DataStore(data));
stores.addStore('FavoritesStore', new FavStore(window.localStorage));

React.render(
	<App stores={stores}/>,
	document.getElementById('main')
);
