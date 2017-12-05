//CONFIG
const LOCAL_URL = 'localhost'
const LOCAL_PORT = '81'
const PRODUCTION_PORT = '80'
const API_PORT = '3000'
const PRODUCTION_URL = '5.135.240.8'
const HOSTNAME = "nant-it.fr"
const outputFolder = 'dist'

//DO NOT TOUCH
const webpack = require('webpack')
const path = require('path')

const URL = process.env.NODE_ENV === 'production' ? HOSTNAME : LOCAL_URL
const PORT = process.env.NODE_ENV === 'production' ? PRODUCTION_PORT : LOCAL_PORT
const API_URL = process.env.NODE_ENV === 'production' ? 'http://' + HOSTNAME + ':' + API_PORT : 'http://' + URL + ':' + API_PORT
console.log('Deploying Web server to ' + URL + ':' + PORT)

const publicPath = process.env.NODE_ENV === 'production' ? '/' : '/'

module.exports = {
    entry: "./app",
    output: {
        path: path.resolve(__dirname, outputFolder),
        filename: "bundle.js",
        publicPath: publicPath
    },

    devServer: {
        contentBase: path.join(__dirname, outputFolder),
        compress: true,
        disableHostCheck: true,
        public: HOSTNAME,
        host: URL,
        port: PORT,
        historyApiFallback: true
    },

    devtool: 'cheap-module-eval-source-map',

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

    plugins: [
        new webpack.DefinePlugin({
            'API_URL': JSON.stringify(
                API_URL)
        })
    ]
}
