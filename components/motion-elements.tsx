"use client";
import { useState, useRef, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { PiList, PiX } from "react-icons/pi";
const FlowSculpture = dynamic(() => import('./flow-sculpture'), { ssr: false });
export function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const reduced = useReducedMotion();
  return <motion.div initial={{ opacity: 1, y: 0 }} whileInView={reduced ? {} : { y: [16, 0] }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : delay }} className="reveal">{children}</motion.div>;
}
export function HeroArtwork() { return <div className="hero-art"><div className="hero-art-inner"><FlowSculpture /></div></div>; }
export function MobileNav() {
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <div className="mobile-nav" onKeyDown={event => { if(event.key === 'Escape') { setOpen(false); trigger.current?.focus(); } }}><button ref={trigger} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <PiX /> : <PiList />}</button>{open && <nav id="mobile-menu" aria-label="Mobile navigation">{['Solutions', 'Industries', 'Contact'].map(item => <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)}>{item}</a>)}</nav>}</div>;
}
