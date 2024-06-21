import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { date } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function isEmptyString(value: string | null | undefined): boolean {
  return !value || value.trim() === '';
}

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

export const getRadianAngle = (degreeValue: number): number => {
  return (degreeValue * Math.PI) / 180;
};

export const formatDate = (date: Date): String => {
  const dateObject = new Date(date);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const month = dateObject.getMonth();
  const day = dateObject.getDay();
  const year = dateObject.getFullYear();
  let hour:number = dateObject.getHours();
  const min = dateObject.getUTCMinutes();
  
  let period = 'am';
  if (hour > 12 && hour != 24) {
    hour = hour - 12;
    period = 'pm';
  }

  const fullDate: string = months[month] + ' ' + day + ' ' + year + ' @' + hour + ':' + min + period;

  return fullDate;
}