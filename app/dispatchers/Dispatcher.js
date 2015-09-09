var FluxDispatcher = require('flux').Dispatcher;
var assign = require('React/lib/Object.assign');

var Dispatcher = assign(new FluxDispatcher(), {
	handleViewAction: function (action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}
});

module.exports = Dispatcher;
