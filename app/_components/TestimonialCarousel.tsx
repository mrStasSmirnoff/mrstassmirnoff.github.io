"use client";

import { Children, useEffect, useRef, useState, type ReactNode } from "react";

// Only scrolling needs JavaScript; the page still renders the quotes as HTML.
export function TestimonialCarousel({ children }: { children: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const total = Children.count(children);
  const [range, setRange] = useState<{ first: number; last: number } | null>(null);

  useEffect(() => {
    const track = trackRef.current!;
    const updateRange = () => {
      const card = track.firstElementChild as HTMLElement | null;
      if (!card) return;
      // Measure the CSS layout rather than duplicating its mobile breakpoint here.
      const gap = parseFloat(getComputedStyle(track).columnGap);
      const step = card.getBoundingClientRect().width + gap;
      const first = Math.round(track.scrollLeft / step) + 1;
      const visible = Math.round((track.clientWidth + gap) / step);
      const last = Math.min(total, first + visible - 1);
      setRange({ first, last });

      // An expanded, off-screen quote must not keep the whole carousel tall.
      let collapsed = false;
      Array.from(track.children).forEach((slide, index) => {
        if ((index < first - 1 || index >= last) && !slide.contains(document.activeElement)) {
          const details = slide.querySelector("details");
          if (details?.open) {
            details.open = false;
            collapsed = true;
          }
        }
      });
      // Shrinking a long quote should not leave the reader further down the page.
      if (collapsed) {
        requestAnimationFrame(() => track.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" }));
      }
    };

    updateRange();
    track.addEventListener("scroll", updateRange, { passive: true });
    const observer = new ResizeObserver(updateRange);
    observer.observe(track);
    return () => {
      track.removeEventListener("scroll", updateRange);
      observer.disconnect();
    };
  }, [total]);

  function move(direction: number) {
    const track = trackRef.current!;
    const card = track.firstElementChild as HTMLElement | null;
    if (!card) return;
    const step = card.getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap);
    track.scrollBy({ left: direction * step });
  }

  return (
    <div role="region" aria-roledescription="carousel" aria-label="Colleague recommendations">
      <div
        className="testimonial-track"
        id="testimonial-track"
        ref={trackRef}
        tabIndex={0}
        aria-label="Recommendations; use left and right arrow keys to browse"
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {children}
      </div>
      {range && total > 1 && (
        <div className="testimonial-controls">
          <p role="status" aria-live="polite" aria-atomic="true">
            {range.first === range.last ? range.first : `${range.first}–${range.last}`} of {total}
          </p>
          <div className="button-row">
            <button type="button" className="button button-secondary" aria-controls="testimonial-track" disabled={range.first === 1} onClick={() => move(-1)}>
              <span aria-hidden="true">←</span> Previous
            </button>
            <button type="button" className="button button-secondary" aria-controls="testimonial-track" disabled={range.last === total} onClick={() => move(1)}>
              Next <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
