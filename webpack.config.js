var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
	entry: "./app/components/Main.js",
	output: {
		path: 'public',
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract("css-loader")
			},
			{
				test: /\.png$/,
				loader: "file-loader"
			},
			{
				test: /\.jsx?$/,
				exclude: /(node_modules|bower_components)/,
				loader: 'babel'
			}
		]
	},

	plugins: [
		// takes text out of bundle.js and puts it in style.css
		new ExtractTextPlugin("style.css", { allChunks: true })
	]
};