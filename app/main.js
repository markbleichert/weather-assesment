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
//var initStore = stores.getStore('FavoritesStore');
//initStore.add({
//	name: 'Amsterdam',
//	address: 'Rinse Hofstraweg, 1118 Schiphol, Netherlands',
//	coords: {
//		lat: 52.3,
//		lng: 4.766667
//	}
//});


React.render(
	<App stores={stores}/>,
	document.getElementById('main')
);
