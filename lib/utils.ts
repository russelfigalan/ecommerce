import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getData = async () => {
  const res = await fetch('https://api.escuelajs.co/api/v1/products');
  const products = await res.json();
  return products;
}
