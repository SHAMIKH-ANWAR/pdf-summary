import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatFileName = (name: string): string => {
  const fileName = name.split('/').pop() || '';
  return fileName
    .replace(/[^a-zA-Z0-9.]/g, '-')
    .replace(/-+/g, '-')
    .split('.')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');
};