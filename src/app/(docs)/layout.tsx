import Footer from "@/components/sections/footer";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
