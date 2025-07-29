import { constructMetadata } from "@/lib/utils";
import { SiteHeader } from "@/components/site-header";
import Footer from "@/components/sections/footer";

export const metadata = constructMetadata({
  title: "Privacy Policy - PrismUI",
  description: "Privacy Policy for PrismUI. Learn how we collect, use, and protect your personal information when using our React component library and Pro services.",
  canonical: "https://www.prismui.tech/privacy",
});

export default function PrivacyPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="prose prose-gray max-w-none dark:prose-invert">
          <h1>Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Last updated: January 29, 2025
          </p>

          <h2>1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, subscribe to PrismUI Pro, or contact us for support.
          </p>

          <h3>Personal Information</h3>
          <ul>
            <li>Name and email address</li>
            <li>Payment information (processed securely through Stripe)</li>
            <li>Account preferences and settings</li>
          </ul>

          <h3>Usage Information</h3>
          <ul>
            <li>Pages visited and features used</li>
            <li>Device information and browser type</li>
            <li>IP address and general location</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and maintain our services</li>
            <li>Process payments and manage subscriptions</li>
            <li>Send important updates and notifications</li>
            <li>Provide customer support</li>
            <li>Improve our products and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2>3. Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties, except:
          </p>
          <ul>
            <li>With your explicit consent</li>
            <li>To trusted service providers (like Stripe for payments)</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transfer or merger</li>
          </ul>

          <h2>4. Third-Party Services</h2>
          <p>We use the following third-party services:</p>
          <ul>
            <li><strong>Stripe:</strong> Payment processing (subject to Stripe's privacy policy)</li>
            <li><strong>Google Analytics:</strong> Website analytics (anonymized data)</li>
            <li><strong>Vercel:</strong> Website hosting and performance monitoring</li>
          </ul>

          <h2>5. Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            We retain your personal information for as long as necessary to provide our services and comply with legal obligations. You may request deletion of your account at any time.
          </p>

          <h2>7. Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access and update your personal information</li>
            <li>Delete your account and associated data</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of your data</li>
          </ul>

          <h2>8. Cookies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage, and provide personalized content. You can control cookie settings through your browser.
          </p>

          <h2>9. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect personal information from children under 13.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page.
          </p>

          <h2>11. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at{" "}
            <a href="mailto:privacy@prismui.tech">privacy@prismui.tech</a>.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}