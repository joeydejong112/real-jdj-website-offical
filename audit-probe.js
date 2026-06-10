() => {
  const out = {};
  out.title = document.title;
  out.lang = document.documentElement.lang;
  out.headings = [...document.querySelectorAll("h1,h2,h3,h4")].map(h => ({tag: h.tagName, text: h.textContent.trim().slice(0,80)}));
  out.landmarks = document.querySelectorAll("header,nav,main,footer,aside").length;
  out.focusableCount = document.querySelectorAll("a[href],button,input,select,textarea,[tabindex]").length;
  out.imgs = [...document.querySelectorAll("img")].map(i => ({src: i.getAttribute("src"), alt: i.alt, nw: i.naturalWidth, nh: i.naturalHeight, rw: Math.round(i.getBoundingClientRect().width), rh: Math.round(i.getBoundingClientRect().height)}));
  out.svgSprite = !!document.querySelector(".svg-sprite");
  out.h1Count = document.querySelectorAll("h1").length;
  out.skipLink = !!document.querySelector("a[href='#main'], .skip-link");
  let focusVisible = false, reducedMotion = false;
  try {
    for (const s of document.styleSheets) {
      for (const r of s.cssRules || []) {
        const t = r.cssText || "";
        if (t.includes(":focus-visible")) focusVisible = true;
        if (t.includes("prefers-reduced-motion")) reducedMotion = true;
      }
    }
  } catch {}
  out.focusVisible = focusVisible;
  out.reducedMotion = reducedMotion;
  out.detailsCount = document.querySelectorAll("details").length;
  out.btns = [...document.querySelectorAll("a.btn, button")].map(b => ({text: b.textContent.trim().slice(0,30), w: Math.round(b.getBoundingClientRect().width), h: Math.round(b.getBoundingClientRect().height)})).filter(b => b.w > 0);
  out.h1Style = (() => { const h = document.querySelector("h1"); const c = getComputedStyle(h); return {size: c.fontSize, weight: c.fontWeight, ls: c.letterSpacing, wrap: c.textWrap, lh: c.lineHeight}; })();
  out.hero = (() => {
    const l = document.querySelector(".laptop")?.getBoundingClientRect();
    const p = document.querySelector(".phone-mockup")?.getBoundingClientRect();
    const m = document.querySelector(".mini-card")?.getBoundingClientRect();
    if (!l || !p) return null;
    return {laptop:{x:Math.round(l.x),y:Math.round(l.y),w:Math.round(l.width),h:Math.round(l.height)}, phone:{x:Math.round(p.x),y:Math.round(p.y),w:Math.round(p.width),h:Math.round(p.height)}, miniCard:m?{x:Math.round(m.x),y:Math.round(m.y),w:Math.round(m.width),h:Math.round(m.height)}:null};
  })();
  return JSON.stringify(out, null, 2);
}
