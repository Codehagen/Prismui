"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { Suspense } from "react";

interface RepoStats {
  openPRs: number;
  mergedPRs: number;
  openIssues: number;
  closedIssues: number;
  lastUpdate: string;
}

async function getRepoActivity(): Promise<RepoStats> {
  try {
    const [prsResponse, issuesResponse] = await Promise.all([
      fetch("https://api.github.com/repos/codehagen/prismui/pulls?state=all", {
        ...(process.env.GITHUB_OAUTH_TOKEN && {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }),
        next: { revalidate: 3600 },
      }),
      fetch("https://api.github.com/repos/codehagen/prismui/issues?state=all", {
        ...(process.env.GITHUB_OAUTH_TOKEN && {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_OAUTH_TOKEN}`,
            "Content-Type": "application/json",
          },
        }),
        next: { revalidate: 3600 },
      }),
    ]);

    if (!prsResponse.ok || !issuesResponse.ok) {
      return {
        openPRs: 0,
        mergedPRs: 0,
        openIssues: 0,
        closedIssues: 0,
        lastUpdate: new Date().toISOString(),
      };
    }

    const prs = await prsResponse.json();
    const issues = await issuesResponse.json();

    return {
      openPRs: prs.filter((pr: any) => pr.state === "open").length,
      mergedPRs: prs.filter((pr: any) => pr.state === "closed" && pr.merged_at)
        .length,
      openIssues: issues.filter(
        (issue: any) => issue.state === "open" && !issue.pull_request
      ).length,
      closedIssues: issues.filter(
        (issue: any) => issue.state === "closed" && !issue.pull_request
      ).length,
      lastUpdate: new Date().toISOString(),
    };
  } catch (error) {
    return {
      openPRs: 0,
      mergedPRs: 0,
      openIssues: 0,
      closedIssues: 0,
      lastUpdate: new Date().toISOString(),
    };
  }
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
              <span className="text-sm text-muted-foreground">
                {description}
              </span>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function RepoActivityContent({ stats }: { stats: RepoStats }) {
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

async function RepoActivityData() {
  const stats = await getRepoActivity();
  return <RepoActivityContent stats={stats} />;
}

export function RepoActivity() {
  return (
    <Suspense
      fallback={
        <RepoActivityContent
          stats={{
            openPRs: 0,
            mergedPRs: 0,
            openIssues: 0,
            closedIssues: 0,
            lastUpdate: new Date().toISOString(),
          }}
        />
      }
    >
      <RepoActivityData />
    </Suspense>
  );
}
