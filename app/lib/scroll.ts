"use client";

import type { MouseEvent } from "react";
import { useEffect } from "react";

/**
 * Smooth-scrolls to an in-page anchor without writing the #hash into the URL.
 * Falls back to normal navigation when the target is not on the current page
 * (e.g. clicking "Pakketten" while on /privacy), so crawlers and other pages
 * keep working with the real href.
 */
export function scrollToAnchor(event: MouseEvent<HTMLAnchorElement>): void {
  const href = event.currentTarget.getAttribute("href") ?? "";
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return;

  const target = document.getElementById(href.slice(hashIndex + 1));
  if (!target) return;

  event.preventDefault();
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduceMotion ? "instant" : "smooth", block: "start" });
}

/**
 * Removes a #hash left in the URL after a cross-page anchor navigation,
 * once the browser has done its native scroll to the section.
 */
export function useStripUrlHash(): void {
  useEffect(() => {
    if (!window.location.hash) return;
    history.replaceState(null, "", window.location.pathname + window.location.search);
  }, []);
}
