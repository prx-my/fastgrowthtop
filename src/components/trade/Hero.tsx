import { RequestForm } from "./RequestForm";
import { Stars } from "./Stars";
import type { TradeSite } from "./types";

/** Headline beside the booking form on desktop; form straight after the headline on phones. */
export function Hero({ site }: { site: TradeSite }) {
  return (
    <div className="wrap hero-grid">
      <div className="hero-intro">
        <h1 id="hero-title">{site.hero.title}</h1>
        <p className="lead muted">{site.hero.lead}</p>
      </div>
      <RequestForm site={site} />
      <div className="hero-extra">
        <div className="hero-call">
          <a className="btn btn-ghost" href={`tel:${site.phone.tel}`} aria-label={`Call now: ${site.phone.display}, ${site.name}`}>Call {site.phone.display}</a>
          <span className="note-line small">{site.hero.note}</span>
        </div>
        <p className="rating small">
          <Stars />
          <a href={site.rating.url}>{site.rating.score} out of 5 on Google · {site.rating.count} reviews</a>
        </p>
      </div>
    </div>
  );
}
