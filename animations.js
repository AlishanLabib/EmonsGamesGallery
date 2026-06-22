/* =========================================================
   Emon's Games Gallery — Animation Enhancement Layer
   ---------------------------------------------------------
   100% additive & defensive. Every feature is wrapped in its
   own try/catch and guarded so it can never break the site's
   existing logic (rendering, cart, tabs, sliders, modals).
   Honors prefers-reduced-motion.
   ========================================================= */
(function () {
    "use strict";

    var reduceMotion = false;
    try {
        reduceMotion = window.matchMedia &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) { /* ignore */ }

    /* Tiny helpers ---------------------------------------------------- */
    function $all(sel, root) {
        return Array.prototype.slice.call((root || document).querySelectorAll(sel));
    }
    function safe(fn) {
        try { fn(); } catch (e) { /* never let one feature break the rest */ }
    }

    /* ----------------------------------------------------------------
       1. Scroll progress bar
       ---------------------------------------------------------------- */
    function initScrollProgress() {
        var bar = document.createElement("div");
        bar.id = "scroll-progress";
        document.body.appendChild(bar);

        var ticking = false;
        function update() {
            var h = document.documentElement;
            var scrolled = h.scrollTop;
            var max = h.scrollHeight - h.clientHeight;
            var pct = max > 0 ? (scrolled / max) * 100 : 0;
            bar.style.width = pct + "%";
            ticking = false;
        }
        window.addEventListener("scroll", function () {
            if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    }

    /* ----------------------------------------------------------------
       2. Navbar shrink + frost on scroll
       ---------------------------------------------------------------- */
    function initNavScroll() {
        var nav = document.querySelector("nav");
        if (!nav) return;
        var ticking = false;
        function update() {
            if (window.scrollY > 40) nav.classList.add("nav-scrolled");
            else nav.classList.remove("nav-scrolled");
            ticking = false;
        }
        window.addEventListener("scroll", function () {
            if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
        }, { passive: true });
        update();
    }

    /* ----------------------------------------------------------------
       3. Scroll reveal for curated static sections
       ---------------------------------------------------------------- */
    function initScrollReveal() {
        if (!("IntersectionObserver" in window)) return;

        // Sections that should fade/slide in as you scroll to them.
        // We only tag elements that do NOT already use animate-fade-up,
        // to avoid double-animating.
        var selectors = [
            "footer .grid > div",                 // footer columns + trust badges
            "[class*='border-dashed']",           // "Coming soon" panels
            "#reviews-slider-container",          // reviews block
            ".footer-glow-line"
        ];
        var targets = [];
        selectors.forEach(function (sel) {
            $all(sel).forEach(function (el) {
                if (el.classList.contains("animate-fade-up")) return;
                if (targets.indexOf(el) === -1) targets.push(el);
            });
        });

        if (reduceMotion) return; // leave everything visible, no observer

        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("reveal-in");
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });

        targets.forEach(function (el, i) {
            el.setAttribute("data-reveal", "");
            // stagger siblings that share a parent for a cascade feel
            el.style.setProperty("--reveal-delay", ((i % 4) * 90) + "ms");
            io.observe(el);
        });
    }

    /* ----------------------------------------------------------------
       4. Staggered entrance for dynamically-injected game cards
          + tag them for 3D tilt. Uses MutationObserver because the
          grids are filled via innerHTML after render / tab switch.
       ---------------------------------------------------------------- */
    var GRID_IDS = ["home-grid", "online-grid", "offline-grid", "ps-grid", "topup-grid", "search-grid"];

    function decorateCards(grid) {
        // Direct children are the card wrappers produced by createGameCard.
        var cards = Array.prototype.slice.call(grid.children);
        cards.forEach(function (card, i) {
            if (!card || card.nodeType !== 1) return;
            if (card.__enhanced) return;
            card.__enhanced = true;

            // Stagger the existing fade-up animation into a smooth cascade.
            if (!reduceMotion && card.classList.contains("animate-fade-up")) {
                card.style.animationDelay = Math.min(i, 12) * 55 + "ms";
            }
            // Enable pointer tilt + shine.
            card.classList.add("tilt-card");
        });
    }

    function initCardEnhancer() {
        GRID_IDS.forEach(function (id) {
            var grid = document.getElementById(id);
            if (!grid) return;
            decorateCards(grid); // initial pass
            if (!("MutationObserver" in window)) return;
            var mo = new MutationObserver(function () { decorateCards(grid); });
            mo.observe(grid, { childList: true });
        });
    }

    /* ----------------------------------------------------------------
       5. Pointer-based 3D tilt + light sweep (delegated, perf-friendly)
       ---------------------------------------------------------------- */
    function initTilt() {
        if (reduceMotion) return;
        var MAX = 9; // degrees of tilt

        document.addEventListener("pointermove", function (e) {
            var card = e.target.closest && e.target.closest(".tilt-card");
            if (!card) return;
            var r = card.getBoundingClientRect();
            var px = (e.clientX - r.left) / r.width;   // 0..1
            var py = (e.clientY - r.top) / r.height;   // 0..1
            var rotY = (px - 0.5) * (MAX * 2);
            var rotX = (0.5 - py) * (MAX * 2);
            card.style.transform =
                "perspective(900px) rotateX(" + rotX.toFixed(2) + "deg) rotateY(" +
                rotY.toFixed(2) + "deg) translateY(-6px)";
            // feed the CSS shine position
            card.style.setProperty("--mx", (px * 100).toFixed(1) + "%");
            card.style.setProperty("--my", (py * 100).toFixed(1) + "%");
        }, { passive: true });

        document.addEventListener("pointerleave", function (e) {
            var card = e.target.closest && e.target.closest(".tilt-card");
            if (card) card.style.transform = "";
        }, true);
        // pointerout fallback for leaving the card region
        document.addEventListener("pointerout", function (e) {
            var card = e.target.closest && e.target.closest(".tilt-card");
            if (!card) return;
            if (!card.contains(e.relatedTarget)) card.style.transform = "";
        }, true);
    }

    /* ----------------------------------------------------------------
       6. Material-style ripple on every button click
       ---------------------------------------------------------------- */
    function initRipple() {
        if (reduceMotion) return;
        document.addEventListener("click", function (e) {
            var btn = e.target.closest && e.target.closest("button, a.w-14, a.w-9");
            if (!btn) return;
            // Skip the nav toggle / icon-only chrome to avoid clipping issues.
            var r = btn.getBoundingClientRect();
            var size = Math.max(r.width, r.height);
            var span = document.createElement("span");
            span.className = "ripple";
            span.style.width = span.style.height = size + "px";
            span.style.left = (e.clientX - r.left - size / 2) + "px";
            span.style.top = (e.clientY - r.top - size / 2) + "px";
            btn.appendChild(span);
            setTimeout(function () { if (span.parentNode) span.parentNode.removeChild(span); }, 650);
        }, true);
    }

    /* ----------------------------------------------------------------
       7. Cosmetic flourishes — animated gradient shimmer + floating orbs
       ---------------------------------------------------------------- */
    function initFlourishes() {
        // Animated shimmer on the big gradient hero word + brand gradients.
        var glow = document.querySelector(".animate-glow");
        if (glow) glow.classList.add("text-shimmer");

        // Gentle float on the footer glow orbs.
        $all("footer .blur-3xl").forEach(function (orb) {
            orb.classList.add("float-soft");
        });
    }

    /* ----------------------------------------------------------------
       Boot — run after DOM is ready, but never block the site's own
       window.onload init sequence.
       ---------------------------------------------------------------- */
    function boot() {
        safe(initScrollProgress);
        safe(initNavScroll);
        safe(initScrollReveal);
        safe(initCardEnhancer);
        safe(initTilt);
        safe(initRipple);
        safe(initFlourishes);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }

    // The home grid is filled inside the site's window.onload; run one more
    // decoration pass shortly after load so first-paint cards get enhanced.
    window.addEventListener("load", function () {
        setTimeout(function () { safe(initCardEnhancer); }, 50);
    });
})();
