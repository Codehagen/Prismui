import { TweetCard } from "@/components/prismui/tweet-card";

export default function TestPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="mb-8 text-2xl font-bold">Tweet Card Examples</h1>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Example tweet with text and image */}
        <TweetCard id="1875639011454361860" className="2xl shadow-lg" />

        {/* Let's try another tweet for testing */}
        <TweetCard id="1866221674217312605" hideMedia />

        {/* And one more for good measure */}
        <TweetCard
          id="1862037209341149322"
          className="2xl shadow-lg"
          iconVariant="x"
        />
      </div>
    </div>
  );
}
