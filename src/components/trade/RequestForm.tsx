import type { TradeSite } from "./types";

export function RequestForm({ site }: { site: TradeSite }) {
  const { form } = site;
  return (
    <form className="form" id="request" aria-labelledby="request-title">
      <h2 id="request-title">{form.title}</h2>
      <p className="form-sub small muted">{form.sub}</p>
      <div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="name" type="text" autoComplete="name" /></div>
      <div className="field"><label htmlFor="f-phone">Phone</label><input id="f-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" /></div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="f-need">Service needed</label>
          <select id="f-need" name="need">
            {form.services.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field"><label htmlFor="f-zip">ZIP code</label><input id="f-zip" name="zip" type="text" autoComplete="postal-code" inputMode="numeric" maxLength={5} /></div>
      </div>
      <button className="btn btn-primary" type="button">{form.title}</button>
      {site.bookingUrl && (
        <p className="form-after small">Prefer to book yourself? <a href={site.bookingUrl}>Book online</a></p>
      )}
      <p className="muted" style={{ fontSize: 13 }}>Mockup: this form does not send.</p>
    </form>
  );
}
