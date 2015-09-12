var mockData = require('../fixtures/data-json');
var moreData = require('../fixtures/more-json');

var LocationSource = {
	fetch() {
		var p1 = this.loadData(mockData);
		var p2 = this.loadData(moreData);

		// merge the results of to promise calls
		return Promise.all([p1, p2]).then((results) => {
			return [].concat.apply([], results)
		});
	},

	loadData(data) {
		return new Promise((resolve, reject) => {
			// simulate an asynchronous action where data is fetched on
			// a remote server somewhere.
			setTimeout(() => {
				try {
					// normalize data set
					var d = this.normalize(data);

					// return new normalized data
					resolve(d);

				} catch(e) {
					reject(e);
				}


			}, 1000);
		});
	},

	normalize(dataArray) {
		return dataArray.map((location, index) => {
			Object.keys(location).forEach((key) =>{
				// format ugly 'null' strings
				if (location[key] === 'NULL') {
					location[key] = '--';
				}
			});
			// make each entry unique
			location['id'] = index + 1;

			return location;
		});
	}
};

module.exports = LocationSource;
