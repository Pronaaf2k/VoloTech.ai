import Image from "next/image";
import Link from "next/link";
import { PiArrowUpRight } from "react-icons/pi";
import { MobileNav } from "@/components/mobile-nav";
import { navItems } from "@/components/nav-items";

export function Brand() {
  return <span className="brand" translate="no"><Image src="/volo-mark.webp" alt="" width={32} height={32} /><span>VoloTech<span className="brand-domain">.ai</span></span></span>;
}

export function SiteHeader() {
  return <header className="site-header shell">
    <Link href="/" aria-label="VoloTech.ai home"><Brand /></Link>
    <nav className="desktop-nav" aria-label="Main navigation">
      {navItems.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}
    </nav>
    <Link className="button nav-cta" href="/contact">Start a project <PiArrowUpRight aria-hidden="true" /></Link>
    <MobileNav />
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell">
      <div className="footer-top"><Link href="/" aria-label="VoloTech.ai home"><Brand /></Link><p>Business technology.<br />Built, connected, supported.</p><Link className="text-link" href="/contact">Start a conversation <PiArrowUpRight aria-hidden="true" /></Link></div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} VoloTech.ai</small><nav aria-label="Footer navigation">{navItems.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link href="/contact">Contact</Link></nav></div>
    </div>
  </footer>;
}
