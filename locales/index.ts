import type { Locale } from "@/lib/i18n";
import ar from "./ar";
import en from "./en";

export type Messages = typeof en;

export function getT(locale: Locale): Messages {
  return locale === "en" ? en : ar;
}

