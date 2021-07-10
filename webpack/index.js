/**
 * * Main config webpack
 * 
 * - delete dist
 * - copy manifest.json
 * - copy assets
 */

const path = require('path')
const copy_webpack_plugin = require('copy-webpack-plugin')
const clean_webpack_plugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const terser_webpack_plugin = require("terser-webpack-plugin")

const IS_DEV = process.env.NODE_ENV !== 'production'

// get some parameter from package.json, and paste to manifest.json
const PACKAGE = require('../package.json')
const MANIFEST = require('../src/manifest.js')
MANIFEST.name = PACKAGE.name
MANIFEST.description = PACKAGE.description
MANIFEST.version = PACKAGE.version

module.exports = {
    mode: process.env.NODE_ENV,
    devtool: 'cheap-module-source-map',
    name: 'index',
    entry: './index.js',
    output : {
        filename : 'index.js',
        path : path.resolve(__dirname, '../dist')
    },
    plugins: [
        new copy_webpack_plugin({
            patterns: [
                {
                    from: './src/manifest.js',
                    to: 'manifest.json',
                    transform: () => Buffer.from(JSON.stringify(MANIFEST, null, 2)),
                },
                {
                    from: './src/assets',
                    to: 'assets',
                },
            ]
        }),
        new clean_webpack_plugin()
    ],
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