"use client";

import { Quote, Star } from "lucide-react";
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
          <div className="mx-auto max-w-2xl text-center">
            {/* Icon with gradient background */}
            <div className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/10 ring-1 ring-primary/20">
              <Quote className="h-7 w-7 text-primary" />
            </div>
            
            <h2 className="text-foreground mt-6 text-4xl font-semibold">
              What Developers Are Saying
            </h2>
            
            <p className="text-muted-foreground mb-16 mt-4 text-xl">
              Join thousands of developers who are shipping faster with PrismUI Pro.
              Real stories from real developers building production applications.
            </p>
          </div>

          {/* Testimonials Grid */}
          <motion.div 
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
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
                  iconVariant="twitter"
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