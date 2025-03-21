function isMac() {
  return /macintosh|mac os x/i.test(navigator.userAgent)
}

export function isGetVariablesHotkey(event: KeyboardEvent) {
  return isMac()
    ? event.altKey && event.code === "Space"
    : event.ctrlKey && event.code === "Space"
}
