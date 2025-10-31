"use client";

import { GlobalWorkerOptions } from "pdfjs-dist";

// Point to a self-hosted worker under /public
GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
