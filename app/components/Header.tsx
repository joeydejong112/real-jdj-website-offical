"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { Menu, X } from "lucide-react";
import { navItems } from "../lib/content";
import { EASE_OUT_EXPO, WhatsAppButton } from "./motion-primitives";

const HIDE_AFTER_PX = 160;

export function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 22, restDelta: 0.001 });

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setIsHidden(latest > previous && latest > HIDE_AFTER_PX && !isMenuOpen);
  });

  function closeMenu() {
    setIsMenuOpen(false);
  }

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-paper/90 backdrop-blur-md"
      animate={{ y: isHidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
    >
      <motion.div
        className="absolute inset-x-0 top-0 h-[3px] origin-left bg-teal"
        style={{ scaleX: progress }}
        aria-hidden="true"
      />

      <div className="shell flex h-[76px] items-center justify-between gap-6">
        <a href="#top" className="flex min-h-11 flex-col justify-center leading-none" onClick={closeMenu}>
          <span className="font-display block text-[28px] font-extrabold leading-none tracking-tight text-navy">
            JDJ<span className="text-teal">.</span>
          </span>
          <span className="mt-1 block text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
            Webdevelopment
          </span>
        </a>

        <nav aria-label="Hoofdnavigatie" className="hidden items-center gap-8 text-[15px] font-semibold text-navy lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="group relative py-2 transition-colors hover:text-teal-deep"
            >
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-teal transition-transform duration-300 ease-out group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <div className="hidden sm:block">
          <WhatsAppButton />
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-xl border border-line bg-white text-navy lg:hidden"
          aria-label={isMenuOpen ? "Menu sluiten" : "Menu openen"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            aria-label="Mobiele navigatie"
            className="overflow-hidden border-t border-line bg-paper lg:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE_OUT_EXPO }}
          >
            <div className="shell flex flex-col gap-1 py-5">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl px-4 py-3 text-lg font-semibold text-navy hover:bg-mist"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.05, duration: 0.35, ease: EASE_OUT_EXPO }}
                >
                  {item.label}
                </motion.a>
              ))}
              <div className="mt-3 px-4 pb-2 sm:hidden">
                <WhatsAppButton className="w-full" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
