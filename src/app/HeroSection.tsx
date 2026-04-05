"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function HeroSection({ isLoggedIn }: { isLoggedIn: boolean }) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      titleRef.current,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        subtitleRef.current,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      )
      .fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(
        gridRef.current?.children || [],
        { y: 40, opacity: 0, scale: 0.9 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, stagger: 0.1 },
        "-=0.3"
      );

    // Floating animation for the preview cards
    if (gridRef.current) {
      Array.from(gridRef.current.children).forEach((child, i) => {
        gsap.to(child, {
          y: -8 + (i % 2 === 0 ? 0 : 8),
          duration: 2 + i * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2,
        });
      });
    }
  }, []);

  const previewItems = [
    { emoji: "🎬", title: "Inception", sub: "Christopher Nolan", color: "#ef4444" },
    { emoji: "📚", title: "Dune", sub: "Frank Herbert", color: "#f59e0b" },
    { emoji: "🎮", title: "Elden Ring", sub: "FromSoftware", color: "#10b981" },
    { emoji: "🎵", title: "Kid A", sub: "Radiohead", color: "#ec4899" },
    { emoji: "📺", title: "Breaking Bad", sub: "Vince Gilligan", color: "#8b5cf6" },
    { emoji: "📦", title: "D&D 5e", sub: "Wizards of the Coast", color: "#6b7280" },
  ];

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-16 overflow-hidden"
    >
      {/* Background gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl font-display font-bold tracking-tight leading-tight"
          style={{ opacity: 0 }}
        >
          Your entire media life,{" "}
          <span className="gradient-text">beautifully organized</span>
        </h1>

        <p
          ref={subtitleRef}
          className="mt-6 text-lg md:text-xl text-surface-400 max-w-2xl mx-auto leading-relaxed"
          style={{ opacity: 0 }}
        >
          Track movies, shows, games, books, albums, and anything else you love.
          One library, all your memories.
        </p>

        <div ref={ctaRef} className="mt-10 flex items-center justify-center gap-4" style={{ opacity: 0 }}>
          {isLoggedIn ? (
            <a
              href="/library"
              className="px-8 py-4 bg-brand-600 hover:bg-brand-500 rounded-2xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
            >
              Go to Library →
            </a>
          ) : (
            <>
              <a
                href="/auth/login?screen_hint=signup"
                className="px-8 py-4 bg-brand-600 hover:bg-brand-500 rounded-2xl text-sm font-semibold transition-all hover:scale-105 active:scale-95"
              >
                Get Started — It&apos;s Free
              </a>
              <a
                href="/auth/login"
                className="px-8 py-4 glass rounded-2xl text-sm font-semibold transition-all hover:bg-surface-800/50"
              >
                Log In
              </a>
            </>
          )}
        </div>
      </div>

      {/* Preview cards */}
      <div
        ref={gridRef}
        className="mt-20 grid grid-cols-3 md:grid-cols-6 gap-4 max-w-4xl mx-auto w-full relative z-10"
      >
        {previewItems.map((item) => (
          <div
            key={item.title}
            className="glass-light rounded-2xl p-4 text-center"
            style={{ opacity: 0 }}
          >
            <div className="text-3xl mb-2">{item.emoji}</div>
            <div className="text-xs font-semibold truncate">{item.title}</div>
            <div className="text-[10px] text-surface-500 truncate mt-1">
              {item.sub}
            </div>
            <div
              className="mt-2 h-1 rounded-full mx-auto w-8"
              style={{ backgroundColor: item.color }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
