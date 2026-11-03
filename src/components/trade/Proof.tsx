import Image from "next/image";
import { Stars } from "./Stars";
import type { TradeSite } from "./types";

/** Heading with the rating summary beside it, review cards, then credentials and job photos. */
export function Proof({ site }: { site: TradeSite }) {
  const { proof, rating } = site;
  return (
    <div className="wrap">
      <div className="proof-head">
        <h2 id="reviews-title">{proof.title}</h2>
        <div className="proof-rating">
          <span className="big-num">{rating.score}</span>
          <div>
            <Stars />
            <p className="small muted">From {rating.count} reviews on <a href={rating.url}>Google</a></p>
          </div>
        </div>
      </div>
      <div className="review-cards">
        {proof.reviews.map((r) => (
          <figure className="review-card" key={r.author}>
            <blockquote><p>“{r.quote}”</p></blockquote>
            <figcaption className="small muted">{r.author} · {r.date} · <a href={rating.url}>Google review</a></figcaption>
          </figure>
        ))}
      </div>
      <p className="reviews-all"><a href={rating.url}>Read all {rating.count} reviews on Google</a></p>
      <ul className="creds">
        {proof.creds.map((c) => <li key={c}>{c}</li>)}
      </ul>
      <div className="photos">
        {proof.photos.map((p) => (
          <figure className="shot" key={p.src}>
            <Image src={p.src} width={p.width} height={p.height} alt={p.alt} sizes="(min-width: 768px) 33vw, 100vw" />
            <figcaption>{p.caption}{p.placeholder && <> <span className="ph">[{p.placeholder}]</span></>}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
