import { surpriseMePrompts } from "../constants";

export function getRandomPrompt(prompt: string): string {
  const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);
  const randomPrompt = surpriseMePrompts[randomIndex];

  // Make sure user doesn't get same prompt consecutively
  if (randomPrompt === prompt) return getRandomPrompt(prompt);

  return randomPrompt;
}
