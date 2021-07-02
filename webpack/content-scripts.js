/**
 * * Content script config webpack
 * 
 * - group source code to one file
 * - obfuscator source after build
 */

const { resolve } = require('path')
const webpack_obfuscator = require('webpack-obfuscator')

module.exports = {
    mode: 'production',
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
    plugins: [
        new webpack_obfuscator({ rotateStringArray: true }, []),
    ],
}
