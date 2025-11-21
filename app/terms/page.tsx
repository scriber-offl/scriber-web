import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsPage() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none space-y-6">
          <p className="text-muted-foreground text-center">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing and using this website, you accept and agree to be
              bound by the terms and provision of this agreement. In addition,
              when using these particular services, you shall be subject to any
              posted guidelines or rules applicable to such services. Any
              participation in this service will constitute acceptance of this
              agreement. If you do not agree to abide by the above, please do
              not use this service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
            <p>
              To access certain features of the website, you may be required to
              create an account. You are responsible for maintaining the
              confidentiality of your account and password and for restricting
              access to your computer, and you agree to accept responsibility
              for all activities that occur under your account or password.
            </p>
            <p className="mt-2">
              We reserve the right to refuse service, terminate accounts, remove
              or edit content, or cancel orders in our sole discretion.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">3. User Conduct</h2>
            <p>
              You agree to use the website only for lawful purposes. You are
              prohibited from posting on or transmitting through the website any
              material that is unlawful, harmful, threatening, abusive,
              harassing, defamatory, vulgar, obscene, sexually explicit,
              profane, hateful, racially, ethnically, or otherwise objectionable
              of any kind.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              4. Intellectual Property
            </h2>
            <p>
              The Site and its original content, features, and functionality are
              owned by Scriber and are protected by international copyright,
              trademark, patent, trade secret, and other intellectual property
              or proprietary rights laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">5. Termination</h2>
            <p>
              We may terminate your access to the Site, without cause or notice,
              which may result in the forfeiture and destruction of all
              information associated with your account. All provisions of this
              Agreement that, by their nature, should survive termination shall
              survive termination, including, without limitation, ownership
              provisions, warranty disclaimers, indemnity, and limitations of
              liability.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              6. Limitation of Liability
            </h2>
            <p>
              In no event shall Scriber, nor its directors, employees, partners,
              agents, suppliers, or affiliates, be liable for any indirect,
              incidental, special, consequential or punitive damages, including
              without limitation, loss of profits, data, use, goodwill, or other
              intangible losses, resulting from (i) your access to or use of or
              inability to access or use the Service; (ii) any conduct or
              content of any third party on the Service; (iii) any content
              obtained from the Service; and (iv) unauthorized access, use or
              alteration of your transmissions or content, whether based on
              warranty, contract, tort (including negligence) or any other legal
              theory, whether or not we have been informed of the possibility of
              such damage.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">7. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the
              laws, without regard to its conflict of law provisions. Our
              failure to enforce any right or provision of these Terms will not
              be considered a waiver of those rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">
              8. Changes to This Agreement
            </h2>
            <p>
              We reserve the right, at our sole discretion, to modify or replace
              these Terms by posting the updated terms on the Site. Your
              continued use of the Site after any such changes constitutes your
              acceptance of the new Terms.
            </p>
          </section>
        </CardContent>
      </Card>
    </div>
  );
}
