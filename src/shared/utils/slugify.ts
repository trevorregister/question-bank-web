import { default as makeSlug } from "slugify"

const options = {
  lower: true,
  trim: true,
  strict: true,
  replacement: "-",
}
export default function slugify(string: string) {
  return makeSlug(string, options)
}
