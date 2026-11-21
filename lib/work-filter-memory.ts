const KEY = "gcc-work-filter";

/** Remembers the last Work filter so "Back to work" can restore it. */
export function rememberWorkFilter(category: string | undefined) {
  try {
    if (category) sessionStorage.setItem(KEY, category);
    else sessionStorage.removeItem(KEY);
  } catch {
    /* storage unavailable */
  }
}

export function recallWorkFilter(): string | undefined {
  try {
    return sessionStorage.getItem(KEY) ?? undefined;
  } catch {
    return undefined;
  }
}

