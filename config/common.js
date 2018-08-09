
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const env = require('dotenv').config()

const createListFromObject = (obj) => Object
.entries(obj)
.reduce((acc, [key, value]) => {
    acc[key] = JSON.stringify(value)
    return acc
}, {})

const environmentVariables = env && env.parsed ? createListFromObject(env.parsed): {}

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
        }),
        new webpack.DefinePlugin({
            'ENV': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
                ...environmentVariables,
                ...createListFromObject(process.env)
            }
        })
    ],
    devtool: false,
    stats: {
        children: false
    }
}
