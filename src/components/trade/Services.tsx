import type { TradeSite } from "./types";

export function Services({ site }: { site: TradeSite }) {
  const { services } = site;
  return (
    <div className="wrap">
      <h2 id="services-title">{services.title}</h2>
      <div className="svc-cols">
        {services.groups.map((g) => (
          <div key={g.id} id={g.id} data-tone={g.tone}>
            <h3><span className="svc-icon" aria-hidden="true">{g.icon}</span>{g.title}</h3>
            <ul className="list">
              {g.items.map((it) => (
                <li key={it.label}>
                  <a href="#request">{it.label}</a>
                  {it.note && <p className="small">{it.note}</p>}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="svc-more">
        {services.extras.map((x) => (
          <div key={x.id} id={x.id}>
            <h3>{x.title}</h3>
            <p>{x.body}</p>
          </div>
        ))}
      </div>
      <p className="svc-close small muted">{services.closing}</p>
    </div>
  );
}
