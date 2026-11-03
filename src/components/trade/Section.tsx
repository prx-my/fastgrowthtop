import clsx from "clsx";
import type { ReactNode } from "react";

type Tone = "white" | "linen" | "tint" | "navy";

/**
 * Page band with an optional wavy bottom edge. `waveTo` is the tone of the band below,
 * so the wave paints that colour and the two sections join without a seam.
 */
export function Section({
  id,
  tone = "white",
  waveTo,
  flip,
  flushTop,
  className,
  labelledBy,
  children,
}: {
  id?: string;
  tone?: Tone;
  waveTo?: Tone;
  flip?: boolean;
  flushTop?: boolean;
  className?: string;
  labelledBy?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={clsx(
        "section",
        tone === "linen" && "linen",
        tone === "tint" && "tint",
        tone === "navy" && "dark",
        waveTo && ["wave", `to-${waveTo === "navy" ? "dark" : waveTo}`],
        flip && "flip",
        flushTop && "flush-top",
        className,
      )}
    >
      {children}
    </section>
  );
}
