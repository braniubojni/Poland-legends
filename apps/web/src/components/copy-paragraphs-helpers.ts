export const splitCopyParagraphs = (text: string): string[] =>
  text
    .split(/\n\n+/)
    .map((paragraph) => paragraph.trim())
    .filter((paragraph) => paragraph.length > 0);
