(() => {
    "use strict";
    const e = { ruffleEnable: !0, ignoreOptout: !1, warnOnUnsupportedContent: !0, logLevel: "error" };
    let t, n, a, s, o;

    function i(e) {
        return new Promise(((t, n) => {
            e((e => {
                const a = chrome.runtime.lastError;
                a ? n(a) : t(e)
            }))
        }))
    }

    function r(e) { return { get: t => i((n => e.get(t || null, n))), remove: t => i((n => e.remove(t, n))), set: t => i((n => e.set(t, n))) } }
    if ("undefined" != typeof chrome) t = chrome.i18n, n = { local: r(chrome.storage.local), sync: r(chrome.storage.sync), onChanged: { addListener: e => chrome.storage.onChanged.addListener(e) } }, a = { reload: e => i((t => chrome.tabs.reload(e, void 0, t))), query: e => i((t => chrome.tabs.query(e, t))), sendMessage: (e, t, n) => i((a => chrome.tabs.sendMessage(e, t, n || {}, a))) }, s = chrome.runtime, o = () => i((e => chrome.tabs.create({ url: "/options.html" }, e)));
    else {
        if ("undefined" == typeof browser) throw new Error("Extension API not found.");
        t = browser.i18n, n = browser.storage, a = browser.tabs, s = browser.runtime, o = () => browser.runtime.openOptionsPage()
    }
    const l = [],
        u = Math.floor(1e11 * Math.random());

    function c(e) {
        const t = { to: `ruffle_page${u}`, index: l.length, data: e };
        return window.postMessage(t, "*"),
            new Promise(((e, t) => { l.push({ resolve: e, reject: t }) }))
    }(async() => {
        const t = await async function() { const t = await n.sync.get(); return Object.assign(Object.assign({}, e), t) }(),
            a = function() {
                if (document.documentElement.hasAttribute("data-ruffle-optout")) return !0;
                try { if (window.top && window.top.document && window.top.document.documentElement && window.top.document.documentElement.hasAttribute("data-ruffle-optout")) return !0 } catch (e) {
                    const t = e instanceof Error ? e.message : String(e);
                    console.warn(`Unable to check top-level optout: ${t}`)
                }
                return !1
            }(),
            o = !("FOO" !== document.createElement("foo").tagName) && t.ruffleEnable && !window.RufflePlayer && (t.ignoreOptout || !a);
        s.onMessage.addListener(((e, n, s) => o ? (c(e).then((e => { s({ loaded: !0, tabOptions: t, optout: a, data: e }) })), !0) : (s({ loaded: !1, tabOptions: t, optout: a }), !1))), o && (function(e) {
                const t = document.createElement("script");
                console.log('const t = document.createElement("script");')
                t.textContent = '(function(){class RuffleMimeType{constructor(a,b,c){this.type=a,this.description=b,this.suffixes=c}}class RuffleMimeTypeArray{constructor(a){this.__mimetypes=[],this.__named_mimetypes={};for(let b of a)this.install(b)}install(a){let b=this.__mimetypes.length;this.__mimetypes.push(a),this.__named_mimetypes[a.type]=a,this[a.type]=a,this[b]=a}item(a){return this.__mimetypes[a]}namedItem(a){return this.__named_mimetypes[a]}get length(){return this.__mimetypes.length}}class RufflePlugin extends RuffleMimeTypeArray{constructor(a,b,c,d){super(d),this.name=a,this.description=b,this.filename=c}install(a){a.enabledPlugin||(a.enabledPlugin=this),super.install(a)}}class RufflePluginArray{constructor(a){this.__plugins=[],this.__named_plugins={};for(let b of a)this.install(b)}install(a){let b=this.__plugins.length;this.__plugins.push(a),this.__named_plugins[a.name]=a,this[a.name]=a,this[b]=a}item(a){return this.__plugins[a]}namedItem(a){return this.__named_plugins[a]}get length(){return this.__plugins.length}}const FLASH_PLUGIN=new RufflePlugin("Shockwave Flash","Shockwave Flash 32.0 r0","ruffle.js",[new RuffleMimeType("application/futuresplash","Shockwave Flash","spl"),new RuffleMimeType("application/x-shockwave-flash","Shockwave Flash","swf"),new RuffleMimeType("application/x-shockwave-flash2-preview","Shockwave Flash","swf"),new RuffleMimeType("application/vnd.adobe.flash-movie","Shockwave Flash","swf")]);function install_plugin(a){navigator.plugins.install||Object.defineProperty(navigator,"plugins",{value:new RufflePluginArray(navigator.plugins),writable:!1}),navigator.plugins.install(a),0<a.length&&!navigator.mimeTypes.install&&Object.defineProperty(navigator,"mimeTypes",{value:new RuffleMimeTypeArray(navigator.mimeTypes),writable:!1});for(var b=0;b<a.length;b+=1)navigator.mimeTypes.install(a[b])}install_plugin(FLASH_PLUGIN);})();', (document.head || document.documentElement).append(t)
            }(), await
            function(e) {
                const t = document.createElement("script"),
                    n = new Promise(((e, n) => { t.addEventListener("load", (() => e())), t.addEventListener("error", (e => n(e))) }));
                return t.src = e, (document.head || document.documentElement).append(t), n
            }(s.getURL(`dist/ruffle.js?id=${u}`)), window.addEventListener("message", (e => {
                if (e.source !== window) return;
                const { to: t, index: n, data: a } = e.data;
                if (t === `ruffle_content${u}`) {
                    const e = l[n];
                    e ? (l[n] = null, e.resolve(a)) : console.warn("No pending request.")
                }
            })), await c({ type: "load", config: { warnOnUnsupportedContent: t.warnOnUnsupportedContent, logLevel: t.logLevel } }))
    })()
})();