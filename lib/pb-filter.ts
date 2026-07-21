function escapeFilter(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

export function pbEquals(field: string, value: string) {
  return `${field} = "${escapeFilter(value)}"`;
}
