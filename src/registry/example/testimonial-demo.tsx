import { TestimonialSection } from "@/components/prismui/testimonial-card";
import { TweetCard } from "@/components/prismui/tweet-card";
import { cn } from "@/lib/utils";

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

const tweetIds = [
  "1875676743564140901",
  "1876013415875162179",
  "1875856235771432998",
  "1875695790540386402",
  "1875736259022483755",
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

export default function TestimonialDemo() {
  return (
    <div className="w-full space-y-32">
      <div>
        <h3 className="text-lg font-semibold mb-4">Manual Scroll</h3>
        <TestimonialSection testimonials={testimonials} variant="scroll" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Grid Layout</h3>
        <TestimonialSection
          testimonials={testimonials}
          variant="grid"
          columns={3}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tweet Integration</h3>
        <div className="space-y-6">
          <ScrollingTweetRow direction="left" />
          <ScrollingTweetRow direction="right" />
        </div>
      </div>
    </div>
  );
}

export const demoSource = `import { TestimonialSection } from "@/components/prismui/testimonial-card";
import { TweetCard } from "@/components/prismui/tweet-card";
import { cn } from "@/lib/utils";

// ... testimonials and tweetIds arrays

function ScrollingTweetRow({
  direction = "right",
}: {
  direction?: "left" | "right";
}) {
  return (
    <div className="group flex overflow-hidden py-4 [--duration:120s] [--gap:1.5rem] [gap:var(--gap)]">
      {Array(2).fill(0).map((_, i) => (
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

export default function TestimonialDemo() {
  return (
    <div className="w-full space-y-32">
      <div>
        <h3 className="text-lg font-semibold mb-4">Manual Scroll</h3>
        <TestimonialSection testimonials={testimonials} variant="scroll" />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Grid Layout</h3>
        <TestimonialSection
          testimonials={testimonials}
          variant="grid"
          columns={3}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Tweet Integration</h3>
        <div className="space-y-6">
          <ScrollingTweetRow direction="left" />
          <ScrollingTweetRow direction="right" />
        </div>
      </div>
    </div>
  );
}`;
