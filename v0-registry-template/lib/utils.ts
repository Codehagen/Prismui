import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatFileName = (name: string, length = 20) => {
  const extension = name.split(".").pop()
  const baseName = name.slice(0, name.lastIndexOf("."))

  return baseName.length > length
    ? `${baseName.slice(0, length)}...${extension ? `.${extension}` : ""}`
    : name
}

export const formatFileSize = (size: number) => {
  return `${(size / (1024 * 1024)).toFixed(2)} MB`
}
