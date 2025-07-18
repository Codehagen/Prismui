"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Zap, 
  GitBranch, 
  Calendar, 
  MessageSquare, 
  CheckCircle2, 
  Circle,
  AlertCircle,
  Clock,
  User,
  ChevronRight,
  Filter,
  Search
} from "lucide-react";

interface ProductShowcaseProps {
  className?: string;
}

export default function ProductShowcase({ className }: ProductShowcaseProps) {
  return (
    <section className={cn("relative py-24 bg-gradient-to-b from-background to-muted/20", className)}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
              Built for product teams
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From task management to project planning, Acme provides everything your team needs to collaborate effectively and ship faster.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Issue Tracking Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="bg-muted/30 backdrop-blur-sm rounded-2xl border border-border p-8"
          >
            <div className="mb-8">
              <TaskManagementDemo />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Smart task management</h3>
              <p className="text-muted-foreground text-lg">
                Create, assign, and track tasks with intelligent automation and instant search. Built for efficiency.
              </p>
            </div>
          </motion.div>

          {/* Roadmap Planning Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="bg-muted/30 backdrop-blur-sm rounded-2xl border border-border p-8"
          >
            <div className="mb-8">
              <RoadmapDemo />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-semibold mb-4">Strategic project planning</h3>
              <p className="text-muted-foreground text-lg">
                Plan initiatives, track progress, and align your team around shared goals with powerful analytics.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// Task Management Interactive Demo
const TaskManagementDemo = () => {
  const [selectedIssue, setSelectedIssue] = useState(0);
  
  const issues = [
    { id: "ACM-123", title: "Implement dark mode toggle", status: "in-progress", priority: "high", assignee: "Sarah" },
    { id: "ACM-124", title: "Fix mobile navigation bug", status: "pending", priority: "urgent", assignee: "Mike" },
    { id: "ACM-125", title: "Add keyboard shortcuts", status: "completed", priority: "medium", assignee: "Alex" },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed": return <CheckCircle2 className="w-4 h-4 text-green-500" />;
      case "in-progress": return <Clock className="w-4 h-4 text-blue-500" />;
      case "pending": return <Circle className="w-4 h-4 text-gray-500" />;
      default: return <AlertCircle className="w-4 h-4 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "urgent": return "bg-red-500";
      case "high": return "bg-orange-500";
      case "medium": return "bg-yellow-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="bg-background rounded-lg border border-border p-4 min-h-[300px]">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-500" />
          <span className="font-medium">Tasks</span>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
            <Filter className="w-4 h-4" />
          </button>
          <button className="p-1.5 hover:bg-muted rounded-md transition-colors">
            <Search className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Issues List */}
      <div className="space-y-2">
        {issues.map((issue, index) => (
          <motion.div
            key={issue.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={cn(
              "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 cursor-pointer",
              selectedIssue === index 
                ? "bg-blue-50 border-blue-200 dark:bg-blue-500/10 dark:border-blue-500/30" 
                : "bg-muted/50 border-border hover:bg-muted/80"
            )}
            onClick={() => setSelectedIssue(index)}
          >
            {getStatusIcon(issue.status)}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-mono text-muted-foreground">{issue.id}</span>
                <div className={cn("w-2 h-2 rounded-full", getPriorityColor(issue.priority))} />
              </div>
              <p className="text-sm font-medium truncate">{issue.title}</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="w-3 h-3 text-white" />
              </div>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="mt-4 pt-3 border-t border-border"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-mono">Cmd+K</span>
          <span>to create new task</span>
        </div>
      </motion.div>
    </div>
  );
};

// Roadmap Planning Interactive Demo
const RoadmapDemo = () => {
  const [activeQuarter, setActiveQuarter] = useState("Q1");
  
  const quarters = ["Q1", "Q2", "Q3", "Q4"];
  const roadmapItems = {
    Q1: [
      { name: "User Authentication", progress: 100, status: "completed" },
      { name: "Core Dashboard", progress: 75, status: "in-progress" },
      { name: "Mobile App", progress: 30, status: "in-progress" },
    ],
    Q2: [
      { name: "Advanced Analytics", progress: 0, status: "planned" },
      { name: "Team Collaboration", progress: 0, status: "planned" },
      { name: "API Integration", progress: 0, status: "planned" },
    ],
    Q3: [
      { name: "AI Features", progress: 0, status: "planned" },
      { name: "Enterprise Tools", progress: 0, status: "planned" },
    ],
    Q4: [
      { name: "Performance Optimization", progress: 0, status: "planned" },
      { name: "Security Enhancements", progress: 0, status: "planned" },
    ],
  };

  return (
    <div className="bg-background rounded-lg border border-border p-4 min-h-[300px]">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-purple-500" />
          <span className="font-medium">Product Roadmap</span>
        </div>
        <div className="text-sm text-muted-foreground">2024</div>
      </div>

      {/* Quarter Tabs */}
      <div className="flex gap-1 mb-4">
        {quarters.map((quarter) => (
          <button
            key={quarter}
            onClick={() => setActiveQuarter(quarter)}
            className={cn(
              "px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200",
              activeQuarter === quarter
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {quarter}
          </button>
        ))}
      </div>

      {/* Roadmap Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeQuarter}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-3"
        >
          {roadmapItems[activeQuarter as keyof typeof roadmapItems]?.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-muted/50 rounded-lg p-3 border border-border"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium">{item.name}</h4>
                <span className="text-sm text-muted-foreground">{item.progress}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2 mb-2">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.progress}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className={cn(
                    "h-2 rounded-full",
                    item.status === "completed" ? "bg-green-500" :
                    item.status === "in-progress" ? "bg-blue-500" :
                    "bg-gray-400"
                  )}
                />
              </div>
              <div className="flex items-center gap-2">
                {item.status === "completed" && <CheckCircle2 className="w-4 h-4 text-green-500" />}
                {item.status === "in-progress" && <Clock className="w-4 h-4 text-blue-500" />}
                {item.status === "planned" && <Calendar className="w-4 h-4 text-gray-500" />}
                <span className="text-sm text-muted-foreground capitalize">{item.status}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};