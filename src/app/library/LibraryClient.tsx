"use client";

import { useState, useEffect, useCallback } from "react";
import { MediaItem, MediaType, LibraryStats } from "@/lib/types";
import MediaCard from "@/components/MediaCard";
import AddMediaModal from "@/components/AddMediaModal";
import FilterBar from "@/components/FilterBar";
import StatsGrid from "@/components/StatsGrid";
import AnimatedSection from "@/components/AnimatedSection";

export default function LibraryClient() {
  const [library, setLibrary] = useState<MediaItem[]>([]);
  const [stats, setStats] = useState<LibraryStats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeType, setActiveType] = useState<MediaType | "all">("all");
  const [activeStatus, setActiveStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchLibrary = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (activeType !== "all") params.set("type", activeType);
      if (searchQuery) params.set("q", searchQuery);

      const [libraryRes, statsRes] = await Promise.all([
        fetch(`/api/library?${params}`),
        fetch("/api/library?stats=true"),
      ]);

      if (libraryRes.ok) setLibrary(await libraryRes.json());
      if (statsRes.ok) setStats(await statsRes.json());
    } catch (error) {
      console.error("Failed to fetch library:", error);
    } finally {
      setLoading(false);
    }
  }, [activeType, searchQuery]);

  useEffect(() => {
    fetchLibrary();
  }, [fetchLibrary]);

  const handleAdd = async (data: Parameters<typeof fetch>[1] extends undefined ? never : unknown) => {
    try {
      const res = await fetch("/api/library", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        fetchLibrary();
      }
    } catch (error) {
      console.error("Failed to add item:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/library/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchLibrary();
      }
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const filteredLibrary = library.filter((item) => {
    if (activeStatus !== "all" && item.status !== activeStatus) return false;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <AnimatedSection>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-bold">
              My Library
            </h1>
            <p className="text-surface-400 mt-1">
              {stats?.totalItems || 0} items in your collection
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-3 bg-brand-600 hover:bg-brand-500 rounded-xl text-sm font-semibold transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
          >
            <span className="text-lg">+</span> Add Item
          </button>
        </div>
      </AnimatedSection>

      {/* Stats */}
      {stats && stats.totalItems > 0 && (
        <AnimatedSection delay={0.1}>
          <StatsGrid stats={stats} />
        </AnimatedSection>
      )}

      {/* Filters */}
      <AnimatedSection delay={0.2}>
        <FilterBar
          activeType={activeType}
          onTypeChange={setActiveType}
          activeStatus={activeStatus}
          onStatusChange={setActiveStatus}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />
      </AnimatedSection>

      {/* Library Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="rounded-2xl overflow-hidden">
              <div className="aspect-[2/3] shimmer rounded-2xl" />
              <div className="p-4 space-y-2">
                <div className="h-4 shimmer rounded w-3/4" />
                <div className="h-3 shimmer rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredLibrary.length === 0 ? (
        <AnimatedSection>
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-display font-semibold mb-2">
              {library.length === 0 ? "Your library is empty" : "No items match your filters"}
            </h3>
            <p className="text-surface-500 mb-6">
              {library.length === 0
                ? "Start adding movies, shows, games, books, and more!"
                : "Try adjusting your filters or search query."}
            </p>
            {library.length === 0 && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-6 py-3 bg-brand-600 hover:bg-brand-500 rounded-xl text-sm font-semibold transition-all"
              >
                Add Your First Item
              </button>
            )}
          </div>
        </AnimatedSection>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredLibrary.map((item, i) => (
            <MediaCard
              key={item.id}
              item={item}
              index={i}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      <AddMediaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAdd}
      />
    </div>
  );
}
