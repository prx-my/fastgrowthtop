import type { TradeSite } from "./types";

/** Intro and shop card beside the town cards and call prompt, then a full-bleed map. */
export function ServiceArea({ site }: { site: TradeSite }) {
  const { area, phone } = site;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.address.join(", "))}`;
  return (
    <>
      <div className="wrap">
        <div className="area-grid">
          <div className="area-copy">
            <h2 id="area-title">{area.title}</h2>
            <p>{area.intro}</p>
            <address className="shop-card">
              <strong>{site.name}</strong>
              {site.address.join(", ")}
              <br />
              <a href={directions}>Get directions →</a>
            </address>
          </div>
          <div>
            <ul className="towns">
              {area.towns.map((t) => <li key={t}>{t}</li>)}
            </ul>
            {area.note && <p className="area-note small muted">{area.note}</p>}
            <div className="area-call">
              <p>Don&apos;t see your town? Call or text and we&apos;ll tell you if we can reach you.</p>
              <a className="btn btn-ghost" href={`tel:${phone.tel}`} aria-label={`Call ${phone.display}, ${site.name}`}>Call {phone.display}</a>
            </div>
          </div>
        </div>
      </div>
      <iframe className="map" src={area.map.src} width={800} height={600} title={area.map.title} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
    </>
  );
}
