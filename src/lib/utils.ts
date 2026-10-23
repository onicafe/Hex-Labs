import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Files in public/ must carry Vite's base path (e.g. /Hex-Labs/ on GitHub Pages).
export const publicUrl = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
