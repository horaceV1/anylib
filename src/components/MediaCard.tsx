"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MediaItem, MEDIA_TYPE_CONFIG, STATUS_CONFIG } from "@/lib/types";

interface MediaCardProps {
  item: MediaItem;
  index: number;
  onEdit?: (item: MediaItem) => void;
  onDelete?: (id: string) => void;
}

export default function MediaCard({ item, index, onEdit, onDelete }: MediaCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const config = MEDIA_TYPE_CONFIG[item.type];
  const statusConfig = STATUS_CONFIG[item.status];

  useEffect(() => {
    if (cardRef.current) {
      gsap.fromTo(
        cardRef.current,
        { y: 30, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: "power3.out",
        }
      );
    }
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="group glass-light rounded-2xl overflow-hidden card-hover cursor-pointer"
      style={{ opacity: 0 }}
    >
      {/* Cover Image */}
      <div className="relative aspect-[2/3] overflow-hidden bg-surface-900">
        {item.coverImage ? (
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {config.icon}
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-3 left-3 right-3 flex gap-2">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(item);
                }}
                className="flex-1 py-2 text-xs font-medium bg-white/10 hover:bg-white/20 rounded-lg backdrop-blur-sm transition-colors"
              >
                Edit
              </button>
            )}
            {onDelete && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(item.id);
                }}
                className="py-2 px-3 text-xs font-medium bg-red-500/20 hover:bg-red-500/40 text-red-300 rounded-lg backdrop-blur-sm transition-colors"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Type badge */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-medium backdrop-blur-sm"
          style={{ backgroundColor: `${config.color}30`, color: config.color }}
        >
          {config.icon} {config.label.slice(0, -1)}
        </div>

        {/* Rating */}
        {item.rating && (
          <div className="absolute top-3 right-3 px-2 py-1 rounded-md text-xs font-bold bg-black/50 backdrop-blur-sm text-yellow-400">
            ★ {item.rating}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-semibold text-sm truncate">{item.title}</h3>
        <div className="flex items-center justify-between mt-2">
          {item.creator && (
            <p className="text-xs text-surface-500 truncate flex-1">
              {item.creator}
            </p>
          )}
          {item.year && (
            <span className="text-xs text-surface-600 ml-2">{item.year}</span>
          )}
        </div>
        <div className="mt-3 flex items-center gap-2">
          <span
            className="inline-block px-2 py-0.5 rounded-full text-[10px] font-medium"
            style={{
              backgroundColor: `${statusConfig.color}20`,
              color: statusConfig.color,
            }}
          >
            {statusConfig.label}
          </span>
          {item.genre?.slice(0, 2).map((g) => (
            <span
              key={g}
              className="text-[10px] px-2 py-0.5 rounded-full bg-surface-800 text-surface-400"
            >
              {g}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
