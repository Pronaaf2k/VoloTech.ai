"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";
import { PiList, PiX } from "react-icons/pi";
import { ThemeSelect } from "@/components/theme-select";
import { navItems } from "@/components/nav-items";
export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  return <div className="mobile-nav" onKeyDown={event => {
    if (event.key === "Escape") { setOpen(false); trigger.current?.focus(); }
  }}><button ref={trigger} type="button" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-menu" onClick={() => setOpen(!open)}>{open ? <PiX aria-hidden="true" /> : <PiList aria-hidden="true" />}</button><nav id="mobile-menu" hidden={!open} aria-label="Mobile navigation">{[...navItems, { label: "Contact", href: "/contact" }].map(item => <Link key={item.href} href={item.href} aria-current={pathname === item.href ? "page" : undefined} onClick={() => setOpen(false)}>{item.label}</Link>)}<ThemeSelect /></nav></div>;
}
