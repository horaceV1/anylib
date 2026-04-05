"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";

export default function Navbar({
  user,
}: {
  user?: { name?: string; picture?: string; email?: string } | null;
}) {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }
      );
    }
  }, []);

  return (
    <nav ref={navRef} className="glass fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
            a
          </div>
          <span className="text-lg font-display font-bold tracking-tight">
            any<span className="gradient-text">lib</span>
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                href="/library"
                className="text-sm text-surface-400 hover:text-white transition-colors"
              >
                Library
              </Link>
              <Link
                href="/profile"
                className="text-sm text-surface-400 hover:text-white transition-colors"
              >
                Profile
              </Link>
              <div className="flex items-center gap-3 ml-2">
                {user.picture ? (
                  <img
                    src={user.picture}
                    alt={user.name || "User"}
                    className="w-8 h-8 rounded-full ring-2 ring-brand-500/30"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold">
                    {user.name?.charAt(0) || "U"}
                  </div>
                )}
                <a
                  href="/auth/logout"
                  className="text-sm text-surface-500 hover:text-red-400 transition-colors"
                >
                  Log out
                </a>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <a
                href="/auth/login"
                className="text-sm text-surface-400 hover:text-white transition-colors"
              >
                Log in
              </a>
              <a
                href="/auth/login?screen_hint=signup"
                className="text-sm px-4 py-2 bg-brand-600 hover:bg-brand-500 rounded-lg transition-colors font-medium"
              >
                Sign up
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
