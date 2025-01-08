import { TweetCard } from "@/components/prismui/tweet-card";

export default function TweetCardX() {
  return (
    <div className="flex justify-center items-center">
      <TweetCard id="1875639011454361860" iconVariant="x" />
    </div>
  );
}

export const demoSource = `import { TweetCard } from "@/components/prismui/tweet-card"

export default function TweetCardX() {
  return (
    <div className="flex justify-center items-center">
      <TweetCard id="1875639011454361860" iconVariant="x" />
    </div>
  )
}`;
