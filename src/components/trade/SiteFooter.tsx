import Image from "next/image";
import { HoursList } from "./Faq";
import type { TradeSite } from "./types";

export function CtaBand({ site }: { site: TradeSite }) {
  return (
    <section className="section cta" aria-labelledby="cta-title">
      <div className="wrap">
        <h2 id="cta-title">{site.cta.title}</h2>
        <p>{site.cta.body}</p>
        <div className="btns">
          <a className="btn btn-primary" href={`tel:${site.phone.tel}`} aria-label={`Call ${site.phone.display}, ${site.name}`}>Call {site.phone.display}</a>
          <a className="btn btn-ghost" href="#request">Request service</a>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ site }: { site: TradeSite }) {
  const { footer } = site;
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot-grid">
          <div>
            <span className="foot-logo"><Image src={site.logo.src} width={site.logo.width} height={site.logo.height} alt={site.logo.alt} /></span>
            <address className="addr">
              {site.name}<br />
              {site.address.map((l) => <span key={l}>{l}<br /></span>)}
              <a href={`tel:${site.phone.tel}`}>{site.phone.display}</a><br />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </address>
          </div>
          <div>
            <h2>Hours</h2>
            <HoursList hours={site.hours} />
            <p className="small" style={{ marginTop: 8 }}>{site.dispatchNote}</p>
          </div>
          <nav aria-labelledby="foot-svc">
            <h2 id="foot-svc">Services</h2>
            <ul className="foot-links">{footer.services.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
          </nav>
          <nav aria-labelledby="foot-co">
            <h2 id="foot-co">Company</h2>
            <ul className="foot-links">
              {footer.company.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
              {footer.extra && <li style={{ padding: "10px 0" }}>{footer.extra}</li>}
            </ul>
          </nav>
        </div>
        <p className="foot-bottom">{footer.bottom}</p>
      </div>
    </footer>
  );
}
