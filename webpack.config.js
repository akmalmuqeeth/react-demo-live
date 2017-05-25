const path = require('path')

module.exports = {
	//the directory that contains the entry files.
	context: __dirname,

	//The point points to enter the application.
	entry: './index.js',

	// path for the putput bundle
	output : {
		path : path.join(__dirname, '/public'),
		filename: 'bundle.js'
	},

	//run webpack on all files with these extensions
	resolve : {
		extensions: ['.js', '.json']
	},

	// webpack output stats
	stats : {
		colors : true,
		reasons : true,
		chunks: true
	},
	//file loader rules
	module : {
		rules : [
			{
				exclude: /node_modules/,
				test: /\.js$/,
				loader: 'babel-loader'
			}
		]
	}
}