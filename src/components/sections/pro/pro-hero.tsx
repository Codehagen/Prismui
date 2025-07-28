import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { isAuthenticated, hasProAccess } from "@/lib/pro/auth/user-actions";
import { ProHeroPill } from "./pro-hero-pill";
import { ProHeroContent } from "./pro-hero-content";
import { ProProductShowcase } from "./pro-product-showcase";

export async function ProHero() {
  const isAuth = await isAuthenticated();
  const hasPro = await hasProAccess();

  return (
    <section className="relative overflow-hidden">
      {/* Background effects - commented out */}
      {/* <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-purple-500/10 blur-[100px] rounded-full" />
      </div> */}
      
      <div className="pt-24 md:pt-36">
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <div>
            <ProHeroPill />
            <ProHeroContent isAuth={isAuth} hasPro={hasPro} />
          </div>
          <ProProductShowcase />
        </div>
      </div>
    </section>
  );
}
