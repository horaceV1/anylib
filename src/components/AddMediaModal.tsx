"use client";

import { useState } from "react";
import { MediaType, MEDIA_TYPE_CONFIG } from "@/lib/types";

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (data: {
    title: string;
    type: MediaType;
    coverImage: string;
    year?: number;
    rating?: number;
    status: "completed" | "in-progress" | "planned" | "dropped";
    notes?: string;
    creator?: string;
    genre?: string[];
  }) => void;
}

export default function AddMediaModal({ isOpen, onClose, onAdd }: AddMediaModalProps) {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<MediaType>("movie");
  const [coverImage, setCoverImage] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [status, setStatus] = useState<"completed" | "in-progress" | "planned" | "dropped">("completed");
  const [creator, setCreator] = useState("");
  const [genre, setGenre] = useState("");
  const [notes, setNotes] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      title,
      type,
      coverImage,
      year: year ? parseInt(year) : undefined,
      rating: rating ? parseFloat(rating) : undefined,
      status,
      creator: creator || undefined,
      genre: genre ? genre.split(",").map((g) => g.trim()) : undefined,
      notes: notes || undefined,
    });
    // Reset
    setTitle("");
    setType("movie");
    setCoverImage("");
    setYear("");
    setRating("");
    setStatus("completed");
    setCreator("");
    setGenre("");
    setNotes("");
    onClose();
  };

  const config = MEDIA_TYPE_CONFIG[type];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold">Add to Library</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-surface-800 hover:bg-surface-700 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Media Type */}
          <div>
            <label className="block text-sm text-surface-400 mb-2">Type</label>
            <div className="grid grid-cols-3 gap-2">
              {(Object.keys(MEDIA_TYPE_CONFIG) as MediaType[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setType(t)}
                  className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    type === t
                      ? "bg-brand-600 text-white"
                      : "bg-surface-800 text-surface-400 hover:bg-surface-700"
                  }`}
                >
                  {MEDIA_TYPE_CONFIG[t].icon} {MEDIA_TYPE_CONFIG[t].label}
                </button>
              ))}
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm text-surface-400 mb-2">Title *</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Enter title..."
              className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-surface-600"
            />
          </div>

          {/* Creator */}
          <div>
            <label className="block text-sm text-surface-400 mb-2">
              {config.creatorLabel}
            </label>
            <input
              type="text"
              value={creator}
              onChange={(e) => setCreator(e.target.value)}
              placeholder={`Enter ${config.creatorLabel.toLowerCase()}...`}
              className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-surface-600"
            />
          </div>

          {/* Cover Image URL */}
          <div>
            <label className="block text-sm text-surface-400 mb-2">
              Cover Image URL
            </label>
            <input
              type="url"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-surface-600"
            />
          </div>

          {/* Year & Rating */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-surface-400 mb-2">Year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="2024"
                min="1800"
                max="2100"
                className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-surface-600"
              />
            </div>
            <div>
              <label className="block text-sm text-surface-400 mb-2">
                Rating (1-10)
              </label>
              <input
                type="number"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="8.5"
                min="1"
                max="10"
                step="0.5"
                className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-surface-600"
              />
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm text-surface-400 mb-2">Status</label>
            <div className="grid grid-cols-2 gap-2">
              {(["completed", "in-progress", "planned", "dropped"] as const).map(
                (s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setStatus(s)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      status === s
                        ? "bg-brand-600 text-white"
                        : "bg-surface-800 text-surface-400 hover:bg-surface-700"
                    }`}
                  >
                    {s === "completed"
                      ? "✅ Completed"
                      : s === "in-progress"
                      ? "🔄 In Progress"
                      : s === "planned"
                      ? "📋 Planned"
                      : "❌ Dropped"}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Genre */}
          <div>
            <label className="block text-sm text-surface-400 mb-2">
              Genres (comma separated)
            </label>
            <input
              type="text"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              placeholder="Action, Sci-Fi, Drama"
              className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-surface-600"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm text-surface-400 mb-2">Notes</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Your thoughts..."
              rows={3}
              className="w-full px-4 py-3 bg-surface-900 border border-surface-700 rounded-xl text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-surface-600 resize-none"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-brand-600 hover:bg-brand-500 rounded-xl text-sm font-semibold transition-colors"
          >
            Add to Library
          </button>
        </form>
      </div>
    </div>
  );
}
