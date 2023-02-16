/* eslint-disable */
const path = require('path');
const dotenv = require('dotenv');
const DefinePlugin = require('webpack');

module.exports = {
    entry: ['babel-polyfill', './index.ts'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/dist/',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(dotenv.config().parsed),
        }),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.json'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            configFile: './babel.config.js',
                            cacheDirectory: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'url-loader',
            },
        ],
    },
    mode: 'development',
    devServer: {
        static: path.join(__dirname, ''),
        port: 8000,
    },
    devtool: 'source-map',
};
