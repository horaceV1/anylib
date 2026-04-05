"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { LibraryStats, MEDIA_TYPE_CONFIG, MediaType } from "@/lib/types";

interface StatsGridProps {
  stats: LibraryStats;
}

export default function StatsGrid({ stats }: StatsGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 20, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }
  }, [stats]);

  const mediaTypes: { key: keyof LibraryStats; type: MediaType }[] = [
    { key: "movies", type: "movie" },
    { key: "shows", type: "show" },
    { key: "games", type: "game" },
    { key: "books", type: "book" },
    { key: "albums", type: "album" },
    { key: "other", type: "other" },
  ];

  return (
    <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {mediaTypes.map(({ key, type }) => {
        const config = MEDIA_TYPE_CONFIG[type];
        return (
          <div
            key={key}
            className="glass-light rounded-2xl p-4 text-center card-hover"
            style={{ opacity: 0 }}
          >
            <div className="text-2xl mb-2">{config.icon}</div>
            <div className="text-2xl font-display font-bold" style={{ color: config.color }}>
              {stats[key]}
            </div>
            <div className="text-xs text-surface-500 mt-1">{config.label}</div>
          </div>
        );
      })}
    </div>
  );
}
