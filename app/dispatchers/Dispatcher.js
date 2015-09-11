var FluxDispatcher = require('flux').Dispatcher;
var assign = require('react/lib/Object.assign');

var Dispatcher = assign(new FluxDispatcher(), {
	handleViewAction(action) {
		this.dispatch({
			source: 'VIEW_ACTION',
			action: action
		});
	}
});

module.exports = Dispatcher;
