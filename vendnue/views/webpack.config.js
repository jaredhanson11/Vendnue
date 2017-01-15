var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        login: './login/index.js',
        example: './example/index.js'
    },
    output: {
        path: path.join(__dirname, 'static', 'js'),
        filename: '[name].bundle.js'
    },
    watch: true,
    module: {
        loaders: [
        {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets: ['es2015', 'react']
                }
            }
        ]
    },
};
