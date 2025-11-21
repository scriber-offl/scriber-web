import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read Scriber's Privacy Policy to understand how we collect, use, and protect your personal data.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Privacy Policy
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
            <p>
              Welcome to Scriber. We respect your privacy and are committed to
              protecting your personal data. This privacy policy will inform you
              as to how we look after your personal data when you visit our
              website and tell you about your privacy rights and how the law
              protects you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              2. Information We Collect
            </h2>
            <p>
              We may collect, use, store and transfer different kinds of
              personal data about you which we have grouped together follows:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Identity Data:</strong> includes first name, last name,
                username or similar identifier, and profile image.
              </li>
              <li>
                <strong>Contact Data:</strong> includes email address and
                telephone numbers.
              </li>
              <li>
                <strong>Technical Data:</strong> includes internet protocol (IP)
                address, your login data, browser type and version, time zone
                setting and location, browser plug-in types and versions,
                operating system and platform and other technology on the
                devices you use to access this website.
              </li>
              <li>
                <strong>Usage Data:</strong> includes information about how you
                use our website, products and services.
              </li>
              <li>
                <strong>Form Data:</strong> includes information you provide
                when submitting contact forms or lead generation forms, such as
                service types and project requirements.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              3. How We Use Your Information
            </h2>
            <p>
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data in the following
              circumstances:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                To register you as a new customer and manage your account.
              </li>
              <li>
                To process and deliver your orders or requests for services.
              </li>
              <li>
                To manage our relationship with you, including notifying you
                about changes to our terms or privacy policy.
              </li>
              <li>
                To administer and protect our business and this website
                (including troubleshooting, data analysis, testing, system
                maintenance, support, reporting and hosting of data).
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Third-Party Services
            </h2>
            <p>
              We use third-party services for authentication and other
              functionalities. Specifically, we use:
            </p>
            <ul className="list-disc pl-6 space-y-2 mt-2">
              <li>
                <strong>Google & GitHub OAuth:</strong> For secure user
                authentication. When you sign in using these services, we
                receive your basic profile information (name, email, image) as
                permitted by your settings with those providers.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
            <p>
              We have put in place appropriate security measures to prevent your
              personal data from being accidentally lost, used or accessed in an
              unauthorized way, altered or disclosed. In addition, we limit
              access to your personal data to those employees, agents,
              contractors and other third parties who have a business need to
              know.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
            <p>
              Under certain circumstances, you have rights under data protection
              laws in relation to your personal data, including the right to
              request access, correction, erasure, restriction, transfer, to
              object to processing, to portability of data and (where the lawful
              ground of processing is consent) to withdraw consent.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our privacy
              practices, please contact us through our contact form.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
