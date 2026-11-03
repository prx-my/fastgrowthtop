import type { TradeSite } from "./types";

/** Intro and call button beside the town cards, then a full-bleed map. */
export function ServiceArea({ site }: { site: TradeSite }) {
  const { area, phone } = site;
  return (
    <>
      <div className="wrap">
        <div className="area-grid">
          <div className="area-copy">
            <h2 id="area-title">{area.title}</h2>
            <p>{area.intro}</p>
            <p className="muted">Don&apos;t see your town? Call or text and we&apos;ll tell you if we can reach you.</p>
            <a className="btn btn-ghost" href={`tel:${phone.tel}`} aria-label={`Call ${phone.display}, ${site.name}`}>Call {phone.display}</a>
          </div>
          <div>
            <ul className="towns">
              {area.towns.map((t) => <li key={t}>{t}</li>)}
            </ul>
            {area.note && <p className="area-note small muted">{area.note}</p>}
          </div>
        </div>
      </div>
      <iframe className="map" src={area.map.src} width={800} height={600} title={area.map.title} allowFullScreen loading="lazy" referrerPolicy="strict-origin-when-cross-origin" />
    </>
  );
}
