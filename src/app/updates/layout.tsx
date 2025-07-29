import { constructMetadata } from "@/lib/utils";

export const metadata = constructMetadata({
  title: "Updates - PrismUI",
  description: "Stay up to date with the latest news, features, and updates from PrismUI. Join our Discord community for real-time updates.",
  canonical: "https://www.prismui.tech/updates",
});

export default function UpdatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}