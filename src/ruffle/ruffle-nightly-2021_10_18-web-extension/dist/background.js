(() => {
    "use strict";
    const e = { ruffleEnable: !0, ignoreOptout: !1, warnOnUnsupportedContent: !0, logLevel: "error" };
    let r, n, t, o, s;

    function a(e) {
        return new Promise(((r, n) => {
            e((e => {
                const t = chrome.runtime.lastError;
                t ? n(t) : r(e)
            }))
        }))
    }

    function c(e) {
        return {
            get: r => a((n => e.get(r || null, n))),
            remove: r => a((n => e.remove(r, n))),
            set: r => a((n => e.set(r, n)))
        }
    }
    if ("undefined" != typeof chrome) r = chrome.i18n, n = { local: c(chrome.storage.local), sync: c(chrome.storage.sync), onChanged: { addListener: e => chrome.storage.onChanged.addListener(e) } }, t = { reload: e => a((r => chrome.tabs.reload(e, void 0, r))), query: e => a((r => chrome.tabs.query(e, r))), sendMessage: (e, r, n) => a((t => chrome.tabs.sendMessage(e, r, n || {}, t))) }, o = chrome.runtime, s = () => a((e => chrome.tabs.create({ url: "/options.html" }, e)));
    else {
        if ("undefined" == typeof browser) throw new Error("Extension API not found.");
        r = browser.i18n, n = browser.storage, t = browser.tabs, o = browser.runtime, s = () => browser.runtime.openOptionsPage()
    }

    function i(e) { if (function(e) { const r = e.responseHeaders.find((({ name: e }) => "content-type" === e.toLowerCase())); if (!r) return !1; const n = r.value.toLowerCase().match(/^\s*(.*?)\s*(?:;.*)?$/)[1]; if ("application/octet-stream" === n) { const r = new URL(e.url); return ".swf" === r.pathname.substring(r.pathname.lastIndexOf(".")).toLowerCase() } return "application/x-shockwave-flash" === n }(e)) return { redirectUrl: `${o.getURL("player.html")}?url=${e.url}` } }

    function u() {
        (chrome || browser).webRequest.onHeadersReceived.addListener(i, { urls: ["<all_urls>"], types: ["main_frame"] }, ["blocking", "responseHeaders"])
    }(async() => {
        const { ruffleEnable: r } = await async function() { const r = await n.sync.get(); return Object.assign(Object.assign({}, e), r) }();
        r && u(), n.onChanged.addListener(((e, r) => { "sync" === r && "ruffleEnable" in e && (e.ruffleEnable.newValue ? u() : (chrome || browser).webRequest.onHeadersReceived.removeListener(i)) }))
    })()
})();