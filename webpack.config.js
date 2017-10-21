const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: [
        'react-hot-loader/patch',
        // activate HMR for React

        'webpack-dev-server/client?http://localhost:3000',
        // bundle the client for webpack-dev-server
        // and connect to the provided endpoint

        'webpack/hot/only-dev-server',
        // bundle the client for hot reloading
        // only- means to only hot reload for successful updates

        './src/index'
    ],
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'index.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js'],
        alias: {
            styles: path.resolve(__dirname, 'src/styles')
        }
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loaders: ['react-hot-loader/webpack', 'ts-loader']
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ['css-hot-loader'].concat(
                    ExtractTextPlugin.extract({
                        use: [
                            'css-loader',
                            'sass-loader',
                            {
                                loader: 'postcss-loader',
                                options: {
                                    plugins: () => [
                                        require('autoprefixer')({
                                            browsers: ['last 4 versions']
                                        })
                                    ]
                                }
                            }
                        ],
                        fallback: "style-loader"
                    })
                )
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
        new webpack.HotModuleReplacementPlugin(),
        // enable HMR globally

        new webpack.NamedModulesPlugin(),
        // prints more readable module names in the browser console on HMR updates

        new webpack.NoEmitOnErrorsPlugin(),
        // do not emit compiled assets that include errors,

        new webpack.optimize.ModuleConcatenationPlugin(),
        new ExtractTextPlugin({
            filename: 'style.css',
            disable: process.env.NODE_ENV === "development",
            allChunks: true
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: 'localhost',
        port: 3000,

        historyApiFallback: true,
        // respond to 404s with index.html

        hot: true,
        // enable HMR on the server
    },
    devtool: '#source-map'
}
