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
import { ArrowRight, Sparkles, HelpCircle } from "lucide-react";

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
      <div className="w-full p-10 md:p-14">
        <div className="mx-auto max-w-4xl text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <HelpCircle className="h-5 w-5 text-primary" />
            <span className="text-base font-semibold text-primary">FAQ</span>
          </div>
          <h2 className="text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
            Questions Answered, <span className="text-muted-foreground">Confidence Built</span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium text-pretty text-muted-foreground sm:text-xl/8">
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
    </section>
  );
}