export function resolveDuplicateTitle(notes, title, category) {
  const same = notes.filter(
    (n) =>
      n.category === category &&
      n.title.replace(/\s\(\d+\)$/, "") === title
  );

  return same.length > 0 ? `${title} (${same.length})` : title;
}
