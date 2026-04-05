"use client";

import { MediaType, MEDIA_TYPE_CONFIG } from "@/lib/types";

interface FilterBarProps {
  activeType: MediaType | "all";
  onTypeChange: (type: MediaType | "all") => void;
  activeStatus: string;
  onStatusChange: (status: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function FilterBar({
  activeType,
  onTypeChange,
  activeStatus,
  onStatusChange,
  searchQuery,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-surface-500">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search your library..."
          className="w-full pl-11 pr-4 py-3 bg-surface-900/50 border border-surface-700/50 rounded-xl text-sm focus:border-brand-500 focus:outline-none transition-colors placeholder:text-surface-600"
        />
      </div>

      {/* Type filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onTypeChange("all")}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
            activeType === "all"
              ? "bg-brand-600 text-white"
              : "bg-surface-800/50 text-surface-400 hover:bg-surface-700/50"
          }`}
        >
          All
        </button>
        {(Object.keys(MEDIA_TYPE_CONFIG) as MediaType[]).map((type) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
              activeType === type
                ? "bg-brand-600 text-white"
                : "bg-surface-800/50 text-surface-400 hover:bg-surface-700/50"
            }`}
          >
            {MEDIA_TYPE_CONFIG[type].icon} {MEDIA_TYPE_CONFIG[type].label}
          </button>
        ))}
      </div>

      {/* Status filters */}
      <div className="flex flex-wrap gap-2">
        {["all", "completed", "in-progress", "planned", "dropped"].map((s) => (
          <button
            key={s}
            onClick={() => onStatusChange(s)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              activeStatus === s
                ? "bg-surface-700 text-white"
                : "bg-surface-800/30 text-surface-500 hover:bg-surface-700/30"
            }`}
          >
            {s === "all"
              ? "All Statuses"
              : s === "completed"
              ? "✅ Completed"
              : s === "in-progress"
              ? "🔄 In Progress"
              : s === "planned"
              ? "📋 Planned"
              : "❌ Dropped"}
          </button>
        ))}
      </div>
    </div>
  );
}
