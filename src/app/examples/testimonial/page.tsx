import {
  Highlight,
  TestimonialSection,
  TestimonialCard,
} from "@/components/prismui/testimonial-card";
import { TweetCard } from "@/components/prismui/tweet-card";
import { cn } from "@/lib/utils";

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

const tweetIds = [
  "1875676743564140901",
  "1876013415875162179",
  "1875856235771432998",
  "1875695790540386402",
  "1875736259022483755",
  "1875708925649326196",
  "1875717532575003036",
  "1875682866488816068",
  "1876118162745528714",
];

function ScrollingTweetRow({
  direction = "right",
}: {
  direction?: "left" | "right";
}) {
  return (
    <div className="group flex overflow-hidden py-4 [--duration:120s] [--gap:1.5rem] [gap:var(--gap)]">
      {Array(2)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around [gap:var(--gap)]",
              "animate-testimonial-scroll",
              direction === "left" && "[animation-direction:reverse]",
              "group-hover:[animation-play-state:paused]"
            )}
          >
            {tweetIds.map((id, idx) => (
              <TweetCard key={idx} id={id} hideMedia />
            ))}
          </div>
        ))}
    </div>
  );
}

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

      <div>
        <h1 className="mb-8 text-3xl font-bold">Tweet Card Integration</h1>
        <div className="space-y-6">
          <ScrollingTweetRow direction="left" />
          <ScrollingTweetRow direction="right" />
        </div>
      </div>
    </div>
  );
}
