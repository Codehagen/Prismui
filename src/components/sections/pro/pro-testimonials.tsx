"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Quote, Heart, Star, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface TestimonialData {
  id: string;
  content: string;
  author: {
    name: string;
    handle: string;
    avatar: string;
    verified?: boolean;
  };
  date: string;
  likes: number;
  company: string;
  project?: string;
}

const testimonials: TestimonialData[] = [
  {
    id: "1",
    content: "PrismUI Pro saved me 40+ hours building our analytics dashboard. The components are production-ready and the TypeScript support is excellent. 🚀",
    author: {
      name: "Sarah Chen",
      handle: "@sarahc_dev",
      avatar: "SC",
      verified: true
    },
    date: "Dec 15",
    likes: 87,
    company: "DataFlow Inc",
    project: "SaaS Analytics"
  },
  {
    id: "2",
    content: "The data table components alone were worth the investment. We went from prototype to production in days instead of weeks. Game changer! 💯",
    author: {
      name: "Marcus Rodriguez",
      handle: "@marcus_codes",
      avatar: "MR",
      verified: true
    },
    date: "Dec 12",
    likes: 134,
    company: "FinTech Solutions",
    project: "Financial Dashboard"
  },
  {
    id: "3",
    content: "Finally, components that actually work out of the box. The attention to accessibility and performance details is impressive. Loving the developer experience! ✨",
    author: {
      name: "Emma Thompson",
      handle: "@emmathompson",
      avatar: "ET"
    },
    date: "Dec 10",
    likes: 92,
    company: "HealthTech Startup",
    project: "Patient Portal"
  },
  {
    id: "4",
    content: "The template gallery gave us the perfect starting point. We customized the e-commerce template and launched 3 weeks early. ROI was immediate! 📈",
    author: {
      name: "David Park",
      handle: "@davidpark_dev",
      avatar: "DP",
      verified: true
    },
    date: "Dec 8",
    likes: 156,
    company: "Retail Connect",
    project: "Online Marketplace"
  },
  {
    id: "5",
    content: "Best React component library I've used. The documentation is clear and the examples actually work. Saved countless debugging hours. Highly recommend! 🔥",
    author: {
      name: "Aisha Patel",
      handle: "@aisha_builds",
      avatar: "AP"
    },
    date: "Dec 5",
    likes: 203,
    company: "EdTech Platform",
    project: "Learning System"
  },
  {
    id: "6",
    content: "The animations and micro-interactions make our app feel premium. Clients are impressed and development velocity has doubled. Worth every penny! ⚡",
    author: {
      name: "James Wilson",
      handle: "@jwilson_creative",
      avatar: "JW",
      verified: true
    },
    date: "Dec 2",
    likes: 118,
    company: "Digital Agency",
    project: "Portfolio Sites"
  }
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

function TestimonialCard({ testimonial }: { testimonial: TestimonialData }) {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <Card className="group relative overflow-hidden bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/50 transition-all duration-200 hover:shadow-lg border border-border/50">
        <div className="p-6">
          {/* Header with author info */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              {/* Avatar */}
              <div className={cn(
                "overflow-hidden border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 transition-all h-10 w-10 rounded-full"
              )}>
                <div className="relative h-full w-full flex items-center justify-center text-sm font-semibold text-primary">
                  {testimonial.author.avatar}
                </div>
              </div>
              
              {/* Author details */}
              <div>
                <div className="flex items-center">
                  <span className="font-semibold text-foreground text-sm">
                    {testimonial.author.name}
                  </span>
                  {testimonial.author.verified && (
                    <motion.svg
                      aria-label="Verified"
                      className="ml-1 h-4 w-4 text-blue-500"
                      viewBox="0 0 24 24"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 10,
                      }}
                    >
                      <g fill="currentColor">
                        <path d="M22.5 12.5c0-1.58-.875-2.95-2.148-3.6.154-.435.238-.905.238-1.4 0-2.21-1.71-3.998-3.818-3.998-.47 0-.92.084-1.336.25C14.818 2.415 13.51 1.5 12 1.5s-2.816.917-3.437 2.25c-.415-.165-.866-.25-1.336-.25-2.11 0-3.818 1.79-3.818 4 0 .494.083.964.237 1.4-1.272.65-2.147 2.018-2.147 3.6 0 1.495.782 2.798 1.942 3.486-.02.17-.032.34-.032.514 0 2.21 1.708 4 3.818 4 .47 0 .92-.086 1.335-.25.62 1.334 1.926 2.25 3.437 2.25 1.512 0 2.818-.916 3.437-2.25.415.163.865.248 1.336.248 2.11 0 3.818-1.79 3.818-4 0-.174-.012-.344-.033-.513 1.158-.687 1.943-1.99 1.943-3.484zm-6.616-3.334l-4.334 6.5c-.145.217-.382.334-.625.334-.143 0-.288-.04-.416-.126l-.115-.094-2.415-2.415c-.293-.293-.293-.768 0-1.06s.768-.294 1.06 0l1.77 1.767 3.825-5.74c.23-.345.696-.436 1.04-.207.346.23.44.696.21 1.04z" />
                      </g>
                    </motion.svg>
                  )}
                </div>
                <div className="flex items-center space-x-1">
                  <span className="text-sm text-muted-foreground">
                    {testimonial.author.handle}
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-sm text-muted-foreground">
                    {testimonial.date}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Twitter icon */}
            <Twitter className="h-5 w-5 text-[#3BA9EE] transition-all duration-200 ease-in-out group-hover:scale-110" />
          </div>

          {/* Testimonial content */}
          <div className="whitespace-pre-wrap text-foreground text-[15px] mb-4">
            {testimonial.content}
          </div>

          {/* Company and project tags */}
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="secondary" className="text-xs">
              {testimonial.company}
            </Badge>
            {testimonial.project && (
              <Badge variant="outline" className="text-xs">
                {testimonial.project}
              </Badge>
            )}
          </div>

          {/* Engagement */}
          <div className="flex items-center justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group inline-flex items-center gap-1.5 text-muted-foreground/60 transition-colors hover:text-rose-500"
            >
              <Heart className="h-4 w-4 transition-all duration-300 ease-in-out group-hover:fill-rose-500 group-hover:stroke-rose-500" />
              <span className="text-sm font-medium transition-colors duration-300 ease-in-out group-hover:text-rose-500">
                {testimonial.likes}
              </span>
            </motion.div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

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
            {testimonials.map((testimonial) => (
              <TestimonialCard 
                key={testimonial.id} 
                testimonial={testimonial} 
              />
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