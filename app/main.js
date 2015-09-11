var React = require('react');

var App = require('./components/App');
var LocationsStore = require('./stores/LocationsStore');
var FavoritesStore = require('./stores/FavoritesStore');
var FavoritesResource = require('./stores/FavoritesResource');
var StoresManager = require('./stores/StoresManager');

// setup locations store
var locationsStore = new LocationsStore();

// set up favorite store with local storage impl.
var favoritesStoreImpl = new FavoritesResource(window.localStorage);
var favoritesStore = new FavoritesStore(favoritesStoreImpl);

// add some initial favorites
favoritesStore.add({'place_name':'Amsterdam'});
favoritesStore.add({'place_name':'Groningen'});
favoritesStore.add({'place_name':'Maastricht'});

// pass configured stores to React and get started
React.render(
	<App favorites={favoritesStore} locations={locationsStore} />,
	document.getElementById('main')
);
