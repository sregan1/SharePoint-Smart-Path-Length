// Fills {name}-style placeholders in a localized string. Placeholders are
// named (not positional) so a translation can reorder them to suit its grammar.
export function fmt(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    (Object.prototype.hasOwnProperty.call(values, key) ? String(values[key]) : match));
}

// Right-to-left UI languages SPFx can serve this web part in.
const RTL_LANGUAGES = ['ar', 'he', 'fa', 'ur'];

export function isRtlLocale(locale: string | undefined): boolean {
  const lang = (locale ?? '').toLowerCase().split('-')[0];
  return RTL_LANGUAGES.indexOf(lang) !== -1;
}
