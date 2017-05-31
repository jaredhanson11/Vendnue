var path = require('path');
var webpack = require('webpack');

var config = {
    entry: {
        concerts: './concerts/index.jsx',
        concert: './concert/index.jsx',
        sell: './sell/index.jsx'
     },
    output: {
        path: path.resolve(__dirname, 'static', 'js'),
        filename: '[name].bundle.js'
    },
    watch: true,
    module: {
        loaders: [{
            test: [/\.jsx?$/, /\.js?$/],
            loader: 'babel',
            exclude: /node_modules/,
            query:
            {
                presets:['es2015', 'react']
            }
        }]
    },

};

module.exports = config;
