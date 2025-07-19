import Footer from "@/components/sections/footer";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/pro/auth/user-actions";

interface ProDocsLayoutProps {
  children: React.ReactNode;
}

export default async function ProDocsLayout({
  children,
}: ProDocsLayoutProps) {
  // Check if user is authenticated
  const user = await getCurrentUser();
  
  if (!user) {
    redirect("/pro/auth/login");
  }

  return (
    <>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
