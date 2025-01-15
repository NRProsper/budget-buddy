import {ClassValue, clsx} from "clsx";
import {twMerge} from "tailwind-merge";

export const  baseUrl = process.env.NEXT_PUBLIC_VERCEL_URL
    ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` :
    'http://localhost:3000';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(...inputs))

export const ensureStartsWith = (stringToCheck: string, startsWith: string) =>
    stringToCheck.startsWith(startsWith) ? stringToCheck : `${startsWith}${stringToCheck}`;