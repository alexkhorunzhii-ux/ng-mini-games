/** Returns a random item from the array, or null if empty. */
export function getRandomItem<T>(items: T[]): T | null {
  if (!items.length) {
    return null;
  }

  return items[Math.floor(Math.random() * items.length)];
}
