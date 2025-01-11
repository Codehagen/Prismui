import { TestimonialSection } from "@/components/prismui/testimonial-card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer at TechFlow",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    description: (
      <p>
        PrismUI&apos;s components have transformed our development workflow. The
        motion-based animations and interactions are incredibly smooth.
      </p>
    ),
  },
  {
    name: "Marcus Rodriguez",
    role: "UI/UX Lead at DesignScale",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    description: (
      <p>
        The attention to detail in PrismUI&apos;s design system is remarkable.
        Every component feels polished and cohesive. The dark mode
        implementation and accessibility features are exactly what we needed.
      </p>
    ),
  },
  {
    name: "Emma Thompson",
    role: "Product Manager at StartupForge",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
    description: (
      <p>
        Switching to PrismUI was a game-changer for our team. The seamless
        integration with Next.js and TypeScript means we can focus on building
        features instead of fighting with UI bugs.
      </p>
    ),
  },
];

export default function TestimonialScroll() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Manual Scroll</h3>
      <TestimonialSection testimonials={testimonials} variant="scroll" />
    </div>
  );
}

export const demoSource = `import { TestimonialSection } from "@/components/prismui/testimonial-card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer at TechFlow",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    description: (
      <p>
        PrismUI's components have transformed our development workflow. The
        motion-based animations and interactions are incredibly smooth.
      </p>
    ),
  },
  // ... more testimonials
];

export default function TestimonialScroll() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Manual Scroll</h3>
      <TestimonialSection testimonials={testimonials} variant="scroll" />
    </div>
  );
}`;
