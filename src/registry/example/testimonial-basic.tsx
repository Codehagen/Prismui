import { motion } from "framer-motion";
import { TestimonialSection } from "@/components/prismui/testimonial-card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer at TechFlow",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    description: (
      <p>
        PrismUI&apos;s components have transformed our development workflow. The
        motion-based animations and interactions are incredibly smooth.
      </p>
    ),
  },
  {
    name: "Marcus Rodriguez",
    role: "UI/UX Lead at DesignScale",
    img: "https://randomuser.me/api/portraits/men/2.jpg",
    description: (
      <p>
        The attention to detail in PrismUI&apos;s design system is remarkable.
        Every component feels polished and cohesive. The dark mode
        implementation and accessibility features are exactly what we needed.
      </p>
    ),
  },
  {
    name: "Emma Thompson",
    role: "Product Manager at StartupForge",
    img: "https://randomuser.me/api/portraits/women/3.jpg",
    description: (
      <p>
        Switching to PrismUI was a game-changer for our team. The seamless
        integration with Next.js and TypeScript means we can focus on building
        features instead of fighting with UI bugs.
      </p>
    ),
  },
];

export default function TestimonialBasic() {
  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            What People Are Saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Discover why developers and teams choose PrismUI for their projects
          </p>
        </motion.div>
      </div>
      <TestimonialSection
        testimonials={testimonials}
        variant="scroll"
        autoScroll
        direction="right"
        pauseOnHover
      />
    </div>
  );
}

export const demoSource = `import { motion } from "framer-motion";
import { TestimonialSection } from "@/components/prismui/testimonial-card";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Senior Developer at TechFlow",
    img: "https://randomuser.me/api/portraits/women/1.jpg",
    description: (
      <p>
        PrismUI's components have transformed our development workflow. The
        motion-based animations and interactions are incredibly smooth.
      </p>
    ),
  },
  // ... more testimonials
];

export default function TestimonialBasic() {
  return (
    <div className="w-full">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl mb-4">
            What People Are Saying
          </h2>
          <p className="text-xl text-muted-foreground max-w-[800px] mx-auto">
            Discover why developers and teams choose PrismUI for their projects
          </p>
        </motion.div>
      </div>
      <TestimonialSection
        testimonials={testimonials}
        variant="scroll"
        autoScroll
        direction="right"
        pauseOnHover
      />
    </div>
  );
}`;
