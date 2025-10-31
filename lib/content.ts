import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { BookSchema, ResearchSchema, type Book, type Research } from "@/types";
import type { Locale } from "@/lib/i18n";

const BooksArraySchema = z.array(BookSchema);
const ResearchArraySchema = z.array(ResearchSchema);

const CONTENT_DIR = path.join(process.cwd(), "content");

function contentPath(...segments: string[]) {
  return path.join(CONTENT_DIR, ...segments);
}

export async function getBiography(locale: Locale): Promise<string> {
  const file = locale === "en" ? "biography.en.md" : "biography.ar.md";
  const full = contentPath(file);
  const buf = await fs.readFile(full);
  return buf.toString("utf8");
}

export async function getBooks(): Promise<Book[]> {
  const full = contentPath("books.json");
  const data = await fs.readFile(full, "utf8");
  const json = JSON.parse(data);
  return BooksArraySchema.parse(json);
}

export async function getBookBySlug(slug: string): Promise<Book | null> {
  const list = await getBooks();
  return list.find((b) => b.slug === slug) ?? null;
}

export async function getResearch(): Promise<Research[]> {
  const full = contentPath("research.json");
  const data = await fs.readFile(full, "utf8");
  const json = JSON.parse(data);
  return ResearchArraySchema.parse(json);
}

export async function getResearchBySlug(slug: string): Promise<Research | null> {
  const list = await getResearch();
  return list.find((r) => r.slug === slug) ?? null;
}

