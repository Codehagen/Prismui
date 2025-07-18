"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { 
  Calendar, 
  CheckCircle2, 
  Circle, 
  GitBranch, 
  MessageSquare,
  FileText,
  Users,
  Zap
} from "lucide-react";

interface RoadmapSectionProps {
  className?: string;
}

export default function RoadmapSection({ className }: RoadmapSectionProps) {
  return (
    <section className={cn("relative py-24 bg-gradient-to-b from-background to-muted/20 overflow-hidden", className)}>
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-4"
          >
            <Zap className="w-4 h-4" />
            <span>Project and long-term planning</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl lg:text-5xl font-bold mb-6"
          >
            Plan your product strategy
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground"
          >
            Align your team around a unified product roadmap. Plan, manage, and track all product 
            initiatives with Acme's intelligent planning suite.
          </motion.p>
        </div>

        {/* Timeline Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="relative mb-24"
        >
          <div className="bg-muted/30 backdrop-blur-sm rounded-2xl border border-border p-8">
            {/* Timeline Header */}
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold">Product Roadmap</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                <span>Q3 2024 - Q1 2025</span>
              </div>
            </div>

            {/* Timeline Months */}
            <div className="grid grid-cols-8 gap-4 mb-8 text-xs text-muted-foreground">
              {['AUG', 'SEP', 'OCT', 'NOV', 'DEC', 'JAN', 'FEB', 'MAR'].map((month, index) => (
                <div key={month} className="text-center">
                  <div className="font-medium">{month}</div>
                  <div className="text-muted-foreground/60">{index < 5 ? '2024' : '2025'}</div>
                </div>
              ))}
            </div>

            {/* Timeline Tracks */}
            <div className="space-y-4">
              {/* Track 1 - Realtime Interface */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-green-500"></div>
                  <span className="text-sm font-medium">Realtime interface</span>
                </div>
                <div className="ml-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-green-500/10 rounded-lg"></div>
                  <div className="relative h-8 bg-green-500/30 rounded-lg" style={{ width: '45%' }}>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-green-600 font-medium">
                      AUG 22
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Track 2 - Beta Prototype */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                  <span className="text-sm font-medium text-muted-foreground">Beta prototype</span>
                </div>
                <div className="ml-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-muted/40 to-muted/20 rounded-lg"></div>
                  <div className="relative h-8 bg-muted/60 rounded-lg" style={{ width: '35%', marginLeft: '25%' }}>
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-medium">
                      SEP
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Track 3 - RLHF Fine Tuning */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex items-center gap-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground/60"></div>
                  <span className="text-sm font-medium text-muted-foreground">RLHF fine tuning</span>
                </div>
                <div className="ml-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-muted/30 to-muted/10 rounded-lg"></div>
                  <div className="relative h-8 bg-muted/40 rounded-lg" style={{ width: '55%', marginLeft: '40%' }}>
                    <div className="absolute inset-0 flex items-center justify-end pr-2">
                      <Users className="w-3 h-3 mr-1" />
                      <span className="text-xs">MVP</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Project Management Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="bg-muted/30 backdrop-blur-sm rounded-2xl border border-border p-8"
          >
            <h3 className="text-xl font-semibold mb-4">Manage projects end-to-end</h3>
            <p className="text-muted-foreground mb-6">
              Consolidate specs, milestones, tasks, and other documentation in one centralized location.
            </p>
            
            <div className="bg-background/50 rounded-lg p-6 border border-border">
              <h4 className="font-medium mb-4">Project Overview</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Properties</span>
                  <div className="flex items-center gap-2">
                    <Circle className="w-3 h-3" />
                    <span>In Progress</span>
                    <span className="text-muted-foreground">75%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Resources</span>
                  <div className="flex items-center gap-2">
                    <GitBranch className="w-3 h-3" />
                    <span>Exploration</span>
                    <Users className="w-3 h-3 ml-2" />
                    <span>User interview</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Milestones</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-500" />
                    <span>Design Review</span>
                    <span className="text-muted-foreground">100%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Project Updates Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="bg-muted/30 backdrop-blur-sm rounded-2xl border border-border p-8"
          >
            <h3 className="text-xl font-semibold mb-4">Project updates</h3>
            <p className="text-muted-foreground mb-6">
              Communicate progress and project health with built-in project updates.
            </p>
            
            <div className="bg-background/50 rounded-lg p-6 border border-border">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">On track</div>
                    <div className="text-sm text-muted-foreground">
                      We are ready to launch next Thursday
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">Sep 8</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Collaboration Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-muted/30 backdrop-blur-sm rounded-2xl border border-border p-8"
        >
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Ideate and specify what to build next</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-muted-foreground mt-1" />
                  <div>
                    <h4 className="font-medium">Collaborative documents</h4>
                    <p className="text-sm text-muted-foreground">Inline comments</p>
                    <p className="text-sm text-muted-foreground">Text-to-issue commands</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background/50 rounded-lg p-6 border border-border">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Send template</span>
                  <span className="text-xs bg-blue-500/20 text-blue-500 px-2 py-0.5 rounded">Project spec</span>
                </div>
                <div className="pl-6">
                  <p className="text-sm text-muted-foreground">
                    Collaborate on ideas
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Write down product ideas and work together on specs in Linear's multiplayer project documents. Add "style" and interactive with rich-text formatting options.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}