/*******************************************************************************
 * 
 * * Ghi đè orgin mặc định của ext, thành origin của domain được call
 * 
 * => fix lỗi call api bị chặn do khác origin
 * 
 ******************************************************************************/

import async from 'async'

const GET_ORIGIN_FROM_URL = raw_url => {
    try {
        const URL_PARSER = new URL(raw_url)
        return URL_PARSER.protocol +
            '//' +
            URL_PARSER.hostname +
            (URL_PARSER.port ? ':' + URL_PARSER.port : '')
    } catch (e) {
        return ''
    }
}
const GET_CHROME_VERSION = () => {
    return (/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]
}
const DO_REWRITE = info => {
    if (info.initiator !== 'chrome-extension://' + chrome.runtime.id) return

    var originSet = null
    var refererSet = null

    for (var index = 0; index < info.requestHeaders.length; index++) {
        if (info.requestHeaders[index].name.toLowerCase() === 'origin') {
            info.requestHeaders[index].value = GET_ORIGIN_FROM_URL(info.url)
            originSet = true
        }
        if (info.requestHeaders[index].name.toLowerCase() === 'referer') {
            info.requestHeaders[index].value = GET_ORIGIN_FROM_URL(info.url) + '/'
            refererSet = true
        }
    }

    if (!originSet) {
        info.requestHeaders.push({
            name: 'Origin',
            value: GET_ORIGIN_FROM_URL(info.url),
        })
    }

    if (!refererSet) {
        info.requestHeaders.push({
            name: 'Referer',
            value: GET_ORIGIN_FROM_URL(info.url) + '/',
        })
    }

    return { requestHeaders: info.requestHeaders }
}
const REWRITE_ORIGIN = list_urls => {
    const DATA = {}
    async.waterfall([
        cb => { // * calc opt_extraInfoSpec
            DATA.opt_extraInfoSpec = ['blocking', 'requestHeaders']

            if (GET_CHROME_VERSION() >= 72)
                DATA.opt_extraInfoSpec.push('extraHeaders')

            cb()
        },
        cb => { // * rewrite
            chrome.webRequest.onBeforeSendHeaders.addListener(
                DO_REWRITE,
                { urls: list_urls },
                DATA.opt_extraInfoSpec
            )

            cb()
        }
    ], e => { })
}

export default REWRITE_ORIGIN