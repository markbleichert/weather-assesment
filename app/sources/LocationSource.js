var mockData = require('../fixtures/data-json');

var LocationSource = {
	fetch() {
		return new Promise((resolve, reject) => {
			// simulate an asynchronous action where data is fetched on
			// a remote server somewhere.
			setTimeout(() => {
				try {
					// normalize data set
					var d = this.normalize(mockData);

					// return new normalized data
					resolve(d);

				} catch(e) {
					reject('Something went terribly wrong');
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
