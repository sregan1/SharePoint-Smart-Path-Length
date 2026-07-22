// Single source of truth for the web part's fallback values. The manifest's
// preconfiguredEntries.properties (a static JSON file) can't import these —
// keep it in sync by hand if these ever change.
export const DEFAULT_WARNING_LENGTH = 225;
export const DEFAULT_ERROR_LENGTH = 260;
// "UsernamePath" (rather than the shorter "UserName") deliberately pads this
// estimate a few characters longer than a typical real username — a
// borderline path should read as a false positive (worth double-checking)
// rather than a false negative (silently fine when it's actually too long).
export const DEFAULT_SAMPLE_PATH = 'C:\\Users\\UsernamePath\\OneDrive - Company\\';
