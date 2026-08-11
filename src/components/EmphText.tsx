/**
 * Renders a sentence with the words named in `emph` set in the accent blue,
 * the way the mockups emphasise the key verbs of a headline. Punctuation is
 * preserved; only the glyph run is matched against the list.
 */
export function EmphText({
  text,
  emph,
}: {
  text: string;
  emph: string[];
}) {
  const parts = text.split(/(\s+)/);
  return (
    <>
      {parts.map((part, i) => {
        const word = part.replace(/[^A-Za-z'’]/g, "");
        const hit = emph.some(
          (e) => e.toLowerCase() === word.toLowerCase(),
        );
        return (
          <span key={i} className={hit ? "text-accent-2" : undefined}>
            {part}
          </span>
        );
      })}
    </>
  );
}
