// chrome.runtime.onMessage.addListener((req, s, proceed) => {
//     console.log('background::', req)

//     switch (req._type) {
//         case 'CRAW_DATA': () => {

//         }
//             break
//         default: proceed()
//             break
//     }
//     return true
// })

export default {
    call: (payload, proceed) => {
        chrome.runtime.sendMessage(payload, r => !r ? proceed() : proceed(r.e, r.r))
    }
}