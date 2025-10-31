import { z } from "zod";

export const BookTypeEnum = z.enum(["novel", "poetry", "essays"]);
export type BookType = z.infer<typeof BookTypeEnum>;

export const BookSchema = z.object({
  slug: z.string().min(1),
  title_ar: z.string().min(1),
  title_en: z.string().min(1),
  year: z.number().int().gte(0),
  type: BookTypeEnum,
  publisher: z.string().min(1),
  isbn: z.string().min(1),
  summary_ar: z.string().min(1),
  summary_en: z.string().min(1),
  cover: z.string().url().or(z.string().startsWith("/")),
  pdf: z.string().url().or(z.string().startsWith("/")).nullable().or(z.string().startsWith("/")).optional(),
  tags: z.array(z.string()).default([]),
});
export type Book = z.infer<typeof BookSchema>;

export const ResearchSchema = z.object({
  slug: z.string().min(1),
  title_ar: z.string().min(1),
  title_en: z.string().min(1),
  authors: z.array(z.string()).min(1),
  year: z.number().int().gte(0),
  abstract_ar: z.string().min(1),
  abstract_en: z.string().min(1),
  pdf: z.string().url().or(z.string().startsWith("/")).nullable().optional(),
  external_url: z.string().url().nullable().optional(),
  tags: z.array(z.string()).default([]),
});
export type Research = z.infer<typeof ResearchSchema>;

