/**
 * * Background config webpack
 * 
 * - group source code to one file
 * - obfuscator source after build
 */

const { resolve } = require('path')
const webpack_obfuscator = require('webpack-obfuscator')

module.exports = {
    mode: 'production',
    name: 'background',
    entry: ['./src/background/index.js'],
    output: {
        filename: 'background/index.js',
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
