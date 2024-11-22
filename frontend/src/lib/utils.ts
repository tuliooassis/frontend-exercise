import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string) {
  const date = new Date(dateString);

  function getOrdinalSuffix(day: number) {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  }

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const parts = new Intl.DateTimeFormat("en-US", options).formatToParts(date);
  const formattedDate = parts
    .map((part) => {
      if (part.type === "day") {
        return part.value + getOrdinalSuffix(Number(part.value));
      }
      return part.value;
    })
    .join("");

  return formattedDate;
}
