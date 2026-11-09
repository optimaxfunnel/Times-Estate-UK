/**
 * The assistant's opening message. Kept in its own file so the browser-side
 * assistant button can show it without importing the server-side assistant
 * (which reads the property database). Moved here 2026-11-09.
 */
export const AI_GREETING =
  "Hello — I'm the Times Estate Ltd AI assistant (demonstration mode). I can help you find a page, search for a property, or start a callback/viewing request. I can't give legal, financial or valuation advice, and everything I suggest is reviewed by a person before anything is sent.";
