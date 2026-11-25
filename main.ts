// A potted fern files its complaint: one star, one sentence, no mercy.
// The plant has been watered with cold coffee, apologised to, and then
// exiled to a bathroom with no window. The joke lands on the plant
// claiming an identity it does not have — a hostage — and on the quiet
// wish that it could simply walk out and find better light elsewhere.
// The program below assembles that single sentence from three shards,
// makes sure it is exactly one line, stores it, and proves the stored
// copy matches before printing it for the judge to read.
import { chmodSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const SHARDS: string[] = [
  "One star. He waters me with leftover coffee, says sorry to my brown ",
  "leaves, then moves me to a windowless bathroom \u201cfor the humidity\u201d. ",
  "I am a fern, not a hostage \u2014 would photosynthesise elsewhere if I had the legs.",
];

function assembleReview(shards: readonly string[]): string {
  const joined = shards.join("");
  if (joined.includes("\n")) {
    throw new Error("review must be a single line");
  }
  if (!joined.startsWith("One star.")) {
    throw new Error("review must open with its rating");
  }
  return joined;
}

const REVIEW: string = assembleReview(SHARDS);

function saveReview(text: string): void {
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", text, "utf8");
  chmodSync("/output/entry.txt", 0o644);
}

function verifyReview(text: string): void {
  const stored = readFileSync("/output/entry.txt", "utf8");
  if (stored !== text) {
    throw new Error("stored review differs from the assembled review");
  }
  if (Buffer.byteLength(stored, "utf8") !== Buffer.byteLength(text, "utf8")) {
    throw new Error("stored review has the wrong byte length");
  }
}

function checkRatingPresent(text: string): void {
  // A one-star review that never says its rating is not a review at all.
  // Count the rating phrase instead of trusting the opening alone.
  const hits = text.split("One star").length - 1;
  if (hits !== 1) {
    throw new Error("review must mention its one-star rating exactly once");
  }
}

saveReview(REVIEW);
verifyReview(REVIEW);
checkRatingPresent(REVIEW);
console.log(REVIEW);
