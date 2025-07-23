import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { isAuthenticated, hasProAccess } from "@/lib/pro/auth/user-actions";
import { ProHeroPill } from "./pro-hero-pill";

export async function ProHero() {
  const isAuth = await isAuthenticated();
  const hasPro = await hasProAccess();

  return (
    <section className="relative overflow-hidden">
      <div className="py-20 md:py-36">
        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
          <div>
            <ProHeroPill />
            <h1 className="mx-auto mt-8 max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Build 10x Faster with{" "}
              <span className="text-primary">PrismUI Pro</span>
            </h1>
            <p className="text-muted-foreground mx-auto my-6 max-w-xl text-balance text-xl">
              Premium React components, exclusive templates, and priority
              support. Ship professional applications faster than ever.
            </p>

            <div className="flex items-center justify-center gap-3">
              {isAuth && hasPro ? (
                <>
                  <Button asChild size="lg">
                    <Link href="/pro/docs">
                      <span className="text-nowrap">Browse Templates</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pro/components">
                      <span className="text-nowrap">View Components</span>
                    </Link>
                  </Button>
                </>
              ) : isAuth ? (
                <>
                  <Button asChild size="lg">
                    <Link href="/pro/upgrade">
                      <span className="text-nowrap">Upgrade to Pro</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pro/docs">
                      <span className="text-nowrap">Browse Docs</span>
                    </Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild size="lg">
                    <Link href="/pro/login">
                      <span className="text-nowrap">Start Free Trial</span>
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link href="/pro/login">
                      <span className="text-nowrap">Sign In</span>
                    </Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
