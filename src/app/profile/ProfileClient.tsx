"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { LibraryStats, MEDIA_TYPE_CONFIG, MediaType } from "@/lib/types";

interface ProfileClientProps {
  user: {
    name?: string;
    email?: string;
    picture?: string;
    nickname?: string;
    sub?: string;
  };
}

export default function ProfileClient({ user }: ProfileClientProps) {
  const profileRef = useRef<HTMLDivElement>(null);
  const [stats, setStats] = useState<LibraryStats | null>(null);

  useEffect(() => {
    // Animate profile in
    if (profileRef.current) {
      gsap.fromTo(
        profileRef.current.children,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
        }
      );
    }

    // Fetch stats
    fetch("/api/library?stats=true")
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  const mediaTypes: { key: keyof LibraryStats; type: MediaType }[] = [
    { key: "movies", type: "movie" },
    { key: "shows", type: "show" },
    { key: "games", type: "game" },
    { key: "books", type: "book" },
    { key: "albums", type: "album" },
    { key: "other", type: "other" },
  ];

  return (
    <div ref={profileRef} className="space-y-8">
      {/* Profile Header */}
      <div className="glass-light rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8" style={{ opacity: 0 }}>
        <div className="relative">
          {user.picture ? (
            <img
              src={user.picture}
              alt={user.name || "User"}
              className="w-28 h-28 rounded-2xl ring-4 ring-brand-500/20"
            />
          ) : (
            <div className="w-28 h-28 rounded-2xl bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-4xl font-bold">
              {user.name?.charAt(0) || "U"}
            </div>
          )}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-xs">
            ✓
          </div>
        </div>

        <div className="text-center md:text-left flex-1">
          <h1 className="text-3xl font-display font-bold">{user.name || "Anonymous"}</h1>
          <p className="text-surface-400 mt-1">{user.email}</p>
          {user.nickname && (
            <p className="text-surface-500 text-sm mt-1">@{user.nickname}</p>
          )}
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            <span className="px-3 py-1 rounded-lg bg-brand-600/20 text-brand-300 text-xs font-medium">
              📚 Library Member
            </span>
            {stats && stats.totalItems > 0 && (
              <span className="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-300 text-xs font-medium">
                🏆 {stats.totalItems} Items Tracked
              </span>
            )}
            {stats && stats.completed > 10 && (
              <span className="px-3 py-1 rounded-lg bg-green-600/20 text-green-300 text-xs font-medium">
                ⭐ Power User
              </span>
            )}
          </div>
        </div>

        <a
          href="/auth/logout"
          className="px-4 py-2 bg-surface-800 hover:bg-surface-700 rounded-xl text-sm transition-colors"
        >
          Log Out
        </a>
      </div>

      {/* Stats Overview */}
      {stats && (
        <div className="glass-light rounded-3xl p-8" style={{ opacity: 0 }}>
          <h2 className="text-xl font-display font-bold mb-6">Library Overview</h2>

          {/* Summary bar */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 rounded-2xl bg-surface-900/50">
              <div className="text-3xl font-display font-bold gradient-text">
                {stats.totalItems}
              </div>
              <div className="text-xs text-surface-500 mt-1">Total Items</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-surface-900/50">
              <div className="text-3xl font-display font-bold text-green-400">
                {stats.completed}
              </div>
              <div className="text-xs text-surface-500 mt-1">Completed</div>
            </div>
            <div className="text-center p-4 rounded-2xl bg-surface-900/50">
              <div className="text-3xl font-display font-bold text-blue-400">
                {stats.inProgress}
              </div>
              <div className="text-xs text-surface-500 mt-1">In Progress</div>
            </div>
          </div>

          {/* Per-type breakdown */}
          <div className="space-y-3">
            {mediaTypes.map(({ key, type }) => {
              const config = MEDIA_TYPE_CONFIG[type];
              const count = stats[key] as number;
              const percentage = stats.totalItems > 0 ? (count / stats.totalItems) * 100 : 0;
              return (
                <div key={key} className="flex items-center gap-4">
                  <span className="text-xl w-8">{config.icon}</span>
                  <span className="text-sm font-medium w-20">{config.label}</span>
                  <div className="flex-1 h-2 bg-surface-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: config.color,
                      }}
                    />
                  </div>
                  <span className="text-sm text-surface-400 w-8 text-right">
                    {count}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="glass-light rounded-3xl p-8" style={{ opacity: 0 }}>
        <h2 className="text-xl font-display font-bold mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/library"
            className="p-4 rounded-2xl bg-surface-900/50 hover:bg-surface-800/50 transition-colors flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-brand-600/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              📚
            </div>
            <div>
              <div className="font-semibold text-sm">Browse Library</div>
              <div className="text-xs text-surface-500">
                View and manage your collection
              </div>
            </div>
          </a>
          <a
            href="/library"
            className="p-4 rounded-2xl bg-surface-900/50 hover:bg-surface-800/50 transition-colors flex items-center gap-4 group"
          >
            <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              ➕
            </div>
            <div>
              <div className="font-semibold text-sm">Add New Item</div>
              <div className="text-xs text-surface-500">
                Add a movie, show, game, or more
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
