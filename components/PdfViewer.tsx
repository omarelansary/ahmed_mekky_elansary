"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as pdfjs from "pdfjs-dist";
import "@/lib/pdfjs/setup";

type Props = {
  fileUrl: string;
  initialScale?: number; // 1 = 100%
};

export default function PdfViewer({ fileUrl, initialScale = 1 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [pdfDoc, setPdfDoc] = useState<pdfjs.PDFDocumentProxy | null>(null);
  const [pageNum, setPageNum] = useState(1);
  const [scale, setScale] = useState(initialScale);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const task = pdfjs.getDocument({ url: fileUrl });
        const doc = await task.promise;
        if (!cancelled) setPdfDoc(doc);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error("Failed to load PDF", e);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [fileUrl]);

  const renderPage = useCallback(async () => {
    if (!pdfDoc || !canvasRef.current) return;
    const page = await pdfDoc.getPage(pageNum);
    const viewport = page.getViewport({ scale });
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    // pdfjs types vary across versions; cast for stability
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (page.render as any)({ canvasContext: context, viewport }).promise;
  }, [pdfDoc, pageNum, scale]);

  useEffect(() => {
    renderPage();
  }, [renderPage]);

  const total = pdfDoc?.numPages ?? 0;

  const canPrev = pageNum > 1;
  const canNext = total ? pageNum < total : false;

  return (
    <div className="flex flex-col gap-3">
      <div className="sticky top-[56px] z-30 flex items-center gap-2 rounded border border-black/10 dark:border-white/10 bg-background/90 backdrop-blur px-3 py-2">
        <button
          onClick={() => canPrev && setPageNum((n) => Math.max(1, n - 1))}
          disabled={!canPrev}
          className="rounded border border-black/10 dark:border-white/20 px-2 py-1 disabled:opacity-50"
        >
          ◀
        </button>
        <span className="text-sm">
          {pageNum} / {total || "—"}
        </span>
        <button
          onClick={() => canNext && setPageNum((n) => Math.min(total, n + 1))}
          disabled={!canNext}
          className="rounded border border-black/10 dark:border-white/20 px-2 py-1 disabled:opacity-50"
        >
          ▶
        </button>
        <div className="ms-auto flex items-center gap-2">
          <button onClick={() => setScale((s) => Math.max(0.5, +(s - 0.1).toFixed(2)))} className="rounded border border-black/10 dark:border-white/20 px-2 py-1">−</button>
          <span className="text-sm w-12 text-center">{Math.round(scale * 100)}%</span>
          <button onClick={() => setScale((s) => Math.min(3, +(s + 0.1).toFixed(2)))} className="rounded border border-black/10 dark:border-white/20 px-2 py-1">+</button>
        </div>
      </div>
      <div className="w-full overflow-auto rounded border border-black/10 dark:border-white/10 [height:70vh] md:[height:85vh]">
        <div className="grid place-items-center min-h-full">
          <canvas ref={canvasRef} className="max-w-full h-auto" />
        </div>
      </div>
    </div>
  );
}
