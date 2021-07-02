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

// get some parameter from package.json, and paste to manifest.json
const PACKAGE = require('../package.json')
const MANIFEST = require('../src/manifest.json')
MANIFEST.name = PACKAGE.name
MANIFEST.description = PACKAGE.description
MANIFEST.version = PACKAGE.version

module.exports = {
    mode: 'production',
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
                    from: './src/manifest.json',
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
}