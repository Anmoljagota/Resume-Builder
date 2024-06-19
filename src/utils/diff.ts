import { diff as deepDiff } from "deep-diff";
import {
  diff_match_patch,
  DIFF_DELETE,
  DIFF_INSERT,
  DIFF_EQUAL,
} from "diff-match-patch";

function normalize(obj: any, escapeKeys?: string[]) {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = obj[key];
    if (escapeKeys?.includes(key)) {
      console.log("escape", key);
      continue;
    }

    if (typeof value === "number") {
      result[key] = value.toString();
    } else if (typeof value === "string") {
      result[key] = value;
    } else if (typeof value === "object") {
      result[key] = normalize(value, escapeKeys);
    } else {
      result[key] = value;
    }
  }

  return result;
}

export const diff = (v1: any, v2: any, escapeKeys: string[]) => {
  const nv1 = normalize(v1, escapeKeys);
  const nv2 = normalize(v2, escapeKeys);
  return deepDiff(nv1, nv2);
};

export const prettyHTMLDiff = (
  oldText: string,
  newText: string,
  config: {
    ADDED: string;
    REMOVED: string;
    UNTOUCHED: string;
  }
): string => {
  const dmp = new diff_match_patch();
  const diffs = dmp.diff_main(oldText, newText);
  dmp.diff_cleanupSemantic(diffs);

  let html = "";
  for (const [op, text] of diffs) {
    switch (op) {
      case DIFF_INSERT:
        html += `<span class="${config.ADDED}">${text}</span>`;
        break;
      case DIFF_DELETE:
        html += `<span class="${config.REMOVED}">${text}</span>`;
        break;
      case DIFF_EQUAL:
        html += `<span class="${config.UNTOUCHED}">${text}</span>`;
        break;
    }
  }

  return html;
};
