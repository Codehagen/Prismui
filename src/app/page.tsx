import Hero from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { MainFeatures } from "@/components/sections/main-features";
import { GitHubStats } from "@/components/sections/github-stats";
import { RepoActivity } from "@/components/sections/repo-activity";
import { ShippingVelocity } from "@/components/sections/shipping-velocity";
import { SiteHeader } from "@/components/site-header";
import Footer from "@/components/sections/footer";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <Hero />
      <Features />
      <MainFeatures />
      <GitHubStats />
      <RepoActivity />
      <ShippingVelocity />
      <Footer />
    </main>
  );
}
