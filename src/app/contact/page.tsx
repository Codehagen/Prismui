import { constructMetadata } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import Footer from "@/components/sections/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MessageSquare, Github, Twitter } from "lucide-react";

export const metadata = constructMetadata({
  title: "Contact Us - PrismUI",
  description:
    "Get in touch with the PrismUI team. Contact us for support, feedback, or questions about our React component library and Pro services.",
  canonical: "https://www.prismui.tech/contact",
});

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16 max-w-6xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a question, suggestion, or need help? We&apos;d love to hear
            from you. Reach out to us through any of the channels below.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="firstName" className="text-sm font-medium">
                    First Name
                  </label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="lastName" className="text-sm font-medium">
                    Last Name
                  </label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                </label>
                <Input id="email" type="email" placeholder="john@example.com" />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input id="subject" placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us more about your question or feedback..."
                  rows={5}
                />
              </div>
              <Button className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Send Message
              </Button>
              <p className="text-xs text-muted-foreground">
                We typically respond within 24 hours during business days.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get Support</CardTitle>
                <CardDescription>
                  Need help with PrismUI components or Pro features?
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Email Support</p>
                    <a
                      href="mailto:support@prismui.tech"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      support@prismui.tech
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MessageSquare className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Discord Community</p>
                    <a
                      href="https://discord.gg/SAy7T2zy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Join our Discord server
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follow Us</CardTitle>
                <CardDescription>
                  Stay updated with the latest news and updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Twitter className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">Twitter</p>
                    <a
                      href="https://twitter.com/prismui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      @prismui
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Github className="w-5 h-5 text-primary" />
                  <div>
                    <p className="font-medium">GitHub</p>
                    <a
                      href="https://github.com/Codehagen/Prismui"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      Codehagen/Prismui
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Business Hours</CardTitle>
                <CardDescription>
                  When you can expect to hear back from us.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-muted-foreground">
                      9:00 AM - 6:00 PM EST
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday - Sunday</span>
                    <span className="text-muted-foreground">
                      Limited support
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mb-6">
            Before reaching out, you might find your answer in our
            documentation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="outline" asChild>
              <a href="/docs">View Documentation</a>
            </Button>
            <Button variant="outline" asChild>
              <a href="/docs/installation">Installation Guide</a>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
