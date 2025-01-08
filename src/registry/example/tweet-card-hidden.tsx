import { TweetCard } from "@/components/prismui/tweet-card";

export default function TweetCardHidden() {
  return (
    <div className="flex justify-center items-center">
      <TweetCard id="1875639011454361860" hideMedia />
    </div>
  );
}

export const demoSource = `import { TweetCard } from "@/components/prismui/tweet-card"

export default function TweetCardHidden() {
  return (
    <div className="flex justify-center items-center">
      <TweetCard id="1875639011454361860" hideMedia />
    </div>
  )
}`;
