import { fileURLToPath } from "url";
import { dirname } from "path";

// Missing __dirname, __filename variables in ESM
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = dirname(__filename);
