import { ProHeader } from "@/components/pro/header";
import { ProFooter } from "@/components/pro/footer";

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <ProHeader />
      <main className="flex-1">{children}</main>
      <ProFooter />
    </div>
  );
}
