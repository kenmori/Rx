
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const path = require("path");


module.exports = {
    context: __dirname + "/src",
    entry: {
        p1: "./index.js",
        p2: "./index2.js",
        commons: "./entry-for-commons-chunk"
    },

    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js",
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: ["babel-loader"],
                query: {
                    presets:['react', 'es2015', 'stage-3']
                }
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            }
        ]
    },
    sassLoader: {
        includePaths: [path.resolve(__dirname, "./some-folder")]
    },
    plugins: [
        new ExtractTextPlugin("[name].css"),
        new commonsChunkPlugin('commons', 'common.chunk.js')
    ]
}