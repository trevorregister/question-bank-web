import crypto from "crypto"

export default function generateJoinCode() {
  return crypto.randomBytes(4).toString("hex")
}
