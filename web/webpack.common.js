//DO NOT TOUCH
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('../config.json').web

//CONFIG
const outputFolder = 'dist'
const URL = process.env.NODE_ENV === 'production' ? config.HOSTNAME : config.LOCAL_URL
const PORT = process.env.NODE_ENV === 'production' ? config.PRODUCTION_PORT : config.LOCAL_PORT
const API_URL = process.env.NODE_ENV === 'production' ? 'http://' + config.PRODUCTION_URL + ':' + config.API_PORT : 'http://' + URL + ':' + config.API_PORT

module.exports = {
    entry: "./app/index.js",
    plugins: [
        new HtmlWebpackPlugin({
            template: './app/index.ejs'
        }),
        new webpack.DefinePlugin({
            'API_URL': JSON.stringify(API_URL)
        })
    ],

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: [
                        [
                            'env',
                            {
                                modules: false,
                                targets: "ie"
                            }
                        ]
                    ]
                }
            },

            {
                test: /\.css$/,
                loaders: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },

            {
                test: /\.html$/,
                exclude: [
                    /node_modules/
                ],
                loader: 'html-loader',
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loader: "file-loader?name=/public/icons/[name].[ext]"
            },
        ]
    },
    output: {
        path: path.resolve(__dirname, outputFolder),
        filename: 'bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: outputFolder,
        compress: true,
        host: URL,
        port: PORT,
        historyApiFallback: true
    }
};