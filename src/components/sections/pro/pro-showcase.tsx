import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Rocket,
  Code2,
  Palette,
  Zap,
  Shield,
  Sparkles
} from "lucide-react";

export function ProShowcase() {
  return (
    <section>
      <div className="py-24">
        <div className="mx-auto w-full max-w-5xl px-6">
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Rocket className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-primary">Features</span>
            </div>
            <h2 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Ship Professional Apps in <span className="text-muted-foreground">Record Time</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
              PrismUI Pro gives you battle-tested components and templates to build 
              production-ready applications. Focus on your business logic, not UI implementation.
            </p>
          </div>

          {/* Visual showcase */}
          <div className="relative mt-16 md:mt-20">
              {/* Background pattern */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-3xl" />
              
              {/* Main showcase container */}
              <div className="relative rounded-3xl border bg-background/50 backdrop-blur-sm p-8 shadow-2xl">
                {/* Code to Component visualization */}
                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Code side */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Code2 className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">Your Code</span>
                    </div>
                    <Card className="bg-muted/50 p-4 font-mono text-sm">
                      <div className="space-y-2">
                        <div className="text-muted-foreground">{'// Import premium components'}</div>
                        <div><span className="text-blue-600">import</span> {'{'} DataTable {'}'} <span className="text-blue-600">from</span> <span className="text-green-600">'@prismui/pro'</span></div>
                        <div><span className="text-blue-600">import</span> {'{'} Analytics {'}'} <span className="text-blue-600">from</span> <span className="text-green-600">'@prismui/charts'</span></div>
                        <div className="text-muted-foreground">{'// Ready to use!'}</div>
                      </div>
                    </Card>
                  </div>

                  {/* Component side */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Palette className="h-5 w-5 text-muted-foreground" />
                      <span className="text-sm font-medium">Your Result</span>
                    </div>
                    <div className="space-y-3">
                      {/* Mini component previews */}
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-primary/10" />
                            <div>
                              <p className="text-sm font-medium">Analytics Dashboard</p>
                              <p className="text-xs text-muted-foreground">Real-time data</p>
                            </div>
                          </div>
                          <Badge variant="secondary" className="text-xs">Live</Badge>
                        </div>
                      </Card>
                      
                      <Card className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded bg-primary/10" />
                            <div>
                              <p className="text-sm font-medium">Data Tables</p>
                              <p className="text-xs text-muted-foreground">Sort & filter</p>
                            </div>
                          </div>
                          <Sparkles className="h-4 w-4 text-primary" />
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>

                {/* Feature badges */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4" />
                    <span>Lightning Fast</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Type Safe</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Palette className="h-4 w-4" />
                    <span>Fully Customizable</span>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </section>
  );
}