var mockData = require('../fixtures/data-json');

var LocationSource = {
	fetch: function () {
		return new Promise(function (resolve, reject) {
			// simulate an asynchronous action where data is fetched on
			// a remote server somewhere.
			setTimeout(function () {
				// resolve with mock data
				resolve(mockData);
			}, 1000);
		});
	}
};

module.exports = LocationSource;
