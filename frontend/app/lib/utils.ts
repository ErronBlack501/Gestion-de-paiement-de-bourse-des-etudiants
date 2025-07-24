import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPreviousMonths(n: number): string[] {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("fr-FR", {
    month: "long",
    year: "numeric",
  });

  return Array.from({ length: n }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return formatter.format(d);
  }).reverse();
}

