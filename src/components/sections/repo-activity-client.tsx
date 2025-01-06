"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";

interface RepoStats {
  openPRs: number;
  mergedPRs: number;
  openIssues: number;
  closedIssues: number;
  lastUpdate: string;
}

function ActivityCard({
  icon: Icon,
  title,
  value,
  description,
}: {
  icon: any;
  title: string;
  value: number;
  description: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true }}
    >
      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-muted-foreground">
              {title}
            </h3>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold">{value}</span>
              <span className="text-sm text-muted-foreground sm:text-nowrap sm:line-clamp-none line-clamp-1">
                {description}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export function RepoActivityContent({ stats }: { stats: RepoStats }) {
  return (
    <section className="container py-20">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            Active Development
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Our repository is actively maintained with regular updates, fixes,
            and new features
          </p>
        </motion.div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
        <ActivityCard
          icon={Icons.github}
          title="Open Pull Requests"
          value={stats.openPRs}
          description="waiting for review"
        />
        <ActivityCard
          icon={Icons.github}
          title="Merged Pull Requests"
          value={stats.mergedPRs}
          description="successfully merged"
        />
        <ActivityCard
          icon={Icons.github}
          title="Open Issues"
          value={stats.openIssues}
          description="to be resolved"
        />
        <ActivityCard
          icon={Icons.github}
          title="Closed Issues"
          value={stats.closedIssues}
          description="successfully resolved"
        />
      </div>
    </section>
  );
}
