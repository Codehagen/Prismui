import {
  Highlight,
  TestimonialSection,
} from "@/components/prismui/testimonial-card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Frontend Developer at TechFlow",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    description: (
      <p>
        <Highlight>PrismUI&apos;s components</Highlight> have transformed our
        development workflow. The{" "}
        <Highlight>motion-based animations and interactions</Highlight> are
        incredibly smooth, and the documentation is top-notch. It&apos;s cut our
        UI development time in half!
      </p>
    ),
  },
  {
    name: "Marcus Rodriguez",
    role: "UI/UX Lead at DesignScale",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    description: (
      <p>
        The attention to detail in{" "}
        <Highlight>PrismUI&apos;s design system</Highlight> is remarkable.
        <Highlight>Every component feels polished and cohesive</Highlight>. The
        dark mode implementation and accessibility features are exactly what we
        needed.
      </p>
    ),
  },
  {
    name: "Emma Thompson",
    role: "Product Manager at StartupForge",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
    description: (
      <p>
        Switching to <Highlight>PrismUI</Highlight> was a game-changer for our
        team. The{" "}
        <Highlight>seamless integration with Next.js and TypeScript</Highlight>{" "}
        means we can focus on building features instead of fighting with UI
        bugs.
      </p>
    ),
  },
  {
    name: "David Kim",
    role: "CTO at WebScale Solutions",
    img: "https://randomuser.me/api/portraits/men/4.jpg",
    description: (
      <p>
        <Highlight>PrismUI&apos;s performance optimizations</Highlight> are
        impressive. The{" "}
        <Highlight>server components and progressive enhancement</Highlight>{" "}
        approach has significantly improved our core web vitals. A must-have for
        modern web apps.
      </p>
    ),
  },
  {
    name: "Sophia Patel",
    role: "Frontend Architect at InnovateLabs",
    img: "https://randomuser.me/api/portraits/women/5.jpg",
    description: (
      <p>
        The flexibility of{" "}
        <Highlight>PrismUI&apos;s component system</Highlight> is unmatched.
        <Highlight>Customization is intuitive</Highlight>, and the Tailwind
        integration makes styling a breeze. It&apos;s become our go-to UI
        library.
      </p>
    ),
  },
];

export default function TestimonialPage() {
  return (
    <div className="container mx-auto py-10 space-y-32">
      <div>
        <h1 className="mb-8 text-3xl font-bold">Manual Scroll (Minimal)</h1>
        <TestimonialSection testimonials={testimonials} variant="scroll" />
      </div>

      <div>
        <h1 className="mb-8 text-3xl font-bold">Auto-Scroll (Minimal)</h1>
        <TestimonialSection
          testimonials={testimonials}
          variant="scroll"
          autoScroll
          direction="right"
          pauseOnHover
        />
      </div>

      <div>
        <h1 className="mb-8 text-3xl font-bold">Grid Layout (Modern)</h1>
        <TestimonialSection
          testimonials={testimonials}
          variant="grid"
          columns={3}
        />
      </div>
    </div>
  );
}
