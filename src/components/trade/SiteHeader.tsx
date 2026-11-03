import Image from "next/image";
import type { TradeSite } from "./types";

export function SiteHeader({ site }: { site: TradeSite }) {
  const callLabel = `Call ${site.phone.display}, ${site.name}`;
  return (
    <header className="site-header">
      <div className="wrap">
        <a href="#main" aria-label={`${site.name}, home`}>
          <Image className="logo" src={site.logo.src} width={site.logo.width} height={site.logo.height} alt={site.logo.alt} preload />
        </a>
        <nav className="nav" aria-label="Main">
          {site.nav.map((l) => (
            <a key={l.href} href={l.href}>{l.label}</a>
          ))}
        </nav>
        <div className="header-phone">
          <span className="small">Call or text</span>
          <a href={`tel:${site.phone.tel}`} aria-label={callLabel}>{site.phone.display}</a>
        </div>
        <a className="btn btn-primary btn-callnow" href="#request">Request service</a>
        <a className="btn btn-primary btn-header" href={`tel:${site.phone.tel}`} aria-label={callLabel}>Call {site.phone.display}</a>
      </div>
    </header>
  );
}
