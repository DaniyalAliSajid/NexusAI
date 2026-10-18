import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null | undefined, type: string) {
  if (type === "FREE") return "Free";
  if (type === "FREEMIUM") return "Freemium";
  if (type === "TRIAL") return "Free Trial";
  if (!price || price === 0) return "Custom";
  return `$${price}/mo`;
}
