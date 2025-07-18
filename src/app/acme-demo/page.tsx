"use client";

import Navbar from "@/components/acme/layout/navbar";
import HeroSection from "@/components/acme/sections/hero-section";
import LogoSection from "@/components/acme/sections/logo-section";
import FeaturesSection from "@/components/acme/sections/features-section";
import ProductShowcase from "@/components/acme/sections/product-showcase";
import RoadmapSection from "@/components/acme/sections/roadmap-section";
import FooterSection from "@/components/acme/layout/footer-section";

export default function AcmeDemoPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <LogoSection />
        <FeaturesSection />
        <ProductShowcase />
        <RoadmapSection />
      </main>
      <FooterSection />
    </div>
  );
}