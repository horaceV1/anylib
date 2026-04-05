"use client";

import AnimatedSection from "@/components/AnimatedSection";

const features = [
  {
    icon: "📚",
    title: "Universal Library",
    description:
      "Track movies, shows, games, books, albums, and any other media in one beautiful place.",
  },
  {
    icon: "🏷️",
    title: "Smart Organization",
    description:
      "Filter by type, status, genre, and rating. Search across your entire collection instantly.",
  },
  {
    icon: "⭐",
    title: "Rate & Review",
    description:
      "Rate everything on a 1-10 scale and add personal notes to remember your thoughts.",
  },
  {
    icon: "📊",
    title: "Library Stats",
    description:
      "See beautiful breakdowns of your library — how many movies, games, books and more at a glance.",
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description:
      "Your library is yours. Secured with Auth0 authentication and tied to your personal account.",
  },
  {
    icon: "✨",
    title: "Beautiful Design",
    description:
      "Smooth animations, dark theme, and a modern glass-morphism UI that feels premium.",
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Everything you need to{" "}
            <span className="gradient-text">track it all</span>
          </h2>
          <p className="mt-4 text-surface-400 max-w-xl mx-auto">
            anylib gives you the tools to catalog your entire media consumption
            in a way that&apos;s beautiful, fast, and personal.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <div className="glass-light rounded-2xl p-6 h-full card-hover">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-surface-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
