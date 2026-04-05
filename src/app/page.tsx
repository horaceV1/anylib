import { auth0 } from "@/lib/auth0";
import Navbar from "@/components/Navbar";
import HeroSection from "./HeroSection";
import FeaturesSection from "./FeaturesSection";

export default async function Home() {
  const session = await auth0.getSession();

  return (
    <>
      <Navbar user={session?.user} />
      <main>
        <HeroSection isLoggedIn={!!session} />
        <FeaturesSection />
        {/* Footer */}
        <footer className="border-t border-surface-800/50 py-12 mt-20">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-gradient-to-br from-brand-500 to-purple-500 flex items-center justify-center text-[10px] font-bold">
                a
              </div>
              <span className="text-sm font-display font-semibold">
                any<span className="gradient-text">lib</span>
              </span>
            </div>
            <p className="text-xs text-surface-600">
              © {new Date().getFullYear()} anylib. Your universal media library.
            </p>
          </div>
        </footer>
      </main>
    </>
  );
}
