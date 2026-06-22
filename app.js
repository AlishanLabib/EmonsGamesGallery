/* =========================================================
   Emon's Games Gallery — Shared application runtime
   Runs on every page. Depends on data.js (loaded first).
   - Theme manager (dark / light / system)
   - Injects shared header, footer, modals
   - Game cards, cart (localStorage), search, sorting
   - Page dispatch via <body data-page="...">
   ========================================================= */
(function () {
    "use strict";

    /* ---------------- tiny helpers ---------------- */
    function $(s, r) { return (r || document).querySelector(s); }
    function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
    function icons() { if (window.lucide && lucide.createIcons) { try { lucide.createIcons(); } catch (e) {} } }
    function qp(name) {
        try { return new URLSearchParams(window.location.search).get(name); } catch (e) { return null; }
    }
    function safeStr(str) {
        if (!str && str !== 0) return "";
        return String(str).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/'/g, "&#39;").replace(/"/g, "&quot;");
    }
    function priceNum(p) { var n = parseInt(p, 10); return isNaN(n) ? 0 : n; }
    function currentPage() { return (document.body && document.body.getAttribute("data-page")) || "home"; }

    /* =========================================================
       THEME MANAGER  (dark default, + light + system)
       ========================================================= */
    var THEME_KEY = "gg_theme";
    function systemDark() { try { return window.matchMedia("(prefers-color-scheme: dark)").matches; } catch (e) { return true; } }
    function getThemePref() { try { return localStorage.getItem(THEME_KEY) || "dark"; } catch (e) { return "dark"; } }
    function resolved(pref) { return pref === "system" ? (systemDark() ? "dark" : "light") : pref; }
    function applyTheme(pref) {
        var t = resolved(pref);
        var html = document.documentElement;
        html.classList.toggle("light", t === "light");
        html.classList.toggle("dark", t === "dark");
        updateThemeUI(pref);
    }
    function setThemePref(pref) { try { localStorage.setItem(THEME_KEY, pref); } catch (e) {} applyTheme(pref); }
    function cycleTheme() {
        var order = ["dark", "light", "system"];
        var i = order.indexOf(getThemePref());
        setThemePref(order[(i + 1) % order.length]);
    }
    function themeIcon(pref) { return pref === "light" ? "sun" : pref === "system" ? "monitor" : "moon"; }
    function themeLabel(pref) { return pref === "light" ? "Light" : pref === "system" ? "System" : "Dark"; }
    function updateThemeUI(pref) {
        $all("[data-theme-icon]").forEach(function (el) { el.setAttribute("data-lucide", themeIcon(pref)); });
        $all("[data-theme-label]").forEach(function (el) { el.textContent = themeLabel(pref); });
        icons();
    }
    function watchSystem() {
        try {
            var mq = window.matchMedia("(prefers-color-scheme: dark)");
            var handler = function () { if (getThemePref() === "system") applyTheme("system"); };
            if (mq.addEventListener) mq.addEventListener("change", handler);
            else if (mq.addListener) mq.addListener(handler);
        } catch (e) {}
    }

    /* =========================================================
       SHARED CHROME — header / footer / modals (one source)
       ========================================================= */
    var LOGO = "https://images2.imgbox.com/5b/09/BSHH2B04_o.jpg";

    function navLinksHTML(mobile) {
        var page = currentPage();
        return navItems.map(function (item) {
            var href = (CATEGORIES[item.id === "home" ? "global" : item.id] || {}).page || "index.html";
            if (item.id === "home") href = "index.html";
            var active = (page === item.id) || (page === "home" && item.id === "home");
            if (mobile) {
                return '<a href="' + href + '" class="flex items-center gap-3 w-full p-4 rounded-xl font-bold transition-all ' +
                    (active ? "bg-gradient-to-r from-purple-600/20 to-transparent text-purple-400 border-l-4 border-purple-500" : "text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-base") +
                    '"><i data-lucide="' + item.icon + '" class="w-5 h-5"></i> ' + item.label + "</a>";
            }
            return '<a href="' + href + '" class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ' +
                (active ? "bg-purple-500/10 text-purple-400" : "text-muted hover:text-base hover:bg-black/5 dark:hover:bg-white/5") +
                '"><i data-lucide="' + item.icon + '" class="w-4 h-4"></i> ' + item.label + "</a>";
        }).join("");
    }

    function headerHTML() {
        var pref = getThemePref();
        return '' +
        '<nav class="fixed top-0 w-full z-50 glass-nav transition-all duration-300">' +
          '<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">' +
            '<div class="flex items-center justify-between h-20 gap-4">' +
              '<a href="index.html" class="flex items-center gap-3 cursor-pointer group shrink-0">' +
                '<img src="' + LOGO + '" alt="Logo" class="w-10 h-10 md:w-12 md:h-12 rounded-xl group-hover:scale-110 transition-transform object-cover shadow-lg border border-white/10" />' +
                '<span class="font-extrabold text-lg md:text-xl tracking-tight hidden sm:block text-base">Emon\'s <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Games Gallery</span></span>' +
              '</a>' +
              '<form action="search.html" method="get" class="flex-1 max-w-md relative hidden sm:block">' +
                '<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i data-lucide="search" class="h-4 w-4 text-muted"></i></div>' +
                '<input type="text" name="q" id="desktop-search" placeholder="Search games..." autocomplete="off" class="w-full surface-2 border-base rounded-full py-2 pl-10 pr-4 text-sm text-base focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-subtle" />' +
              '</form>' +
              '<div class="hidden lg:flex items-center space-x-1 shrink-0">' + navLinksHTML(false) + '</div>' +
              '<div class="flex items-center gap-1 sm:gap-3 shrink-0">' +
                '<button onclick="GG.cycleTheme()" class="p-2 text-muted hover:text-base transition-colors" title="Toggle theme"><i data-lucide="' + themeIcon(pref) + '" data-theme-icon class="w-6 h-6"></i></button>' +
                '<button onclick="GG.openAuthModal()" class="p-2 text-muted hover:text-base transition-colors" title="Account"><span id="auth-icon-desktop"><i data-lucide="log-in" class="w-6 h-6"></i></span></button>' +
                '<button onclick="GG.toggleCart()" class="relative p-2 text-muted hover:text-base transition-colors"><i data-lucide="shopping-cart" class="w-6 h-6"></i><span id="cart-count-badge" class="hidden absolute top-0 right-0 bg-purple-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-[var(--bg)]">0</span></button>' +
                '<div class="lg:hidden"><button onclick="GG.toggleMobileMenu()" class="text-muted hover:text-base p-2"><i id="mobile-menu-icon" data-lucide="menu" class="w-7 h-7"></i></button></div>' +
              '</div>' +
            '</div>' +
          '</div>' +
          '<div id="mobile-dropdown" class="hidden lg:hidden absolute top-20 left-0 w-full surface border-b border-base shadow-2xl px-4 py-4 space-y-4">' +
            '<form action="search.html" method="get" class="relative">' +
              '<div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><i data-lucide="search" class="h-4 w-4 text-muted"></i></div>' +
              '<input type="text" name="q" id="mobile-search" placeholder="Search games..." autocomplete="off" class="w-full surface-2 border-base rounded-xl py-3 pl-10 pr-4 text-sm text-base focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-subtle" />' +
            '</form>' +
            '<div class="space-y-2">' + navLinksHTML(true) + '</div>' +
            '<div class="border-t border-base pt-2 mt-2">' +
              '<button onclick="GG.cycleTheme()" class="flex items-center gap-3 w-full p-4 rounded-xl font-bold transition-all text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-base"><i data-lucide="' + themeIcon(pref) + '" data-theme-icon class="w-5 h-5"></i> Theme: <span data-theme-label>' + themeLabel(pref) + '</span></button>' +
              '<button onclick="GG.openAuthModal(); GG.toggleMobileMenu();" class="flex items-center gap-3 w-full p-4 rounded-xl font-bold transition-all text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-base"><span id="auth-icon-mobile"><i data-lucide="log-in" class="w-5 h-5"></i></span> <span id="auth-text-mobile">Sign In / Register</span></button>' +
            '</div>' +
          '</div>' +
        '</nav>';
    }

    function footerHTML() {
        var links = navItems.map(function (item) {
            var href = item.id === "home" ? "index.html" : (CATEGORIES[item.id] || {}).page || "index.html";
            return '<a href="' + href + '" class="text-muted hover:text-purple-400 transition-colors text-sm flex items-center gap-2 group justify-center lg:justify-start"><i data-lucide="chevron-right" class="w-3 h-3 group-hover:translate-x-1 transition-transform"></i> ' + item.label + "</a>";
        }).join("");
        return '' +
        '<footer class="bg-gradient-to-b from-[#060610] to-[#020204] pt-20 pb-0 mt-12 relative overflow-hidden border-t border-white/5 text-white">' +
          '<div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(168,85,247,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.5) 1px, transparent 1px); background-size: 40px 40px;"></div>' +
          '<div class="absolute top-0 left-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>' +
          '<div class="absolute bottom-0 right-1/4 w-80 h-80 bg-cyan-600/5 rounded-full blur-3xl pointer-events-none"></div>' +
          '<div class="max-w-7xl mx-auto px-4 relative z-10">' +
            '<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 items-start text-center lg:text-left mb-16">' +
              '<div class="flex flex-col items-center lg:items-start space-y-4">' +
                '<div class="flex items-center gap-3 mb-2"><img src="' + LOGO + '" alt="Logo" class="w-10 h-10 rounded-xl border border-white/10 object-cover" /><h3 class="text-lg font-extrabold text-white">Emon\'s <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Games Gallery</span></h3></div>' +
                '<p class="text-slate-400 leading-relaxed text-sm">Your trusted source for premium gaming in Bangladesh. Lifetime online &amp; offline activations, global product keys, and game top-ups at unbeatable prices.</p>' +
                '<div class="flex gap-3 mt-2">' +
                  '<a href="https://www.facebook.com/messages/t/222258134976104" target="_blank" rel="noopener" class="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg></a>' +
                  '<a href="https://wa.me/8801679386441" target="_blank" rel="noopener" class="w-9 h-9 rounded-lg bg-green-600/20 border border-green-500/30 flex items-center justify-center text-green-400 hover:bg-green-600 hover:text-white transition-all"><svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.12.551 4.192 1.6 6.017L.182 24l6.096-1.554A11.968 11.968 0 0012.031 24c6.645 0 12.03-5.388 12.03-12.035C24.06 5.388 18.676 0 12.031 0z"/></svg></a>' +
                  '<a href="mailto:zonge941@gmail.com" class="w-9 h-9 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-400 hover:bg-red-600 hover:text-white transition-all"><svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,12 2,6"/></svg></a>' +
                '</div>' +
              '</div>' +
              '<div class="flex flex-col items-center lg:items-start space-y-3"><h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><i data-lucide="link" class="w-4 h-4 text-purple-400"></i> Quick Links</h3>' + links +
                '<button onclick="GG.openTerms()" class="text-muted hover:text-cyan-400 transition-colors text-sm flex items-center gap-2 group mt-1"><i data-lucide="chevron-right" class="w-3 h-3 group-hover:translate-x-1 transition-transform"></i> Terms &amp; Conditions</button>' +
              '</div>' +
              '<div class="flex flex-col items-center lg:items-start space-y-4"><h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><i data-lucide="phone" class="w-4 h-4 text-cyan-400"></i> Contact Us</h3>' +
                '<a href="mailto:zonge941@gmail.com" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"><div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors"><i data-lucide="mail" class="w-4 h-4"></i></div><span class="text-sm">zonge941@gmail.com</span></a>' +
                '<a href="tel:01679386441" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"><div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-purple-500/20 transition-colors"><i data-lucide="phone" class="w-4 h-4"></i></div><span class="text-sm">01679386441</span></a>' +
                '<a href="https://wa.me/8801679386441" target="_blank" rel="noopener" class="flex items-center gap-3 text-slate-400 hover:text-white transition-colors group"><div class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-green-500/20 transition-colors"><i data-lucide="smartphone" class="w-4 h-4"></i></div><span class="text-sm">WhatsApp</span></a>' +
              '</div>' +
              '<div class="flex flex-col items-center justify-start space-y-4"><h3 class="text-lg font-bold text-white mb-2 flex items-center gap-2"><i data-lucide="users" class="w-4 h-4 text-yellow-400"></i> Our Community</h3>' +
                '<div class="w-48 h-32 mx-auto sunburst-bg flex items-center justify-center rounded-xl border-[4px] border-white shadow-[0_0_20px_rgba(250,204,21,0.4)] hover:rotate-3 transition-transform cursor-pointer"><span class="font-black text-2xl text-white drop-shadow-[0_4px_4px_rgba(0,0,0,0.9)] -rotate-6 tracking-tight leading-tight">We <br>Love <br>Gaming</span></div>' +
                '<a href="https://www.facebook.com/messages/t/222258134976104" target="_blank" rel="noopener" class="text-sm font-bold text-white underline decoration-2 decoration-cyan-400 underline-offset-4 hover:text-cyan-400 transition-colors">Join Facebook Page</a>' +
              '</div>' +
            '</div>' +
            '<div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">' +
              '<div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 text-center"><i data-lucide="shield-check" class="w-6 h-6 text-green-400"></i><span class="text-xs font-bold text-slate-300">100% Secure</span><span class="text-[10px] text-slate-500">Safe Transactions</span></div>' +
              '<div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 text-center"><i data-lucide="zap" class="w-6 h-6 text-yellow-400"></i><span class="text-xs font-bold text-slate-300">Instant Delivery</span><span class="text-[10px] text-slate-500">Within Minutes</span></div>' +
              '<div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 text-center"><i data-lucide="infinity" class="w-6 h-6 text-purple-400"></i><span class="text-xs font-bold text-slate-300">Lifetime Access</span><span class="text-[10px] text-slate-500">No Expiry</span></div>' +
              '<div class="flex flex-col items-center gap-2 p-4 rounded-xl bg-white/5 border border-white/5 text-center"><i data-lucide="headphones" class="w-6 h-6 text-cyan-400"></i><span class="text-xs font-bold text-slate-300">24/7 Support</span><span class="text-[10px] text-slate-500">Always Available</span></div>' +
            '</div>' +
            '<div class="footer-glow-line mb-6"></div>' +
            '<div class="py-6 flex flex-col md:flex-row items-center justify-between gap-4">' +
              '<p class="text-slate-600 text-sm">© 2026 Emon\'s Games Gallery. All rights reserved.</p>' +
              '<div class="flex items-center gap-4"><button onclick="GG.openTerms()" class="text-slate-500 hover:text-slate-300 text-xs transition-colors">Terms &amp; Conditions</button><span class="text-slate-700">|</span><button onclick="GG.openTerms()" class="text-slate-500 hover:text-slate-300 text-xs transition-colors">Privacy Policy</button><span class="text-slate-700">|</span><button onclick="GG.openTerms()" class="text-slate-500 hover:text-slate-300 text-xs transition-colors">Refund Policy</button></div>' +
              '<div class="dev-badge flex items-center gap-2 px-4 py-2 rounded-full"><i data-lucide="code-2" class="w-3.5 h-3.5 text-purple-400"></i><span class="text-xs text-slate-400">Website Developed by <strong class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">Alishan</strong></span></div>' +
            '</div>' +
          '</div>' +
        '</footer>';
    }

    function modalsHTML() {
        return '' +
        /* Floating contacts */
        '<div class="fixed bottom-6 left-6 z-[90] flex flex-col gap-4">' +
          '<a href="https://m.me/222258134976104" target="_blank" rel="noopener" class="w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-blue-400 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(37,99,235,0.5)] hover:scale-110 transition-all duration-300"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.654V24l4.088-2.242c1.092.3 2.246.464 3.443.464 6.627 0 12-4.975 12-11.111C24 4.974 18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26 6.554-6.963 3.13 3.26 5.882-3.26-6.548 6.963z"/></svg></a>' +
          '<a href="https://wa.me/8801679386441" target="_blank" rel="noopener" class="w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-500 to-green-400 flex items-center justify-center text-white shadow-[0_4px_20px_rgba(16,185,129,0.5)] hover:scale-110 transition-all duration-300"><svg class="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12.031 0C5.385 0 0 5.388 0 12.035c0 2.12.551 4.192 1.6 6.017L.182 24l6.096-1.554A11.968 11.968 0 0012.031 24c6.645 0 12.03-5.388 12.03-12.035C24.06 5.388 18.676 0 12.031 0zm7.1 17.208c-.305.86-1.745 1.597-2.42 1.67-.626.068-1.428.188-4.577-1.116-3.77-1.56-6.22-5.405-6.41-5.656-.188-.25-1.528-2.035-1.528-3.882 0-1.848.966-2.753 1.306-3.125.338-.372.738-.465.98-.465.244 0 .49.003.693.013.212.01.498-.083.782.597.288.683.978 2.38 1.066 2.555.088.175.147.378.026.611-.122.233-.186.378-.37.587-.184.208-.388.44-.551.626-.183.21-.378.435-.162.808.216.373.963 1.597 1.928 2.418 1.246 1.058 2.425 1.385 2.784 1.536.36.151.57.127.784-.06.213-.186.924-1.077 1.173-1.447.248-.372.498-.31.823-.187.326.124 2.05.966 2.404 1.15.353.186.589.278.675.433.086.155.086.897-.22 1.758z"/></svg></a>' +
        '</div>' +
        /* Cart full-page */
        '<div id="cart-fullpage" class="items-center justify-center p-4 md:p-8 text-white" style="background: rgba(5,5,5,0.97); backdrop-filter: blur(20px);">' +
          '<div id="cart-fullpage-inner" class="w-full max-w-4xl bg-[#0a0a0f] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.15)] flex flex-col overflow-hidden" style="max-height:92vh;">' +
            '<div class="flex items-center justify-between px-6 md:px-8 py-6 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-transparent shrink-0"><div class="flex items-center gap-3"><div class="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center"><i data-lucide="shopping-cart" class="w-5 h-5 text-purple-400"></i></div><div><h2 class="text-xl font-extrabold text-white">Your Cart</h2><p class="text-xs text-slate-500" id="cart-item-count-label">0 items</p></div></div><button onclick="GG.toggleCart()" class="w-10 h-10 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"><i data-lucide="x" class="w-5 h-5"></i></button></div>' +
            '<div class="flex flex-col md:flex-row flex-1 overflow-hidden">' +
              '<div id="cart-items" class="flex-1 overflow-y-auto p-6 space-y-4"></div>' +
              '<div id="cart-footer" class="hidden md:w-80 shrink-0 border-t md:border-t-0 md:border-l border-white/10 bg-[#050508] p-6 flex flex-col gap-6"><h3 class="text-lg font-bold text-white">Order Summary</h3><div class="space-y-3 text-sm"><div class="flex justify-between text-slate-400"><span>Subtotal</span><span id="cart-subtotal" class="text-white font-semibold">0 TK</span></div><div class="flex justify-between text-slate-400"><span>Delivery</span><span class="text-green-400 font-semibold">FREE</span></div><div class="h-px bg-white/10"></div><div class="flex justify-between text-base font-bold"><span class="text-white">Total</span><span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 text-xl font-black"><span id="cart-total">0</span> TK</span></div></div>' +
                '<div class="p-4 rounded-xl bg-white/5 border border-white/10"><p class="text-xs text-slate-400 font-bold mb-3 flex items-center gap-2"><i data-lucide="smartphone" class="w-4 h-4 text-cyan-400"></i> Accepted Digital Payments</p><div class="grid grid-cols-2 gap-2"><div class="flex items-center gap-2 px-2.5 py-2 bg-[#E2136E]/10 border border-[#E2136E]/30 rounded-lg"><span class="w-2 h-2 rounded-full bg-[#E2136E] animate-pulse"></span><span class="text-xs font-bold text-white">bKash</span></div><div class="flex items-center gap-2 px-2.5 py-2 bg-[#F7931E]/10 border border-[#F7931E]/30 rounded-lg"><span class="w-2 h-2 rounded-full bg-[#F7931E] animate-pulse"></span><span class="text-xs font-bold text-white">Nagad</span></div><div class="flex items-center gap-2 px-2.5 py-2 bg-[#8C1585]/10 border border-[#8C1585]/30 rounded-lg"><span class="w-2 h-2 rounded-full bg-[#8C1585] animate-pulse"></span><span class="text-xs font-bold text-white">Rocket</span></div><div class="flex items-center gap-2 px-2.5 py-2 bg-[#00529B]/10 border border-[#00529B]/30 rounded-lg"><span class="w-2 h-2 rounded-full bg-[#00529B] animate-pulse"></span><span class="text-xs font-bold text-white">Upay</span></div></div></div>' +
                '<button onclick="GG.handleCheckout(this)" class="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold text-base shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2 active:scale-95"><i data-lucide="message-circle" class="w-5 h-5"></i> Checkout via Messenger</button>' +
                '<button onclick="GG.toggleCart()" class="w-full py-3 rounded-xl border border-white/10 text-slate-400 hover:text-white font-semibold text-sm transition-all">Continue Shopping</button>' +
              '</div>' +
            '</div>' +
            '<div id="cart-footer-mobile" class="hidden md:hidden shrink-0 border-t border-white/10 bg-[#050508] p-4 flex flex-col gap-3"><div class="flex justify-between items-center px-1"><span class="text-slate-400 font-medium text-sm">Total:</span><span class="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"><span id="cart-total-mobile">0</span> TK</span></div><button onclick="GG.handleCheckout(this)" class="w-full py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"><i data-lucide="message-circle" class="w-5 h-5"></i> Checkout via Messenger</button></div>' +
          '</div>' +
        '</div>' +
        /* Terms modal */
        '<div id="terms-modal" class="items-center justify-center p-4 text-white"><div class="w-full max-w-2xl bg-[#0a0a0f] border border-white/10 rounded-2xl shadow-2xl flex flex-col overflow-hidden" style="max-height:85vh;"><div class="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-r from-cyan-900/20 to-transparent shrink-0"><div class="flex items-center gap-3"><i data-lucide="file-text" class="w-5 h-5 text-cyan-400"></i><h2 class="text-lg font-extrabold text-white">Terms &amp; Conditions</h2></div><button onclick="GG.closeTerms()" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"><i data-lucide="x" class="w-4 h-4"></i></button></div><div class="overflow-y-auto p-6 space-y-6 text-sm text-slate-300 leading-relaxed"><p class="text-slate-400 italic">By purchasing from Emon\'s Games Gallery, you agree to the following terms.</p><div><h3 class="text-white font-bold mb-2 flex items-center gap-2"><i data-lucide="check-circle" class="w-4 h-4 text-green-400"></i> 1. Product Delivery</h3><p>All digital products are delivered via Facebook Messenger or WhatsApp after payment confirmation, typically instant to within 24 hours.</p></div><div><h3 class="text-white font-bold mb-2 flex items-center gap-2"><i data-lucide="shield" class="w-4 h-4 text-purple-400"></i> 2. Lifetime Guarantee</h3><p>Applies to Global Product Keys. If a key becomes invalid due to an error on our part, we provide a free replacement.</p></div><div><h3 class="text-white font-bold mb-2 flex items-center gap-2"><i data-lucide="refresh-cw" class="w-4 h-4 text-yellow-400"></i> 3. Refund Policy</h3><p>Refunds are only available if a product is non-functional and we cannot provide a working replacement within 48 hours.</p></div><div><h3 class="text-white font-bold mb-2 flex items-center gap-2"><i data-lucide="lock" class="w-4 h-4 text-red-400"></i> 4. Privacy</h3><p>We collect only the information necessary to process your order and never sell or share your personal information.</p></div></div><div class="px-6 py-4 border-t border-white/10 shrink-0"><button onclick="GG.closeTerms()" class="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold transition-all">I Understand &amp; Accept</button></div></div></div>' +
        /* Auth modal */
        '<div id="auth-modal" class="items-center justify-center p-4 text-white"><div class="w-full max-w-md bg-[#0a0a0f] border border-white/10 rounded-3xl shadow-[0_0_80px_rgba(168,85,247,0.2)] flex flex-col overflow-hidden" style="max-height:90vh;"><div class="flex items-center justify-between px-6 py-5 border-b border-white/10 bg-gradient-to-r from-purple-900/20 to-transparent shrink-0"><h2 class="text-xl font-extrabold text-white flex items-center gap-2" id="auth-modal-title"><i data-lucide="user-circle" class="text-purple-400 w-6 h-6"></i> Sign In</h2><button onclick="GG.closeAuthModal()" class="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-500/20 flex items-center justify-center text-slate-400 hover:text-red-400 transition-all"><i data-lucide="x" class="w-4 h-4"></i></button></div><div class="p-6 md:p-8 overflow-y-auto"><div class="flex p-1 bg-white/5 rounded-xl mb-6 border border-white/10"><button onclick="GG.setAuthMode(\'signin\')" id="btn-signin-tab" class="flex-1 py-2 text-sm font-bold rounded-lg bg-purple-600 text-white shadow-lg transition-all">Sign In</button><button onclick="GG.setAuthMode(\'register\')" id="btn-register-tab" class="flex-1 py-2 text-sm font-bold rounded-lg text-slate-400 hover:text-white transition-all">Register</button></div><form id="auth-form" onsubmit="GG.handleAuthSubmit(event)" class="space-y-4"><div id="auth-name-field" class="hidden"><label class="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Full Name</label><input type="text" placeholder="John Doe" class="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" /></div><div><label class="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Email Address</label><input type="email" required placeholder="you@example.com" class="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" /></div><div><label class="block text-xs font-bold text-slate-400 mb-1 uppercase tracking-wider">Password</label><input type="password" required placeholder="••••••••" class="w-full bg-[#050505] border border-white/10 rounded-xl p-3 text-white focus:outline-none focus:border-purple-500 transition-colors" /></div><button type="submit" id="auth-submit-btn" class="w-full py-4 mt-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all flex items-center justify-center gap-2">Sign In</button></form></div></div></div>';
    }

    function injectChrome() {
        var h = $("#site-header"); if (h) h.innerHTML = headerHTML();
        var f = $("#site-footer"); if (f) f.innerHTML = footerHTML();
        var m = $("#site-modals"); if (m) m.innerHTML = modalsHTML();
    }

    /* =========================================================
       GAME CARDS
       ========================================================= */
    function discountFor(item) {
        var isOnOff = item.desc.indexOf("Online Activation") > -1 || item.desc.indexOf("Offline Activation") > -1;
        var isComing = String(item.price).toLowerCase() === "coming soon";
        if (!isOnOff || isComing) return null;
        var curr = priceNum(item.price);
        var orig = 2999;
        if (curr >= 1400) orig = 7999; else if (curr >= 700) orig = 5999; else if (curr >= 300) orig = 6999;
        else if (curr >= 250) orig = 5999; else if (curr >= 200) orig = 4999; else if (curr >= 150) orig = 3999;
        return { orig: orig, pct: Math.round(((orig - curr) / orig) * 100) };
    }

    function createGameCard(item) {
        var cat = item.catKey;
        var isComing = String(item.price).toLowerCase() === "coming soon";
        var d = discountFor(item);
        var popular = item.popular ? '<div class="absolute top-0 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-b-xl text-[10px] font-black shadow-[0_4px_15px_rgba(245,158,11,0.5)] z-20 uppercase tracking-widest border-b border-x border-orange-300/50 flex items-center gap-1"><i data-lucide="flame" class="w-3 h-3"></i> Popular</div>' : "";
        var disc = d ? '<div class="absolute top-3 left-3 bg-red-600 text-white px-2.5 py-1 rounded-lg text-xs font-black shadow-xl border border-red-500/50 z-20">-' + d.pct + "%</div>" : "";
        var origP = d ? '<div class="text-xs text-subtle line-through mb-0.5 font-medium">' + d.orig + " TK</div>" : "";
        var priceH = isComing
            ? '<span class="text-sm font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded border border-amber-400/20">Coming Soon</span>'
            : '<div class="text-right">' + origP + '<span class="text-2xl font-black text-base group-hover:text-cyan-400 transition-colors leading-none">' + safeStr(item.price) + "</span></div>";
        var genre = item.genre ? '<div class="mb-2"><span class="inline-block px-2 py-1 bg-purple-500/10 text-cyan-300 text-[10px] font-black uppercase tracking-widest rounded border border-purple-500/20">' + safeStr(item.genre) + "</span></div>" : "";
        var lifetime = item.desc.indexOf("Lifetime") > -1 ? '<p class="text-xs text-purple-400 font-bold mb-3">Lifetime Account Guarantee</p>' : "";
        var cartBtn = !isComing ? '<button onclick="GG.addToCart(\'' + cat + "'," + item.id + ')" class="w-14 md:w-16 flex items-center justify-center rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-400 hover:text-white border border-purple-500/30 hover:border-transparent transition-all duration-300 active:scale-95" title="Add to Cart"><i data-lucide="shopping-cart" class="w-5 h-5"></i></button>' : "";
        var btnText = isComing ? "Pre-order" : "View Details";
        var href = gameUrl(cat, item.id);

        return '<div class="gg-card surface border-base rounded-2xl overflow-hidden hover:border-purple-500/50 transition-all duration-300 group flex flex-col h-full relative animate-fade-up tilt-card">' +
            '<a href="' + href + '" class="block">' +
              '<div class="relative h-56 overflow-hidden">' + disc + popular +
                '<img src="' + item.img + '" loading="lazy" alt="' + safeStr(item.title) + '" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out opacity-90 group-hover:opacity-100"/>' +
                '<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80"></div>' +
                '<div class="absolute top-3 right-3 bg-black/80 px-3 py-1.5 rounded-full text-xs font-bold text-cyan-300 border border-cyan-500/30 flex items-center gap-1.5 shadow-lg z-10"><i data-lucide="badge-check" class="w-3 h-3"></i> ' + safeStr(item.desc.split(" • ")[0]) + "</div>" +
              "</div>" +
              '<div class="px-5 pt-5"><h3 class="text-xl font-extrabold text-base mb-1 line-clamp-1" title="' + safeStr(item.title) + '">' + safeStr(item.title) + "</h3>" + genre + lifetime + "</div>" +
            "</a>" +
            '<div class="px-5 pb-5 mt-auto pt-4"><div class="flex justify-between items-end mb-4"><span class="text-sm text-muted font-medium">Price</span>' + priceH + "</div>" +
              '<div class="flex gap-2"><a href="' + href + '" class="flex-1 py-3.5 rounded-xl bg-white/5 dark:bg-white/5 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 border-base hover:border-transparent text-base hover:text-white font-bold flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 text-sm"><i data-lucide="eye" class="w-4 h-4 hidden sm:block"></i>' + btnText + "</a>" + cartBtn + "</div></div>" +
          "</div>";
    }

    /* =========================================================
       GRID RENDER + SORTING + LOAD MORE
       ========================================================= */
    var visibleCounts = {};
    Object.keys(CATEGORIES).forEach(function (k) { visibleCounts[k] = ITEMS_PER_PAGE; });
    visibleCounts.search = ITEMS_PER_PAGE;

    function getSortedData(data, sortType) {
        var arr = data.slice();
        if (sortType === "price-asc") arr.sort(function (a, b) { var pa = isNaN(parseInt(a.price)) ? Infinity : parseInt(a.price); var pb = isNaN(parseInt(b.price)) ? Infinity : parseInt(b.price); return pa - pb; });
        else if (sortType === "price-desc") arr.sort(function (a, b) { var pa = isNaN(parseInt(a.price)) ? -Infinity : parseInt(a.price); var pb = isNaN(parseInt(b.price)) ? -Infinity : parseInt(b.price); return pb - pa; });
        else if (sortType === "name-asc") arr.sort(function (a, b) { return a.title.localeCompare(b.title); });
        else if (sortType === "name-desc") arr.sort(function (a, b) { return b.title.localeCompare(a.title); });
        return arr;
    }

    // tag a dataset's items with their catKey so cards can build detail links
    function tagged(catKey, data) { return data.map(function (g) { return Object.assign({}, g, { catKey: catKey }); }); }

    var searchResults = [];
    function dataFor(catKey) {
        if (catKey === "search") return searchResults;
        var c = CATEGORIES[catKey];
        return c ? tagged(catKey, c.data) : [];
    }

    function renderGrid(catKey, gridId) {
        var grid = document.getElementById(gridId);
        if (!grid) return;
        var sortSel = document.getElementById("sort-" + catKey);
        var sortType = sortSel ? sortSel.value : "default";
        var sorted = getSortedData(dataFor(catKey), sortType);
        var visible = visibleCounts[catKey] || ITEMS_PER_PAGE;
        grid.innerHTML = sorted.slice(0, visible).map(createGameCard).join("");
        var btn = document.getElementById(gridId + "-btn-container");
        if (btn) {
            if (visible < sorted.length) {
                btn.innerHTML = '<button onclick="GG.loadMore(\'' + catKey + "','" + gridId + '\')" class="px-8 py-3 rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 font-bold transition-all flex items-center justify-center gap-2 mx-auto">Load More Games <i data-lucide="chevron-down" class="w-4 h-4"></i></button>';
                btn.classList.remove("hidden");
            } else { btn.innerHTML = ""; btn.classList.add("hidden"); }
        }
        icons();
    }
    function handleSort(catKey, gridId) { visibleCounts[catKey] = ITEMS_PER_PAGE; renderGrid(catKey, gridId); }
    function loadMore(catKey, gridId) { visibleCounts[catKey] += ITEMS_PER_PAGE; renderGrid(catKey, gridId); }

    /* =========================================================
       CART (persisted in localStorage)
       ========================================================= */
    var CART_KEY = "gg_cart";
    var cart = [];
    try { cart = JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch (e) { cart = []; }
    function saveCart() { try { localStorage.setItem(CART_KEY, JSON.stringify(cart)); } catch (e) {} }
    function cartKey(catKey, id) { return catKey + ":" + id; }

    function addToCart(catKey, id) {
        var g = getGame(catKey, id);
        if (!g) return;
        var key = cartKey(catKey, id);
        var ex = cart.find(function (i) { return i.key === key; });
        if (ex) ex.qty += 1;
        else cart.push({ key: key, catKey: catKey, id: id, title: g.title, price: g.price, img: g.img, desc: g.desc, qty: 1 });
        saveCart();
        openCart();
        updateCartUI();
    }
    function changeQty(key, delta) {
        cart = cart.map(function (i) { if (i.key === key) { i.qty += delta; } return i; }).filter(function (i) { return i.qty > 0; });
        saveCart(); updateCartUI();
    }
    function removeItem(key) { cart = cart.filter(function (i) { return i.key !== key; }); saveCart(); updateCartUI(); }

    function openCart() { var el = $("#cart-fullpage"); if (el) { el.classList.add("open"); document.body.style.overflow = "hidden"; } }
    function toggleCart() {
        var el = $("#cart-fullpage"); if (!el) return;
        if (el.classList.contains("open")) { el.classList.remove("open"); document.body.style.overflow = ""; }
        else { el.classList.add("open"); document.body.style.overflow = "hidden"; updateCartUI(); }
    }

    function updateCartUI() {
        var count = cart.reduce(function (a, i) { return a + i.qty; }, 0);
        var total = cart.reduce(function (a, i) { return a + priceNum(i.price) * i.qty; }, 0);
        var badge = $("#cart-count-badge");
        if (badge) { if (count > 0) { badge.innerText = count; badge.classList.remove("hidden"); } else badge.classList.add("hidden"); }
        var label = $("#cart-item-count-label"); if (label) label.textContent = count + " item" + (count !== 1 ? "s" : "");
        var items = $("#cart-items"), footer = $("#cart-footer"), footerM = $("#cart-footer-mobile");
        if (!items) return;
        if (cart.length === 0) {
            items.innerHTML = '<div class="h-full flex flex-col items-center justify-center text-slate-500 gap-4 py-20"><i data-lucide="shopping-cart" class="w-16 h-16 opacity-10"></i><p class="text-lg font-semibold">Your cart is empty</p><a href="index.html" class="px-6 py-2.5 rounded-xl border border-purple-500/30 text-purple-400 hover:bg-purple-500/10 font-semibold text-sm transition-all">Browse Games</a></div>';
            if (footer) footer.classList.add("hidden"); if (footerM) footerM.classList.add("hidden");
        } else {
            items.innerHTML = cart.map(function (item) {
                return '<div class="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/20 items-center transition-all">' +
                    '<img src="' + item.img + '" alt="' + safeStr(item.title) + '" class="w-20 h-20 rounded-xl object-cover shrink-0 shadow-lg" />' +
                    '<div class="flex-1 min-w-0"><h4 class="font-bold text-sm text-white line-clamp-2 mb-1">' + safeStr(item.title) + '</h4><p class="text-xs text-slate-500 mb-2">' + safeStr(item.desc.split(" • ")[0]) + '</p><p class="text-cyan-400 font-black text-base">' + safeStr(item.price) + '</p></div>' +
                    '<div class="flex flex-col items-end gap-3 shrink-0"><button onclick="GG.removeItem(\'' + item.key + '\')" class="text-slate-600 hover:text-red-400 transition-colors p-1"><i data-lucide="trash-2" class="w-4 h-4"></i></button>' +
                    '<div class="flex items-center gap-2 bg-black/50 rounded-xl p-1.5 border border-white/10"><button onclick="GG.changeQty(\'' + item.key + '\',-1)" class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"><i data-lucide="minus" class="w-3 h-3"></i></button><span class="text-sm font-black w-6 text-center text-white">' + item.qty + '</span><button onclick="GG.changeQty(\'' + item.key + '\',1)" class="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-all"><i data-lucide="plus" class="w-3 h-3"></i></button></div></div></div>';
            }).join("");
            if (footer) { footer.classList.remove("hidden"); $("#cart-total").innerText = total; $("#cart-subtotal").innerText = total + " TK"; }
            if (footerM) { footerM.classList.remove("hidden"); $("#cart-total-mobile").innerText = total; }
        }
        icons();
    }

    function handleCheckout(btn) {
        if (cart.length === 0) return;
        var total = cart.reduce(function (a, i) { return a + priceNum(i.price) * i.qty; }, 0);
        var msg = "Hi Emon's Games Gallery, I want to purchase:\n\n" + cart.map(function (i) { return "- " + i.qty + "x " + i.title + " (" + i.price + ")"; }).join("\n") + "\n\nTotal: " + total + " TK";
        try {
            var ta = document.createElement("textarea"); ta.value = msg; document.body.appendChild(ta); ta.select();
            try { document.execCommand("copy"); } catch (e) {} document.body.removeChild(ta);
        } catch (e) {}
        var orig = btn.innerHTML;
        btn.innerHTML = '<span class="flex items-center gap-2"><i data-lucide="check-circle-2" class="w-5 h-5"></i> Copied! Opening Messenger...</span>';
        icons();
        setTimeout(function () { btn.innerHTML = orig; icons(); window.open(FB_LINK, "_blank"); }, 1500);
    }

    /* =========================================================
       AUTH + TERMS MODALS (front-end only, as before)
       ========================================================= */
    var authMode = "signin", isLoggedIn = false;
    function openAuthModal() { if (isLoggedIn) { isLoggedIn = false; updateAuthUI(); alert("You have been signed out."); return; } $("#auth-modal").classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeAuthModal() { $("#auth-modal").classList.remove("open"); document.body.style.overflow = ""; }
    function setAuthMode(mode) {
        authMode = mode;
        var st = $("#btn-signin-tab"), rt = $("#btn-register-tab"), nf = $("#auth-name-field"), sb = $("#auth-submit-btn"), mt = $("#auth-modal-title");
        if (mode === "signin") {
            st.className = "flex-1 py-2 text-sm font-bold rounded-lg bg-purple-600 text-white shadow-lg transition-all";
            rt.className = "flex-1 py-2 text-sm font-bold rounded-lg text-slate-400 hover:text-white transition-all";
            nf.classList.add("hidden"); sb.innerText = "Sign In"; mt.innerHTML = '<i data-lucide="user-circle" class="text-purple-400 w-6 h-6"></i> Sign In';
        } else {
            rt.className = "flex-1 py-2 text-sm font-bold rounded-lg bg-purple-600 text-white shadow-lg transition-all";
            st.className = "flex-1 py-2 text-sm font-bold rounded-lg text-slate-400 hover:text-white transition-all";
            nf.classList.remove("hidden"); sb.innerText = "Create Account"; mt.innerHTML = '<i data-lucide="user-plus" class="text-purple-400 w-6 h-6"></i> Register';
        }
        icons();
    }
    function handleAuthSubmit(e) { e.preventDefault(); isLoggedIn = true; closeAuthModal(); updateAuthUI(); setTimeout(function () { alert(authMode === "signin" ? "Successfully signed in!" : "Account registered successfully!"); }, 100); }
    function updateAuthUI() {
        var di = $("#auth-icon-desktop"), mi = $("#auth-icon-mobile"), mtx = $("#auth-text-mobile");
        if (isLoggedIn) { if (di) di.innerHTML = '<i data-lucide="user-check" class="w-6 h-6 text-cyan-400"></i>'; if (mi) mi.innerHTML = '<i data-lucide="user-check" class="w-5 h-5 text-cyan-400"></i>'; if (mtx) mtx.innerText = "My Account (Sign Out)"; }
        else { if (di) di.innerHTML = '<i data-lucide="log-in" class="w-6 h-6"></i>'; if (mi) mi.innerHTML = '<i data-lucide="log-in" class="w-5 h-5"></i>'; if (mtx) mtx.innerText = "Sign In / Register"; }
        icons();
    }
    function openTerms() { $("#terms-modal").classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeTerms() { $("#terms-modal").classList.remove("open"); document.body.style.overflow = ""; }
    function toggleMobileMenu() {
        var menu = $("#mobile-dropdown"), icon = $("#mobile-menu-icon");
        if (!menu) return;
        if (menu.classList.contains("hidden")) { menu.classList.remove("hidden"); if (icon) icon.setAttribute("data-lucide", "x"); }
        else { menu.classList.add("hidden"); if (icon) icon.setAttribute("data-lucide", "menu"); }
        icons();
    }

    /* =========================================================
       HOME-ONLY: hero video, story slider, reviews
       ========================================================= */
    var STREAMABLE_URL = "https://streamable.com/e/o5130o";
    var isVideoMuted = true, currentSlide = 0, slideInterval, currentReview = 0, reviewInterval;
    function loadVideo() { var f = $("#hero-streamable-iframe"); if (f) f.src = STREAMABLE_URL + "?autoplay=1&nocontrols=1&muted=1&loop=1"; }
    function toggleVideoMute() {
        isVideoMuted = !isVideoMuted;
        var f = $("#hero-streamable-iframe"), ic = $("#mute-icon"), lb = $("#mute-label");
        if (f) f.src = STREAMABLE_URL + "?autoplay=1&nocontrols=1&muted=" + (isVideoMuted ? 1 : 0) + "&loop=1";
        if (ic) ic.setAttribute("data-lucide", isVideoMuted ? "volume-x" : "volume-2");
        if (lb) lb.textContent = isVideoMuted ? "Unmute Video" : "Mute Video";
        icons();
    }
    function initSlider() {
        var container = $("#slider-container"); if (!container) return;
        var slides = [
            { icon: "shield-check", title: "Lifetime Guarantee", desc: "Our online activations aren't temporary. Once you buy a global key from us, that game is yours for a lifetime. No revokes, no stress.", img: globalKeyData[3].img },
            { icon: "trending-up", title: "Unbeatable Prices", desc: "We challenge you to find cheaper prices. We negotiate directly to bring you AAA titles at a fraction of their standard retail cost.", img: globalKeyData[0].img },
            { icon: "clock", title: "Instant Delivery", desc: "Message us, send the payment, and receive your game details almost instantly. Your next adventure is just minutes away.", img: globalKeyData[15].img }
        ];
        container.innerHTML = slides.map(function (slide, index) {
            return '<div id="slide-' + index + '" class="absolute inset-0 transition-opacity duration-1000 ease-in-out ' + (index === 0 ? "opacity-100 z-10" : "opacity-0 z-0") + '">' +
                '<div class="absolute inset-0"><img src="' + slide.img + '" alt="" loading="lazy" class="w-full h-full object-cover opacity-20 blur-xl scale-125" /><div class="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/80 to-transparent"></div><div class="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent"></div></div>' +
                '<div class="absolute inset-0 flex items-center"><div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex items-center justify-between gap-8">' +
                '<div id="slide-content-' + index + '" class="max-w-xl transition-all duration-1000 transform ' + (index === 0 ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0") + '"><div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500/20 to-cyan-500/20 flex items-center justify-center mb-6 border border-white/10"><i data-lucide="' + slide.icon + '" class="text-cyan-400 w-8 h-8"></i></div><h2 class="text-4xl md:text-5xl font-extrabold text-white mb-4">' + slide.title + '</h2><p class="text-lg text-slate-300 leading-relaxed font-medium">' + slide.desc + '</p></div>' +
                '<div id="slide-img-' + index + '" class="hidden md:block transition-all duration-1000 transform ' + (index === 0 ? "translate-y-0 opacity-100 scale-100" : "translate-y-10 opacity-0 scale-95") + ' w-56 lg:w-64 h-80 lg:h-96 shrink-0 rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(168,85,247,0.2)]"><img src="' + slide.img + '" alt="" loading="lazy" class="w-full h-full object-cover" /></div>' +
                '</div></div></div>';
        }).join("") + '<div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-3">' + slides.map(function (_, i) { return '<button id="dot-' + i + '" onclick="GG.setSlide(' + i + ')" class="w-3 h-3 rounded-full transition-all duration-300 ' + (i === 0 ? "bg-cyan-400 w-8" : "bg-white/30 hover:bg-white/60") + '"></button>'; }).join("") + "</div>";
        if (slideInterval) clearInterval(slideInterval);
        slideInterval = setInterval(function () { setSlide((currentSlide + 1) % slides.length); }, 5000);
        window.__slideCount = slides.length;
    }
    function setSlide(index) {
        var cs = currentSlide;
        document.getElementById("slide-" + cs).classList.replace("opacity-100", "opacity-0"); document.getElementById("slide-" + cs).classList.replace("z-10", "z-0");
        document.getElementById("slide-content-" + cs).classList.replace("translate-y-0", "translate-y-10"); document.getElementById("slide-content-" + cs).classList.replace("opacity-100", "opacity-0");
        document.getElementById("slide-img-" + cs).classList.replace("translate-y-0", "translate-y-10"); document.getElementById("slide-img-" + cs).classList.replace("opacity-100", "opacity-0"); document.getElementById("slide-img-" + cs).classList.replace("scale-100", "scale-95");
        document.getElementById("dot-" + cs).className = "w-3 h-3 rounded-full transition-all duration-300 bg-white/30 hover:bg-white/60";
        currentSlide = index;
        document.getElementById("slide-" + index).classList.replace("opacity-0", "opacity-100"); document.getElementById("slide-" + index).classList.replace("z-0", "z-10");
        document.getElementById("slide-content-" + index).classList.replace("translate-y-10", "translate-y-0"); document.getElementById("slide-content-" + index).classList.replace("opacity-0", "opacity-100");
        document.getElementById("slide-img-" + index).classList.replace("translate-y-10", "translate-y-0"); document.getElementById("slide-img-" + index).classList.replace("opacity-0", "opacity-100"); document.getElementById("slide-img-" + index).classList.replace("scale-95", "scale-100");
        document.getElementById("dot-" + index).className = "w-3 h-3 rounded-full transition-all duration-300 bg-cyan-400 w-8";
    }
    function initReviews() {
        var container = $("#reviews-slider-container"), dots = $("#reviews-dots");
        if (!container || !dots) return;
        container.innerHTML = reviewsData.map(function (rev, index) {
            return '<div id="review-' + index + '" class="absolute inset-0 transition-all duration-700 ease-in-out flex flex-col items-center justify-center ' + (index === 0 ? "opacity-100 scale-100 z-10" : "opacity-0 scale-95 z-0") + '">' +
                '<div class="flex gap-1 text-amber-400 mb-4">' + Array(rev.rating).fill('<i data-lucide="star" class="w-5 h-5 fill-amber-400"></i>').join("") + '</div>' +
                '<p class="text-lg md:text-xl text-muted italic mb-6">"' + safeStr(rev.review) + '"</p>' +
                '<div class="flex items-center gap-2"><div class="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm">' + safeStr(rev.name.charAt(0)) + '</div><h4 class="font-bold text-base">' + safeStr(rev.name) + '</h4><span class="bg-cyan-500/20 text-cyan-400 text-[10px] px-2 py-0.5 rounded font-bold uppercase ml-2 flex items-center gap-1"><i data-lucide="check-circle" class="w-3 h-3"></i> Verified</span></div></div>';
        }).join("");
        dots.innerHTML = reviewsData.map(function (_, i) { return '<button id="rev-dot-' + i + '" onclick="GG.setReview(' + i + ')" class="w-2.5 h-2.5 rounded-full transition-all duration-300 ' + (i === 0 ? "bg-purple-500 w-6" : "bg-white/20 hover:bg-white/40") + '"></button>'; }).join("");
        if (reviewInterval) clearInterval(reviewInterval);
        reviewInterval = setInterval(function () { setReview((currentReview + 1) % reviewsData.length); }, 4000);
    }
    function setReview(index) {
        var cr = currentReview;
        document.getElementById("review-" + cr).classList.replace("opacity-100", "opacity-0"); document.getElementById("review-" + cr).classList.replace("scale-100", "scale-95"); document.getElementById("review-" + cr).classList.replace("z-10", "z-0");
        document.getElementById("rev-dot-" + cr).className = "w-2.5 h-2.5 rounded-full transition-all duration-300 bg-white/20 hover:bg-white/40";
        currentReview = index;
        document.getElementById("review-" + index).classList.replace("opacity-0", "opacity-100"); document.getElementById("review-" + index).classList.replace("scale-95", "scale-100"); document.getElementById("review-" + index).classList.replace("z-0", "z-10");
        document.getElementById("rev-dot-" + index).className = "w-2.5 h-2.5 rounded-full transition-all duration-300 bg-purple-500 w-6";
    }

    /* =========================================================
       SEARCH PAGE
       ========================================================= */
    function runSearch() {
        var q = (qp("q") || "").trim();
        var titleEl = $("#search-title"), subEl = $("#search-subtitle"), input = $("#desktop-search"), minput = $("#mobile-search");
        if (input) input.value = q; if (minput) minput.value = q;
        var ql = q.toLowerCase();
        var flat = [];
        Object.keys(CATEGORIES).forEach(function (k) { flat = flat.concat(tagged(k, CATEGORIES[k].data)); });
        searchResults = q ? flat.filter(function (g) {
            return g.title.toLowerCase().indexOf(ql) > -1 || (g.genre && g.genre.toLowerCase().indexOf(ql) > -1) || g.category && false;
        }) : [];
        if (titleEl) titleEl.textContent = q ? 'Results for "' + q + '"' : "Search";
        if (subEl) subEl.textContent = searchResults.length + " game" + (searchResults.length !== 1 ? "s" : "") + " found";
        visibleCounts.search = ITEMS_PER_PAGE;
        renderGrid("search", "search-grid");
    }

    /* =========================================================
       GAME DETAIL PAGE
       ========================================================= */
    function renderGameDetail() {
        var host = $("#game-detail"); if (!host) return;
        var catKey = qp("cat"), id = qp("id");
        var g = getGame(catKey, id);
        if (!g) {
            host.innerHTML = '<div class="max-w-2xl mx-auto text-center py-24"><i data-lucide="ghost" class="w-16 h-16 text-purple-500 mx-auto mb-6"></i><h1 class="text-3xl font-extrabold text-base mb-3">Game not found</h1><p class="text-muted mb-8">We couldn\'t find that game. It may have been moved or removed.</p><a href="index.html" class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold">Back to Home</a></div>';
            icons(); return;
        }
        document.title = g.title + " — Emon's Games Gallery";
        var d = discountFor(g);
        var isComing = String(g.price).toLowerCase() === "coming soon";
        var lifetime = g.desc.indexOf("Lifetime") > -1;
        var priceBlock = isComing
            ? '<span class="text-lg font-bold text-amber-400 bg-amber-400/10 px-3 py-1.5 rounded-lg border border-amber-400/20">Coming Soon</span>'
            : (d ? '<span class="text-lg text-subtle line-through mr-3">' + d.orig + ' TK</span>' : "") + '<span class="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">' + safeStr(g.price) + "</span>" + (d ? ' <span class="ml-2 align-middle bg-red-600 text-white px-2 py-1 rounded text-xs font-black">-' + d.pct + "%</span>" : "");
        var actions = isComing
            ? '<a href="' + FB_LINK + '" target="_blank" rel="noopener" class="flex-1 py-4 rounded-xl bg-gradient-to-r from-amber-600 to-orange-600 text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95"><i data-lucide="bell" class="w-5 h-5"></i> Pre-order via Messenger</a>'
            : '<button onclick="GG.addToCart(\'' + g.catKey + "'," + g.id + ')" class="flex-1 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold flex items-center justify-center gap-2 transition-all active:scale-95"><i data-lucide="shopping-cart" class="w-5 h-5"></i> Add to Cart</button>' +
              '<a href="' + FB_LINK + '" target="_blank" rel="noopener" class="flex-1 py-4 rounded-xl surface-2 border-base text-base hover:border-purple-500/50 font-bold flex items-center justify-center gap-2 transition-all active:scale-95"><i data-lucide="message-circle" class="w-5 h-5"></i> Buy via Messenger</a>';

        host.innerHTML =
            '<nav class="text-sm text-muted mb-8 flex items-center gap-2 flex-wrap"><a href="index.html" class="hover:text-purple-400">Home</a><i data-lucide="chevron-right" class="w-4 h-4"></i><a href="' + (CATEGORIES[g.catKey] || {}).page + '" class="hover:text-purple-400">' + safeStr(g.category) + '</a><i data-lucide="chevron-right" class="w-4 h-4"></i><span class="text-base font-semibold">' + safeStr(g.title) + '</span></nav>' +
            '<div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start detail-enter">' +
              '<div class="relative rounded-3xl overflow-hidden surface border-base shadow-2xl"><img src="' + g.img + '" alt="' + safeStr(g.title) + '" class="w-full object-cover" />' + (d ? '<div class="absolute top-4 left-4 bg-red-600 text-white px-3 py-1.5 rounded-lg text-sm font-black shadow-xl">-' + d.pct + "%</div>" : "") + (g.popular ? '<div class="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest flex items-center gap-1"><i data-lucide="flame" class="w-3.5 h-3.5"></i> Popular</div>' : "") + "</div>" +
              '<div>' +
                '<div class="flex flex-wrap items-center gap-2 mb-4">' + (g.genre ? '<span class="px-2.5 py-1 bg-purple-500/10 text-cyan-300 text-[11px] font-black uppercase tracking-widest rounded border border-purple-500/20">' + safeStr(g.genre) + "</span>" : "") + '<span class="px-2.5 py-1 surface-2 border-base text-muted text-[11px] font-bold rounded">' + safeStr(g.category) + "</span></div>" +
                '<h1 class="text-3xl md:text-5xl font-black text-base mb-4 leading-tight">' + safeStr(g.title) + "</h1>" +
                '<p class="text-muted leading-relaxed mb-6">' + safeStr(g.desc) + ". " + (lifetime ? "This product includes a lifetime guarantee — once it's yours, it stays yours. " : "") + 'Delivered digitally via Messenger or WhatsApp after payment confirmation, typically within minutes.</p>' +
                '<div class="mb-8">' + priceBlock + "</div>" +
                '<div class="flex flex-col sm:flex-row gap-3 mb-8">' + actions + "</div>" +
                '<div class="grid grid-cols-3 gap-3 mb-8">' +
                  '<div class="surface border-base rounded-xl p-4 text-center"><i data-lucide="shield-check" class="w-6 h-6 text-green-400 mx-auto mb-2"></i><span class="text-xs font-bold text-base block">100% Secure</span></div>' +
                  '<div class="surface border-base rounded-xl p-4 text-center"><i data-lucide="zap" class="w-6 h-6 text-yellow-400 mx-auto mb-2"></i><span class="text-xs font-bold text-base block">Instant Delivery</span></div>' +
                  '<div class="surface border-base rounded-xl p-4 text-center"><i data-lucide="infinity" class="w-6 h-6 text-purple-400 mx-auto mb-2"></i><span class="text-xs font-bold text-base block">' + (lifetime ? "Lifetime" : "Genuine") + "</span></div>" +
                "</div>" +
                '<div class="surface-2 border-base rounded-xl p-4"><p class="text-xs text-muted font-bold mb-3 flex items-center gap-2"><i data-lucide="smartphone" class="w-4 h-4 text-cyan-400"></i> Accepted Payments</p><div class="flex flex-wrap gap-2"><span class="px-2.5 py-1 bg-[#E2136E]/10 border border-[#E2136E]/30 rounded text-[11px] font-bold text-base">bKash</span><span class="px-2.5 py-1 bg-[#F7931E]/10 border border-[#F7931E]/30 rounded text-[11px] font-bold text-base">Nagad</span><span class="px-2.5 py-1 bg-[#8C1585]/10 border border-[#8C1585]/30 rounded text-[11px] font-bold text-base">Rocket</span><span class="px-2.5 py-1 bg-[#00529B]/10 border border-[#00529B]/30 rounded text-[11px] font-bold text-base">Upay</span></div></div>' +
              "</div>" +
            "</div>";

        // "More like this" row
        var related = tagged(g.catKey, CATEGORIES[g.catKey].data).filter(function (x) { return x.id !== g.id && (!g.genre || x.genre === g.genre); }).slice(0, 4);
        if (related.length < 4) {
            tagged(g.catKey, CATEGORIES[g.catKey].data).filter(function (x) { return x.id !== g.id; }).forEach(function (x) {
                if (related.length < 4 && !related.find(function (r) { return r.id === x.id; })) related.push(x);
            });
        }
        var relHost = $("#related-grid");
        if (relHost && related.length) {
            $("#related-section").classList.remove("hidden");
            relHost.innerHTML = related.map(createGameCard).join("");
        }
        icons();
    }

    /* =========================================================
       PAGE DISPATCH
       ========================================================= */
    function init() {
        applyTheme(getThemePref());
        watchSystem();
        injectChrome();
        updateAuthUI();
        updateCartUI();

        var page = currentPage();
        if (page === "home") {
            renderGrid("global", "home-grid");
            initSlider();
            initReviews();
            setTimeout(loadVideo, 800);
        } else if (CATEGORIES[page]) {
            renderGrid(page, page + "-grid");
        } else if (page === "search") {
            runSearch();
        } else if (page === "game") {
            renderGameDetail();
        }
        icons();
    }

    /* Expose the handlers referenced by inline onclick="GG.*" */
    window.GG = {
        cycleTheme: cycleTheme, setTheme: setThemePref,
        toggleCart: toggleCart, addToCart: addToCart, changeQty: changeQty, removeItem: removeItem, handleCheckout: handleCheckout,
        openAuthModal: openAuthModal, closeAuthModal: closeAuthModal, setAuthMode: setAuthMode, handleAuthSubmit: handleAuthSubmit,
        openTerms: openTerms, closeTerms: closeTerms, toggleMobileMenu: toggleMobileMenu,
        toggleVideoMute: toggleVideoMute, setSlide: setSlide, setReview: setReview,
        loadMore: loadMore, handleSort: handleSort, renderGrid: renderGrid
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init);
    else init();
})();
