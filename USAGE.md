# Build setup

## Webpack

### Babel-loader
 * compile jsx to js
 * transpile es6 to es5
 * resolve all project files from entry path
 * dump everything into output file bundle.js
 * No need for browserify

 
### Less, css and file loaders 
 * Use addition loader to compile less files and put them into bundle.js
 * uses extract plugin to grab less css from bundle and put into global css file.
 * same is done with css loaders and file loaders
 
### create source-maps for debugging

### webpack-dev-server
* node express server
* watches for changes and recompiles bundle.s
* works in memory
* does not write to 'public' build folder
* npm start executes dev server on port 3000

### public build
* compiled sources are packed into one files bundle.js
* all css are bundled in one global style.css
* index.html uses style.css and bundle.js (this is your app)
* has addition binary files for custom font type used for weather icons
* run npm compile to create new build from sources.

### npm & package.json
* npm start will install all node modules and start dev-server
* all dependencies are dev dependencies
* all code and npm modules are added to bundle.js
* no other dependencies needed

### CommonJS file format
* Allows for node.js style require and module.exports syntax - commonJS
* CommonJS format allows for synchronuous code style
* Same code style for frontend and server
* Allows to use es6 style module import and export
* Babel transforms code to async AMD format without browserify


 
# Application architecture

## React

### Components
* Component hierarchy starts in main.js where App component is rendered
* App is direct parent container for : Searchbox, currentLocation, fovariteList, Weatherbox, map, forecast, chart
* Weatherbox is composed of 2 childeren which each have their own child components ect..
* All state is contained in App component and passed down to its children through props
* Weatherbox is the only child component which also has state
* child components pass in formation back to parent through prop.callback mechanism
* component have basic validation of their props through defaultProps and propTypes (typed components!)

### flux implementation
* there are Stores for locations and favorites
* stores are containers for data and application state
* stores have event handlers that are setup with a callback event listener in the app component
* event listeners change component state by calling methods on the store
* The store is updated through a global dipatcher that listens for actions
* Actions are used for updating the store through a dispatcher
* Actions are called from within a (App) component
* When a action is called it is picked up by the dipatcher
* Any store that registers for this action through the dispatcher can receive the actions payload
* When the registered dispatcher has updated the store with the actions payload, a chnage event is triggered
* When ever a change event is emitted on the store, its change event listeners will be triggered
* When ever a change listener is triggered, the change event handler in the component will be executed
* The component event handler will be executed and setState is called with latest data from the store
* When ever state inside a component is changed, the render method is called
* This will trigger a cascading update of all components

### Also :
* Async calls are made from within an action
* Stores have pluggable/exchangable implementations

### setup and wiring
* main.js is used to setup and initialize main react component
* configured stores are passed to App component as props
* on app startup favorites are added to favorites store
 
 


