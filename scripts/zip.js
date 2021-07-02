/**
 * * Release extension
 * 
 * Compiler project with webpack
 * Zip dist folder
 */

const { argv } = require('yargs')
const fs = require('fs')
const archiver = require('archiver')
const webpack = require('webpack')
const async = require('async')
const _ = require('lodash')

const WEBPACK_CONFIG = require('../webpack.config.js')
const FILENAME = _.get(argv, '[0]', 'dist.zip')

async.waterfall([
    cb => { // * webpack compiler
        webpack(WEBPACK_CONFIG).run((e, r) => {
            if (e) return cb(e)
            if (r && r.hasErrors()) return cb('WEBPACK_COMPILER_FAIL')

            const STDOUT = r.toString({ colors: true, modules: false, entrypoints: false })

            process.stdout.write(`${STDOUT}\n\n`)
            process.stdout.write('Done webpack compiler\n')

            cb()
        })
    },
    cb => { // * zip folder
        const ARCHIVE = archiver('zip', { zlib: { level: 9 } })
        const OUTPUT = fs.createWriteStream(`./${FILENAME}`)

        ARCHIVE.pipe(OUTPUT)
        ARCHIVE.directory('dist/', false)
        ARCHIVE.finalize()

        ARCHIVE.on('error', e => cb(e))
        OUTPUT.on('close', () => {
            process.stdout.write(`Done zip ${OUTPUT.path} ${ARCHIVE.pointer()}\n`)

            cb()
        })
    }
], e => {
    if (e) console.error('Build zip error::', e)
    else console.log('Done build zip')
})