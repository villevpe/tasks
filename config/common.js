
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
    output: {
        path: path.resolve(__dirname, '../build/'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['ts-loader']
            },
            {
                test: /\.(png|woff|woff2|eot|ttf|svg)$/,
                exclude: /node_modules/,
                loader: 'file-loader?name=[name].[ext]&publicPath=./'
            },
            {
                test: /\.tsx$/,
                exclude: /node_modules/,
                enforce: 'pre',
                loader: 'tslint-loader'
            }
        ]
    },
    plugins: [
        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            allChunks: true
        })
    ],
    devtool: false,
    stats: {
        children: false
    }
}
