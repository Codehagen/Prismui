import { TweetCard } from "@/components/prismui/tweet-card";

export default function TweetCardBasic() {
  return (
    <div className="flex flex-col gap-4">
      <TweetCard id="1875639011454361860" />
      <TweetCard id="1875639011454361860" compact hideMedia />
    </div>
  );
}

export const demoSource = `import { TweetCard } from "@/components/prismui/tweet-card"

export default function TweetCardBasic() {
  return (
    <div className="flex flex-col gap-4">
      <TweetCard id="1875639011454361860" />
      <TweetCard id="1875639011454361860" compact hideMedia />
    </div>
  )
}`;
