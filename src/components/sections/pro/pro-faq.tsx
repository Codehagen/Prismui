"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ArrowRight, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "What's included in PrismUI Pro?",
    answer: "PrismUI Pro includes 50+ premium components, 12+ complete templates, TypeScript support, priority email support, commercial license, and lifetime updates. You get everything you need to build professional applications."
  },
  {
    question: "Can I use PrismUI Pro for commercial projects?",
    answer: "Yes! All Pro plans include a commercial license that allows you to use PrismUI Pro in unlimited commercial projects, whether you're building for clients or your own business."
  },
  {
    question: "How does the free trial work?",
    answer: "Start with a 7-day free trial to explore all Pro features. No credit card required. After the trial, choose to continue with a paid plan or return to the free version."
  },
  {
    question: "Is there a difference between the monthly and annual plans?",
    answer: "Both plans include the same features. The annual plan offers significant savings (equivalent to 2 months free) and is billed once per year instead of monthly."
  },
  {
    question: "Do you offer refunds?",
    answer: "Yes, we offer a 30-day money-back guarantee. If you're not satisfied with PrismUI Pro, contact us within 30 days for a full refund."
  },
  {
    question: "Can I cancel anytime?",
    answer: "Absolutely. You can cancel your subscription at any time from your account settings. You'll continue to have access until the end of your billing period."
  },
  {
    question: "Do I get updates and new components?",
    answer: "Yes! All Pro subscribers receive free updates, new components, and templates as they're released. We ship new content every month."
  },
  {
    question: "What frameworks do you support?",
    answer: "PrismUI Pro is built for React and Next.js applications. All components are compatible with TypeScript and work seamlessly with Tailwind CSS."
  }
];

export function ProFAQ() {
  return (
    <section
      id="faq"
      className="flex flex-col items-center justify-center gap-10 pb-10 w-full relative py-20 sm:py-32 bg-muted/30"
    >
      {/* Section Header */}
      <div className="border-b w-full h-full p-10 md:p-14">
        <div className="max-w-xl mx-auto flex flex-col items-center justify-center gap-2">
          <h2 className="text-3xl md:text-4xl font-medium tracking-tighter text-center text-balance">
            Frequently asked questions
          </h2>
          <p className="text-muted-foreground text-center text-balance font-medium">
            Everything you need to know about PrismUI Pro.
            Can't find what you're looking for? Contact our support team.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="max-w-3xl w-full mx-auto px-10">
        <Accordion
          type="single"
          collapsible
          className="w-full border-b-0 grid gap-2"
        >
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={index.toString()}
              className="border-0 grid gap-2"
            >
              <AccordionTrigger className="border bg-accent border-border rounded-lg px-4 py-3.5 cursor-pointer no-underline hover:no-underline data-[state=open]:ring data-[state=open]:ring-primary/20">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="p-3 border text-primary rounded-lg bg-accent">
                <p className="text-primary font-medium leading-relaxed">
                  {faq.answer}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Final CTA */}
      <div className="mx-auto mt-20 max-w-2xl text-center">
        <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
          <div className="p-8">
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-primary fill-primary/20" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Ready to get started?</h3>
            <p className="text-muted-foreground mb-6">
              Join thousands of developers building better UIs with PrismUI Pro.
              Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="sm:w-auto">
                <Link href="/pro/login">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="sm:w-auto">
                <Link href="/pro/login">
                  Sign In
                </Link>
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              No credit card required • 7-day free trial • Cancel anytime
            </p>
          </div>
        </Card>
      </div>
    </section>
  );
}