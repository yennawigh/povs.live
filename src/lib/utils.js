import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function FILTER_NULLS(array) {
  if (!Array.isArray(array)) {
    return [];
  }

  return array.filter((item) => {
    return (
      typeof item !== "function" &&
      item !== undefined &&
      item !== false &&
      item !== null &&
      item !== ""
    );
  });
}

export const CONVERT_LANG = (lang, tr, en) => (lang === "tr" ? tr : en);

export function CONVERT_NUM(num) {
  if (num > 999999) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num > 999) {
    return (num / 1000).toFixed(1) + "K";
  } else {
    return num;
  }
}

export function CALCULATE_UPTIME(date) {
  const dateObj = new Date(date);
  dateObj.setUTCHours(dateObj.getUTCHours() + 3); // Add 3 hours for Turkish time zone

  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = (dateObj.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObj.getFullYear();

  return `${day}.${month}.${year}`;
}

export function CALCULATE_UPTIME2(start_time) {
  var end_time = new Date();
  var start_time_date = new Date(start_time);
  start_time_date.setUTCHours(start_time_date.getUTCHours() + 3);
  var elapsed_time_ms = end_time - start_time_date;
  var elapsed_time_sec = Math.floor(elapsed_time_ms / 1000);
  var seconds = elapsed_time_sec % 60;
  var minutes = Math.floor(elapsed_time_sec / 60) % 60;
  var hours = Math.floor(elapsed_time_sec / 3600);
  hours = hours.toString().padStart(2, "0");
  minutes = minutes.toString().padStart(2, "0");
  seconds = seconds.toString().padStart(2, "0");

  if (hours > 0) {
    return `${hours}:${minutes}:${seconds}`;
  } else {
    return `${minutes}:${seconds}`;
  }
}

export function CONVERT_GAME(name) {
  if (name === "Grand Theft Auto V (GTA)") {
    return "GTA V";
  } else {
    return name;
  }
}
