import { allDocs } from "contentlayer/generated";

interface ComponentDate {
  name: string;
  publishedAt: string;
}

export async function getComponentDates(): Promise<ComponentDate[]> {
  try {
    // Filter docs to only get component pages and extract their dates
    const componentDocs = allDocs.filter((doc) =>
      doc._raw.sourceFilePath.includes("/components/")
    );

    return componentDocs.map((doc) => ({
      name: doc.title,
      publishedAt:
        doc.publishedAt || doc._raw.sourceFileLastModified.toISOString(),
    }));
  } catch (error) {
    console.error("Error fetching component dates:", error);
    return [];
  }
}
