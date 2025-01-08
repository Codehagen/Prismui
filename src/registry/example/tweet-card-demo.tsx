import { TweetCard } from "@/components/prismui/tweet-card";

export default function TweetCardDemo() {
  return (
    <div className="flex justify-center items-center">
      <TweetCard id="1866221674217312605" />
    </div>
  );
}

export const demoSource = `import { TweetCard } from "@/components/prismui/tweet-card"

export default function TweetCardDemo() {
  return (
    <div className="max-w-xl mx-auto">
      <TweetCard id="1866221674217312605" hideMedia />
    </div>
  )
}`;
