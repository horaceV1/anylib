import { MediaItem, LibraryStats, MediaType } from "./types";

// Simple in-memory store (in production, replace with a database)
const libraries: Map<string, MediaItem[]> = new Map();

function getUserLibrary(userId: string): MediaItem[] {
  if (!libraries.has(userId)) {
    libraries.set(userId, []);
  }
  return libraries.get(userId)!;
}

export function getLibrary(userId: string): MediaItem[] {
  return getUserLibrary(userId);
}

export function addMediaItem(userId: string, item: Omit<MediaItem, "id" | "userId" | "dateAdded">): MediaItem {
  const library = getUserLibrary(userId);
  const newItem: MediaItem = {
    ...item,
    id: crypto.randomUUID(),
    userId,
    dateAdded: new Date().toISOString(),
  };
  library.push(newItem);
  return newItem;
}

export function updateMediaItem(userId: string, itemId: string, updates: Partial<MediaItem>): MediaItem | null {
  const library = getUserLibrary(userId);
  const index = library.findIndex((item) => item.id === itemId);
  if (index === -1) return null;
  library[index] = { ...library[index], ...updates };
  return library[index];
}

export function deleteMediaItem(userId: string, itemId: string): boolean {
  const library = getUserLibrary(userId);
  const index = library.findIndex((item) => item.id === itemId);
  if (index === -1) return false;
  library.splice(index, 1);
  return true;
}

export function getLibraryStats(userId: string): LibraryStats {
  const library = getUserLibrary(userId);
  return {
    totalItems: library.length,
    movies: library.filter((i) => i.type === "movie").length,
    shows: library.filter((i) => i.type === "show").length,
    games: library.filter((i) => i.type === "game").length,
    books: library.filter((i) => i.type === "book").length,
    albums: library.filter((i) => i.type === "album").length,
    other: library.filter((i) => i.type === "other").length,
    completed: library.filter((i) => i.status === "completed").length,
    inProgress: library.filter((i) => i.status === "in-progress").length,
    planned: library.filter((i) => i.status === "planned").length,
  };
}

export function getLibraryByType(userId: string, type: MediaType): MediaItem[] {
  return getUserLibrary(userId).filter((item) => item.type === type);
}

export function searchLibrary(userId: string, query: string): MediaItem[] {
  const q = query.toLowerCase();
  return getUserLibrary(userId).filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.creator?.toLowerCase().includes(q) ||
      item.genre?.some((g) => g.toLowerCase().includes(q))
  );
}
