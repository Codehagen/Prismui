import { redirect } from "next/navigation";

export default function ProPage() {
  // This is a placeholder - pro content will be gitignored
  // In production, this would contain the actual pro landing page
  
  if (process.env.NODE_ENV === "production" && !process.env.PRO_ENABLED) {
    redirect("/");
  }

  return (
    <div className="container mx-auto py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-8">PrismUI Pro</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Premium components and features for professional projects.
        </p>
        <div className="text-sm text-muted-foreground">
          <p>This is a placeholder page. Pro content is excluded from the open source repository.</p>
          <p className="mt-2">To enable pro features, set PRO_ENABLED=true in your environment.</p>
        </div>
      </div>
    </div>
  );
}