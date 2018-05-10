const path = require('path');
const merge = require('webpack-merge');
const common = require('./common');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(common, {
    entry: {
        app: path.resolve(__dirname, '../client/index')
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    use: [
                        'css-loader',
                        'sass-loader',
                        'postcss-loader'
                    ],
                    fallback: 'style-loader'
                })
            },
        ]
    }
})
