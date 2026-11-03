import type { TradeSite } from "./types";

export function Faq({ site }: { site: TradeSite }) {
  return (
    <div className="wrap">
      <div className="faq-wrap" id="faq">
        <h2 id="faq-title">Questions</h2>
        <div className="faq">
          {site.faqs.map((f) => (
            <details key={f.q}>
              <summary>{f.q}</summary>
              <div className="answer">{f.a}</div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}

export function HoursList({ hours }: { hours: string[] }) {
  return <ul className="hours">{hours.map((h) => <li key={h}>{h}</li>)}</ul>;
}
