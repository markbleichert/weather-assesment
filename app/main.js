var React = require('react');

var App = require('./components/App');
var LocationsStore = require('./stores/LocationsStore');
var FavoritesStore = require('./stores/FavoritesStore');
var FavoritesResource = require('./stores/FavoritesResource');
var StoresManager = require('./stores/StoresManager');
var data = require('./fixtures/data-json');


// setup locations store
var locationsStore = new LocationsStore(data);

// set up favorite store with local storage impl.
var favoritesStoreImpl = new FavoritesResource(window.localStorage);
var favoritesStore = new FavoritesStore(favoritesStoreImpl);

// add some initial favorites
favoritesStore.add({'name':'Amsterdam',
	'address':'Rinse Hofstraweg, 1118 Schiphol, Netherlands'});
favoritesStore.add({'name':'Groningen',
	'address':'Het Hout 151-152, 9723 Groningen, Netherlands'});
favoritesStore.add({'name':'Maastricht',
	'address':'Horsterweg 15, 6199 AC Maastricht-Airport, Netherlands'});

// pass configured stores to React and get started
React.render(
	<App favorites={favoritesStore} locations={locationsStore} />,
	document.getElementById('main')
);
