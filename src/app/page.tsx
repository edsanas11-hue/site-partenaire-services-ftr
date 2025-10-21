import dynamic from "next/dynamic";
import Hero from "@/components/Hero";
import StatsSection from "@/components/StatsSection";

// Lazy load components that are below the fold
const ChallengesSection = dynamic(() => import("@/components/ChallengesSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
});
const FeaturesSection = dynamic(() => import("@/components/FeaturesSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
});
const TrustedClientsSection = dynamic(() => import("@/components/TrustedClientsSection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
});
const CTASection = dynamic(() => import("@/components/CTASection"), {
  loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
});

export default function Home() {
  return (
    <>
      <Hero />
      <StatsSection />
      <ChallengesSection />
      <FeaturesSection />
      <TrustedClientsSection />
      <CTASection />
    </>
  );
}