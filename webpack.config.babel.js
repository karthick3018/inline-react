import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import path from 'path';

const ENV = 'production';

const CSS_MAPS = ENV !== 'production';

module.exports = {
	context: path.resolve(__dirname, 'src'),
	entry: ['@babel/polyfill','./index.js'],

	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js',
		libraryTarget: 'umd'
	},

	resolve: {
		extensions: ['.jsx', '.js', '.json', '.css'],
		modules: [
			path.resolve(__dirname, "src/lib"),
			path.resolve(__dirname, "node_modules"),
			'node_modules'
		],
		alias: {
			components: path.resolve(__dirname, "src/components"),    
			style: path.resolve(__dirname, "src/style"),
			'react': 'preact/compat',
			'react-dom': 'preact/compat'
		}
	},

	module: {
		rules: [
			{
				test: /\.js?$/,
				include: path.resolve(__dirname, 'src'),
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.css$/,
				include: [/\.global\./],
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(svg|woff2?|ttf|eot|jpe?g|png|gif)(\?.*)?$/i,
				use: ENV==='production' ? 'file-loader' : 'url-loader'
			}
		]
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: './index.ejs',
			minify: { collapseWhitespace: true }
		})
	] ,

	stats: { colors: true },

	node: {
		global: true,
		process: false,
		Buffer: false,
		__filename: false,
		__dirname: false,
		setImmediate: false
	},

	devtool: ENV === 'production' ? 'source-map' : '',

	devServer: {
		port: process.env.PORT || 8080,
		host: 'localhost',
		publicPath: '/',
		contentBase: './src',
		historyApiFallback: true,
		open: true,
		openPage: ''
	}
};