import fs from "fs/promises";
import path from "path";
import { Router } from "express";

import { tryCatch } from "../utils/tryCatch.js";

export async function routesHandler() {
  const parentDir = path.join(import.meta.dirname, "../routes");
  const router = Router();

  try {
    const directory = await fs.readdir(parentDir, {
      withFileTypes: true,
    });

    for (const dir of directory) {
      if (dir.isDirectory()) continue;

      //Add more filename options if necessary
      if (!/\.(ts|js|cjs|mjs)$/i.test(dir.name)) continue;

      const routerObj = await import(path.join(parentDir, dir.name));
    }
  } catch (err) {
    console.error("[routesHandler] Failed to read routes directory:", err);
    throw err;
  }
}
