import LinearHeader from "@/components/prismui/linear-header";
import LinearHero from "@/components/prismui/linear-hero";
import LinearHeroLogos from "@/components/prismui/linear-hero-logos";
import LinearFeatures from "@/components/prismui/linear-features";
import LinearProductFeatures from "@/components/prismui/linear-product-features";
import LinearTimeline from "@/components/prismui/linear-timeline";
import LinearFooter from "@/components/prismui/linear-footer";

export default function LinearHeroTest() {
  return (
    <div className="min-h-screen">
      <LinearHeader />
      <LinearHero />
      <LinearHeroLogos />
      <LinearFeatures />
      <LinearProductFeatures />
      <LinearTimeline />
      <LinearFooter />
    </div>
  );
}
