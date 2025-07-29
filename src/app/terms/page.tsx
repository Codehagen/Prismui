import { constructMetadata } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import Footer from "@/components/sections/footer";

export const metadata = constructMetadata({
  title: "Terms of Service - PrismUI",
  description: "Terms of Service for PrismUI. Read our terms and conditions for using PrismUI components, Pro features, and services.",
  canonical: "https://www.prismui.tech/terms",
});

export default function TermsPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray max-w-none dark:prose-invert">
          <h1>Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 29, 2025
          </p>

          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using PrismUI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            PrismUI provides a React component library with free and premium components, templates, and documentation for building modern web applications.
          </p>

          <h2>3. Free Components</h2>
          <p>
            Our free components are provided under the MIT License and can be used in personal and commercial projects without restriction.
          </p>

          <h2>4. PrismUI Pro Subscription</h2>
          <p>
            PrismUI Pro provides access to premium components, templates, and priority support through a paid subscription service.
          </p>
          <ul>
            <li>Pro subscriptions are billed according to your chosen plan (monthly or annual)</li>
            <li>You may cancel your subscription at any time</li>
            <li>Refunds are handled on a case-by-case basis</li>
            <li>Pro components require an active subscription for continued use</li>
          </ul>

          <h2>5. Intellectual Property</h2>
          <p>
            All content, code, and materials provided through PrismUI remain the intellectual property of PrismUI and its licensors, except where explicitly licensed under open source terms.
          </p>

          <h2>6. User Responsibilities</h2>
          <p>You agree to:</p>
          <ul>
            <li>Use the Service in compliance with all applicable laws</li>
            <li>Not redistribute Pro components without proper licensing</li>
            <li>Provide accurate account information</li>
            <li>Maintain the security of your account credentials</li>
          </ul>

          <h2>7. Limitation of Liability</h2>
          <p>
            PrismUI is provided "as is" without warranties of any kind. We shall not be liable for any damages arising from the use of our Service.
          </p>

          <h2>8. Privacy Policy</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service.
          </p>

          <h2>9. Changes to Terms</h2>
          <p>
            We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated revision date.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            If you have any questions about these Terms of Service, please contact us at{" "}
            <a href="mailto:support@prismui.tech">support@prismui.tech</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}