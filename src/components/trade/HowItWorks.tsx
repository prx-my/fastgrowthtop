import type { TradeSite } from "./types";

export function HowItWorks({ site }: { site: TradeSite }) {
  const { how } = site;
  return (
    <div className="wrap how-grid">
      <div>
        <h2 id="how-title">{how.title}</h2>
        <p className="lead muted">{how.lead}</p>
        <ol className="steps">
          {how.steps.map((s, i) => (
            <li key={s.title}>
              <span className="step-num" aria-hidden="true">{i + 1}</span>
              <div><h3>{s.title}</h3><p>{s.body}</p></div>
            </li>
          ))}
        </ol>
        <a className="btn btn-ghost" href="#request">Request service</a>
      </div>
      {/* plain img: an SVG is drawn once as an image instead of hundreds of live DOM shapes */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="rooms" src={how.image.src} width={how.image.width} height={how.image.height} alt={how.image.alt} loading="lazy" decoding="async" />
    </div>
  );
}
