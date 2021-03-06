const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const combineLoaders = require('webpack-combine-loaders');


let babelQuery = {
	compact: false,
	presets: ['react', ['es2015', {"modules": false}]]
};


// only extract po files if we need to
if ( 'True' === process.env.CN_EXTRACT_TRANSLATIONS ) {
	babelQuery.plugins.push( 'babel-gettext-extractor' );
	babelQuery.plugins.extra = {
		gettext: {
			fileName: 'en.po',
			baseDirectory: path.join( __dirname, 'app' ),
			functionNames: {
				gettext: ['msgid'],
				ngettext: ['msgid', 'msgid_plural', 'count'],
				gettextComponentTemplate: ['msgid'],
				t: ['msgid'],
				tN: ['msgid', 'msgid_plural', 'count'],
				tct: ['msgid']
			},
		},
	};
}

module.exports = [
	{
		test: /\.jsx?$/,
		exclude: /(node_modules|bower_components|dist|public)/,
		loader: 'babel',
		query: babelQuery
	},
	{
		test: /\.json$/,
		loader: 'json-loader'
	},
	{
		test: /\.po$/,
		loader: 'po-catalog-loader',
		query: {
			referenceExtensions: ['.js', '.jsx'],
			domain: 'cnchi'
		}
	},
	{
		test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "file"
	},
	{
		test: /\.(woff|woff2)$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?prefix=font/&limit=5000"
	},
	{
		test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?limit=10000&mimetype=application/octet-stream"
	},
	{
		test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
		exclude: /(node_modules|bower_components)/,
		loader: "url?limit=10000&mimetype=image/svg+xml"
	},
	{
		test: /\.gif/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/gif"
	},
	{
		test: /\.jpg/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/jpg"
	},
	{
		test: /\.png/,
		exclude: /(node_modules|bower_components)/,
		loader: "url-loader?limit=10000&mimetype=image/png"
	},
	{
		test: /vendor\/\.css$/,
		loader: ExtractTextPlugin.extract({
			fallbackLoader: 'style-loader',
			loader: 'css-loader'
		})
	},
	{
		test: /\.css$/,
		loader: ExtractTextPlugin.extract({
			fallbackLoader: 'style-loader',
			loader: 'css-loader?modules&importLoaders=1'
		}),
		exclude: /vendor\/\.css$/,
	},
];
