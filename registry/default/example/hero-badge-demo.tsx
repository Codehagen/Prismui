import HeroBadge from "@/components/prismui/hero-badge";
import { Icons } from "@/components/icons";

export default function HeroBadgeDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <HeroBadge
            href="/docs"
            text="Default Badge"
            icon={<Icons.logo className="h-4 w-4" />}
            endIcon={<Icons.chevronRight className="h-4 w-4" />}
          />
          <HeroBadge
            href="/docs"
            text="Outline Badge"
            variant="outline"
            icon={<Icons.component className="h-4 w-4" />}
            endIcon={<Icons.chevronRight className="h-4 w-4" />}
          />
          <HeroBadge
            href="/docs"
            text="Ghost Badge"
            variant="ghost"
            icon={<Icons.book className="h-4 w-4" />}
            endIcon={<Icons.chevronRight className="h-4 w-4" />}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <HeroBadge
            text="Small Badge"
            size="sm"
            icon={<Icons.logo className="h-3 w-3" />}
            onClick={() => alert("Clicked!")}
          />
          <HeroBadge
            text="Medium Badge"
            size="md"
            icon={<Icons.logo className="h-4 w-4" />}
            onClick={() => alert("Clicked!")}
          />
          <HeroBadge
            text="Large Badge"
            size="lg"
            icon={<Icons.logo className="h-5 w-5" />}
            onClick={() => alert("Clicked!")}
          />
        </div>
      </div>
    </div>
  );
}

export const demoSource = `import HeroBadge from "@/components/prismui/hero-badge"
import { Icons } from "@/components/icons"

export default function HeroBadgeDemo() {
  return (
    <div className="flex min-h-[350px] w-full items-center justify-center">
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap gap-4">
          <HeroBadge
            href="/docs"
            text="Default Badge"
            icon={<Icons.logo className="h-4 w-4" />}
            endIcon={<Icons.chevronRight className="h-4 w-4" />}
          />
          <HeroBadge
            href="/docs"
            text="Outline Badge"
            variant="outline"
            icon={<Icons.component className="h-4 w-4" />}
            endIcon={<Icons.chevronRight className="h-4 w-4" />}
          />
          <HeroBadge
            href="/docs"
            text="Ghost Badge"
            variant="ghost"
            icon={<Icons.book className="h-4 w-4" />}
            endIcon={<Icons.chevronRight className="h-4 w-4" />}
          />
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <HeroBadge
            text="Small Badge"
            size="sm"
            icon={<Icons.logo className="h-3 w-3" />}
            onClick={() => alert("Clicked!")}
          />
          <HeroBadge
            text="Medium Badge"
            size="md"
            icon={<Icons.logo className="h-4 w-4" />}
            onClick={() => alert("Clicked!")}
          />
          <HeroBadge
            text="Large Badge"
            size="lg"
            icon={<Icons.logo className="h-5 w-5" />}
            onClick={() => alert("Clicked!")}
          />
        </div>
      </div>
    </div>
  )
}`;
