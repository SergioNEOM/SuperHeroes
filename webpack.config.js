const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const isProd = process.env.NODE_ENV === 'production';
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
    mode: isProd ?
        'production' : 'development',

    entry: {
        style: resolve('scss/style.scss'),
        index: resolve('index.pug')
    },

    output: {
        path: resolve('dist'),
        filename: '[name].js'
    },

    module: {
        rules: [{
                test: /\.css$/,
                use: [
                    'css-loader',
                    'postcss-loader'
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    prefix: 'font/'
                }
            },
            {
                test: /\.(ttf|eot|otf)$/,
                loader: 'file-loader',
                options: {
                    prefix: 'font/'
                }
            }
        ]
    },

    devServer: {
        inline: true,
        hot: true,
        noInfo: true,
        overlay: true,
        open: true,
        publicPath: '/'
    },

    plugins: [
        new HtmlWebpackPlugin({
            template: './index.pug'
        })
    ]
};