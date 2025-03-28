import { generateSlug, RandomWordOptions } from "random-word-slugs"

const options: RandomWordOptions<2> = {
  format: "title",
  partsOfSpeech: ["adjective", "noun"],
  categories: {
    adjective: ["color", "personality"],
    noun: ["animals", "sports"],
  },
}

export default function generateName() {
  return generateSlug(2, options)
}
