"use client";

import { Quote, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { TweetCard } from "@/components/prismui/tweet-card";

// Real tweet IDs featuring developer testimonials about UI libraries and components
const testimonialTweetIds = [
  "1875676743564140901",
  "1876013415875162179",
  "1875944686063644732",
  "1875641988625920505",
  "1875717532575003036",
  "1875695790540386402",
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

export function ProTestimonials() {
  return (
    <section>
      <div className="py-24">
        <div className="mx-auto w-full max-w-6xl px-6">
          {/* Section Header */}
          <div className="mx-auto max-w-4xl text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Quote className="h-5 w-5 text-primary" />
              <span className="text-base font-semibold text-primary">
                Testimonials
              </span>
            </div>
            <h2 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Developers Love,{" "}
              <span className="text-muted-foreground">We Deliver</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
              Join thousands of developers who are shipping faster with PrismUI
              Pro. Real stories from real developers building production
              applications.
            </p>
          </div>

          {/* Testimonials Grid */}
          <motion.div
            className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3 sm:mt-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {testimonialTweetIds.map((tweetId, index) => (
              <motion.div
                key={tweetId}
                variants={cardVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <TweetCard
                  id={tweetId}
                  compact={false}
                  hideMedia={true}
                  iconVariant="x"
                />
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
