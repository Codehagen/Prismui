import { TweetCard } from "@/components/prismui/tweet-card";
import { cn } from "@/lib/utils";

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

export default function TestimonialTweet() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Tweet Integration</h3>
      <div className="space-y-6">
        <ScrollingTweetRow direction="left" />
        <ScrollingTweetRow direction="right" />
      </div>
    </div>
  );
}

export const demoSource = `import { TweetCard } from "@/components/prismui/tweet-card";
import { cn } from "@/lib/utils";

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

export default function TestimonialTweet() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Tweet Integration</h3>
      <div className="space-y-6">
        <ScrollingTweetRow direction="left" />
        <ScrollingTweetRow direction="right" />
      </div>
    </div>
  );
}`;
