export type MediaType = "movie" | "show" | "game" | "book" | "album" | "other";

export interface MediaItem {
  id: string;
  title: string;
  type: MediaType;
  coverImage: string;
  year?: number;
  rating?: number; // 1-10
  status: "completed" | "in-progress" | "planned" | "dropped";
  notes?: string;
  creator?: string; // director, author, artist, developer, etc.
  genre?: string[];
  dateAdded: string;
  dateCompleted?: string;
  userId: string;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  picture?: string;
  bio?: string;
  favoriteGenres?: string[];
  joinedAt: string;
  library: MediaItem[];
}

export interface LibraryStats {
  totalItems: number;
  movies: number;
  shows: number;
  games: number;
  books: number;
  albums: number;
  other: number;
  completed: number;
  inProgress: number;
  planned: number;
}

export const MEDIA_TYPE_CONFIG: Record<
  MediaType,
  { label: string; icon: string; color: string; creatorLabel: string }
> = {
  movie: {
    label: "Movies",
    icon: "🎬",
    color: "#ef4444",
    creatorLabel: "Director",
  },
  show: {
    label: "Shows",
    icon: "📺",
    color: "#8b5cf6",
    creatorLabel: "Creator",
  },
  game: {
    label: "Games",
    icon: "🎮",
    color: "#10b981",
    creatorLabel: "Developer",
  },
  book: {
    label: "Books",
    icon: "📚",
    color: "#f59e0b",
    creatorLabel: "Author",
  },
  album: {
    label: "Albums",
    icon: "🎵",
    color: "#ec4899",
    creatorLabel: "Artist",
  },
  other: {
    label: "Other",
    icon: "📦",
    color: "#6b7280",
    creatorLabel: "Creator",
  },
};

export const STATUS_CONFIG: Record<
  MediaItem["status"],
  { label: string; color: string }
> = {
  completed: { label: "Completed", color: "#10b981" },
  "in-progress": { label: "In Progress", color: "#3b82f6" },
  planned: { label: "Planned", color: "#f59e0b" },
  dropped: { label: "Dropped", color: "#ef4444" },
};
