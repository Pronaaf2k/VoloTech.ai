import Image from "next/image";
import Link from "next/link";
import { PiArrowUpRight } from "react-icons/pi";
import { ThemeSelect } from "@/components/theme-select";
import { DesktopNav } from "@/components/desktop-nav";
import { MobileNav } from "@/components/mobile-nav";
import { navItems } from "@/components/nav-items";

export function Brand() {
  return <span className="brand" translate="no"><Image src="/volo-mark.webp" alt="" width={32} height={32} /><span>VoloTech</span></span>;
}

export function SiteHeader() {
  return <header className="site-header shell">
    <Link href="/" aria-label="VoloTech home"><Brand /></Link>
    <DesktopNav />
    <Link className="button nav-cta" href="/contact">Start a project <PiArrowUpRight aria-hidden="true" /></Link>
    <MobileNav />
    <div className="desktop-theme"><ThemeSelect /></div>
  </header>;
}

export function SiteFooter() {
  return <footer className="site-footer">
    <div className="shell">
      <div className="footer-top"><Link href="/" aria-label="VoloTech home"><Brand /></Link><p>Business technology.<br />Built, connected, supported.</p><Link className="text-link" href="/contact">Start a conversation <PiArrowUpRight aria-hidden="true" /></Link></div>
      <div className="footer-bottom"><small>© {new Date().getFullYear()} VoloTech</small><nav aria-label="Footer navigation">{navItems.map(item => <Link href={item.href} key={item.href}>{item.label}</Link>)}<Link href="/contact">Contact</Link></nav></div>
    </div>
  </footer>;
}
