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


// set up init data for favorites
var favStore = stores.getStore('FavoritesStore');

favStore.add({"name":"Amsterdam","address":"Rinse Hofstraweg, 1118 Schiphol, Netherlands"});
favStore.add({"name":"Groningen","address":"Het Hout 151-152, 9723 Groningen, Netherlands"});
favStore.add({"name":"Maastricht","address":"Horsterweg 15, 6199 AC Maastricht-Airport, Netherlands"});

React.render(
	<App stores={stores}/>,
	document.getElementById('main')
);
