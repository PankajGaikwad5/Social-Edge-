"use client";

import { useEffect, useState } from "react";

// Types each word, holds it, deletes it, then moves to the next, with a blinking caret
export default function Typewriter({ words }) {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIndex];
    let delay = deleting ? 60 : 120;
    if (!deleting && text === word) delay = 1800;
    if (deleting && text === "") delay = 350;

    const timer = setTimeout(() => {
      if (!deleting && text === word) {
        setDeleting(true);
      } else if (deleting && text === "") {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      } else {
        setText(word.slice(0, text.length + (deleting ? -1 : 1)));
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [text, deleting, wordIndex, words]);

  return (
    <span className="inline-flex items-center" aria-label={words.join(", ")}>
      <span aria-hidden="true">{text}</span>
      <span aria-hidden="true" className="ml-[0.06em] inline-block h-[0.9em] w-0.5 animate-pulse bg-edge-stone/80" />
    </span>
  );
}
