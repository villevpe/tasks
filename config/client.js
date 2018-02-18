const path = require('path');
const merge = require('webpack-merge');
const common = require('./common')

module.exports = merge(common, {
    entry: {
        app: path.resolve(__dirname, '../client/index')
    }
})
