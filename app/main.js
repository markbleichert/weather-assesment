var React = require('react');

var App = require('./components/App');
var LocationsStore = require('./stores/LocationsStore');
var FavoritesStore = require('./stores/FavoritesStore');
var FavoritesSource = require('./sources/FavoritesSource');

// setup locations store
var locationsStore = new LocationsStore([], 'Amsterdam');

// set up favorite store with local storage impl.
var storageImpl = new FavoritesSource(window.localStorage); // or window.sessionStorage
var favoritesStore = new FavoritesStore(storageImpl);

// add some initial favorites
favoritesStore.add({'place_name': 'Amsterdam'});
favoritesStore.add({'place_name': 'Groningen'});
favoritesStore.add({'place_name': 'Maastricht'});

// pass configured stores to React and get started
// @todo: choose different store property names
React.render(
	<App favorites={favoritesStore} locations={locationsStore} />,
	document.getElementById('main')
);
