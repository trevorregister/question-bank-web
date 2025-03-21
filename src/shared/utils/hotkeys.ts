export function isGetVariablesHotkey(event: KeyboardEvent) {
  return event.ctrlKey && event.code === "Space"
}
