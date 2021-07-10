/**
 * * Content script config webpack
 * 
 * - group source code to one file
 * - obfuscator source after build
 */

const { resolve } = require('path')
const webpack_obfuscator = require('webpack-obfuscator')
const terser_webpack_plugin = require("terser-webpack-plugin")

const IS_DEV = process.env.NODE_ENV !== 'production'

let plugins = []

if (!IS_DEV) plugins.push(new webpack_obfuscator({ rotateStringArray: true }, []))

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: 'cheap-module-source-map',
    name: 'content-scripts',
    entry: ['./src/content-scripts/index.js'],
    output: {
        filename: 'content-scripts/index.js',
        path: resolve(__dirname, '../dist'),
    },
    resolve: {
        extensions: ['.js'],
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
            }
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
