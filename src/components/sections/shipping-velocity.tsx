import { Suspense } from "react";
import { ShippingVelocityContent } from "./shipping-velocity-client";
import { getRepoActivity } from "@/app/actions/github";
import { allDocsPosts } from "content-collections";

export async function ShippingVelocity() {
  const stats = await getRepoActivity();
  const now = new Date();
  const componentDates = allDocsPosts
    .filter((doc) => doc.slug.startsWith("components/"))
    .filter((doc) => new Date(doc.publishedAt) <= now)
    .map((doc) => ({
      name: doc.title,
      publishedAt: doc.publishedAt,
    }));

  return (
    <Suspense
      fallback={
        <ShippingVelocityContent
          stats={{
            openPRs: 0,
            mergedPRs: 0,
            openIssues: 0,
            closedIssues: 0,
            lastUpdate: new Date().toISOString(),
          }}
          componentDates={[]}
        />
      }
    >
      <ShippingVelocityContent stats={stats} componentDates={componentDates} />
    </Suspense>
  );
}
