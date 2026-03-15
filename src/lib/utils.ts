import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFCFA(value: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value) + " FCFA";
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export const FILIERE_COLORS: Record<string, string> = {
  "commerce-distribution": "#1A5276",
  "agro-business": "#145A32",
  "services-techniques": "#6E2F0A",
  "digital-local": "#4A235A",
  "entrepreneur-feminin": "#7B241C",
};
