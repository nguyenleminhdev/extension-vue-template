module.exports = {
    "manifest_version": 2,
    "icons": {
        "16": "assets/img/16.png",
        "48": "assets/img/48.png",
        "128": "assets/img/128.png"
    },
    "browser_action": {
        "default_icon": "assets/img/48.png",
        "default_popup": "popup/index.html"
    },
    "options_page": "options/index.html",
    "background": {
        "scripts": [
            "background/index.js"
        ],
        "persistent": true
    },
    "content_scripts": [
        {
            "matches": [
                "http://*/*",
                "https://*/*"
            ],
            "js": [
                "content-scripts/index.js"
            ]
        }
    ],
    "content_security_policy": "script-src 'self' 'unsafe-eval'; object-src 'self'",
    "permissions": [
        "activeTab",
        "alarms",
        "background",
        "bookmarks",
        "browsingData",
        "clipboardRead",
        "clipboardWrite",
        "contentSettings",
        "contextMenus",
        "cookies",
        "debugger",
        "declarativeContent",
        "declarativeNetRequest",
        "declarativeNetRequestFeedback",
        "desktopCapture",
        "downloads",
        "fontSettings",
        "gcm",
        "geolocation",
        "history",
        "identity",
        "idle",
        "management",
        "nativeMessaging",
        "notifications",
        "pageCapture",
        "power",
        "printerProvider",
        "privacy",
        "proxy",
        "search",
        "sessions",
        "storage",
        "tabCapture",
        "tabs",
        "topSites",
        "tts",
        "ttsEngine",
        "unlimitedStorage",
        "webNavigation",
        "webRequest",
        "system.cpu",
        "system.display",
        "system.memory",
        "system.storage",
        "<all_urls>",
        "https://*/",
        "webRequestBlocking"
    ]
}