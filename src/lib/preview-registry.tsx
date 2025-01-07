import TweetCardBasic, {
  demoSource as TweetCardBasicSource,
} from "@/registry/example/tweet-card-basic";
import TweetCardDemo, {
  demoSource as TweetCardDemoSource,
} from "@/registry/example/tweet-card-demo";
import TweetCardX, {
  demoSource as TweetCardXSource,
} from "@/registry/example/tweet-card-x-con";
import TweetCardHidden, {
  demoSource as TweetCardHiddenSource,
} from "@/registry/example/tweet-card-hidden";
import TweetCardCompact, {
  demoSource as TweetCardCompactSource,
} from "@/registry/example/tweet-card-compact";

export const previewRegistry = {
  "tweet-card-basic": {
    component: TweetCardBasic,
    source: TweetCardBasicSource,
  },
  "tweet-card-demo": {
    component: TweetCardDemo,
    source: TweetCardDemoSource,
  },
  "tweet-card-x-con": {
    component: TweetCardX,
    source: TweetCardXSource,
  },
  "tweet-card-hidden": {
    component: TweetCardHidden,
    source: TweetCardHiddenSource,
  },
  "tweet-card-compact": {
    component: TweetCardCompact,
    source: TweetCardCompactSource,
  },
} as const;

export type PreviewRegistryKeys = keyof typeof previewRegistry;
