import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { GoogleGenerativeAI } from "@google/generative-ai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function jsonGsString(response: string) {
  return JSON.parse(response.substring(47).slice(0, -2));
}

export function emptyString(value: string | null | undefined | number) {
  return value === null || value === undefined ? "" : `${value}`;
}

export function setLocal(key: string, value: string) {
  localStorage.setItem(key, value);
}

export function getLocal(key: string) {
  const res = localStorage.getItem(key);
  return res ? JSON.parse(res) : null;
}

export async function run(prompt: string, token: string) {
  // Access your API key as an environment variable (see "Set up your API key" above)
  const genAI = new GoogleGenerativeAI(token);
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const result = await model.generateContent(prompt);
  const response = result.response;
  const text = response.text();
  return text;
}
