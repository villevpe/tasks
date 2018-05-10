const path = require('path');
const merge = require('webpack-merge');

const common = require('./common');

module.exports = merge(common, {
    // The target should be set to "node" to avoid packaging built-ins
    target: 'node',
    node: {
        // Fixes an issue with __dirname pointing to fs root
        __dirname: false
    },
    entry: {
        server: path.resolve(__dirname, '../server/index')
    },
    output: {
        publicPath: path.resolve(__dirname, '../build'),
        // Outputs node-compatible modules instead of browser-compatible ones
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: 'null-loader'
            }
        ]
    },
    // Avoids bundling external dependencies, so node can load them directly from node_modules/
    externals: Object.keys(require('../package.json').dependencies),
    devtool: false
})
