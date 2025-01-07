import { TweetCard } from "@/components/prismui/tweet-card";

export default function TweetCardCompact() {
  return (
    <div className="flex justify-center items-center">
      <TweetCard id="1875639011454361860" compact />
    </div>
  );
}

export const demoSource = `import { TweetCard } from "@/components/prismui/tweet-card"

export default function TweetCardCompact() {
  return (
    <div className="flex justify-center items-center">
      <TweetCard id="1875639011454361860" compact />
    </div>
  )
}`;
