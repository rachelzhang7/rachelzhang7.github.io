"use client";

import { useEffect, useRef, useState } from "react";

type ScrollState = {
  /** 0 → 1 through the scrollable height of the document. */
  progress: number;
  /** Label of the section currently under the reading line. */
  section: string;
};

/**
 * One passive, rAF-throttled scroll listener.
 *
 * `trackSections` is opt-in because resolving the active section queries the
 * DOM, and the header only needs the progress number.
 */
export function useScrollProgress(trackSections = false): ScrollState {
  const [state, setState] = useState<ScrollState>({ progress: 0, section: "" });
  const frame = useRef(0);

  useEffect(() => {
    const read = () => {
      const doc = document.documentElement;
      const scrollable = doc.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? window.scrollY / scrollable : 0;

      let section = "";
      if (trackSections) {
        // The active section is the last one whose top has passed the upper
        // third of the viewport — the region a reader is actually looking at.
        const marks = document.querySelectorAll<HTMLElement>("[data-section]");
        const line = window.innerHeight * 0.33;
        for (const mark of marks) {
          if (mark.getBoundingClientRect().top <= line) {
            section = mark.dataset.section ?? section;
          }
        }
        if (!section && marks.length) {
          section = marks[0].dataset.section ?? "";
        }
      }

      setState((prev) =>
        prev.progress === progress && prev.section === section
          ? prev
          : { progress, section },
      );
    };

    const onScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [trackSections]);

  return state;
}
