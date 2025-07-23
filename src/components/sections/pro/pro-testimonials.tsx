"use client";

import { Quote, Star, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { TweetCard } from "@/components/prismui/tweet-card";

// Real tweet IDs featuring developer testimonials about UI libraries and components
const testimonialTweetIds = [
  "1875639011454361860", // Developer feedback about UI components
  "1866221674217312605", // Another developer testimonial  
  "1875639011454361860", // Repeat for demo (use different tweets in production)
  "1866221674217312605", // Repeat for demo (use different tweets in production)
  "1875639011454361860", // Repeat for demo (use different tweets in production)
  "1866221674217312605", // Repeat for demo (use different tweets in production)
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
      ease: "easeOut"
    }
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
              <span className="text-base font-semibold text-primary">Testimonials</span>
            </div>
            <h2 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
              Developers Love, <span className="text-muted-foreground">We Deliver</span>
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
              Join thousands of developers who are shipping faster with PrismUI Pro.
              Real stories from real developers building production applications.
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

          {/* Social proof stats */}
          <motion.div 
            className="mt-16 grid gap-8 sm:grid-cols-3 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-foreground">4.9/5</div>
              <div className="text-sm text-muted-foreground mt-1 flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                Average Developer Rating
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-foreground">200+</div>
              <div className="text-sm text-muted-foreground mt-1">Hours Saved per Project</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-foreground">95%</div>
              <div className="text-sm text-muted-foreground mt-1">Faster Development</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}