import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const query = process.argv[2]?.trim();

if (!query) {
  console.error("Usage: npm run search -- <word>");
  process.exitCode = 1;
} else {
  const dataPath = fileURLToPath(
    new URL("./notes/keynote-highlights.json", import.meta.url),
  );
  const { highlights } = JSON.parse(await readFile(dataPath, "utf8"));
  const term = query.toLowerCase();
  const matches = highlights.filter(
    ({ title, summary }) =>
      title.toLowerCase().includes(term) || summary.toLowerCase().includes(term),
  );

  if (matches.length === 0) {
    console.log(`No highlights found for "${query}".`);
  } else {
    for (const { title, summary } of matches) {
      console.log(`${title}\n${summary}\n`);
    }
  }
}
