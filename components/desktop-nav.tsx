"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "./nav-items";
export function DesktopNav() {
  const pathname = usePathname();
  return <nav className="desktop-nav" aria-label="Main navigation">{navItems.map(item => <Link href={item.href} key={item.href} aria-current={pathname === item.href ? "page" : undefined}>{item.label}</Link>)}</nav>;
}
