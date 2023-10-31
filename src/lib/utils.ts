import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEthereumAddress(address: string) {
  if (address) {
    const length = address.length;
    const prefix = address.substring(0, 7);
    const suffix = address.substring(length - 5);

    return `${prefix}...${suffix}`;
  }
}
