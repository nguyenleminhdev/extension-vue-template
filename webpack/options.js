/**
 * * Options page config webpack 
 * 
 * - Build .vue file
 * - Build js
 * - Build scss
 * - Minify css after build
 * - Minify html
 * - Obfuscator js after build
 */

const { resolve } = require('path')
const html_webpack_plugin = require('html-webpack-plugin')
const mini_css_extract_plugin = require('mini-css-extract-plugin')
const vue_loader_plugin = require('vue-loader/lib/plugin')
const webpack_obfuscator = require('webpack-obfuscator')
const terser_webpack_plugin = require("terser-webpack-plugin")

const IS_DEV = process.env.NODE_ENV !== 'production'

let plugins = [
    new vue_loader_plugin(),
    new mini_css_extract_plugin({
        filename: IS_DEV ? 'css/[name].css' : 'css/[name].[hash].css',
        chunkFilename: IS_DEV ? 'css/[id].css' : 'css/[id].[hash].css',
        ignoreOrder: false,
    }),
    new html_webpack_plugin({
        template: resolve(__dirname, '../src/options/index.html'),
        filename: 'index.html',
    }),
]

if (!IS_DEV) plugins.push(new webpack_obfuscator({ rotateStringArray: true }, []))

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: 'cheap-module-source-map',
    name: 'options',
    entry: ['./src/options/main.js'],
    output: {
        filename: 'js/index.js',
        path: resolve(__dirname, '../dist/options'),
    },
    resolve: {
        extensions: ['.js', '.vue', '.scss', '.css'],
        alias: {
            '@': resolve(__dirname, '../src'),
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        scss: 'vue-style-loader!css-loader!sass-loader',
                        sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax',
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    { loader: mini_css_extract_plugin.loader },
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader',
            },
            {
                test: /\.(png|jpg|svg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]',
                },
            },
        ],
    },
    plugins,
    optimization: {
        minimize: true,
        minimizer: [
            new terser_webpack_plugin({
                terserOptions: {
                    compress: {
                        drop_console: !IS_DEV
                    }
                }
            })
        ],
    },
}