import React from 'react';
import { DynamicHeader } from '@/components/global/dynamic-header';
import { 
  CONTACT, 
  BUSINESS_INFO,
  getLocationsString
} from '@/lib/business-config';

export default function PrivacyPage() {
  const serviceAreasString = getLocationsString();

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Header */}
      <DynamicHeader 
        title="Privacy Policy"
        description={`We are committed to protecting your privacy and personal information. This policy explains how we collect, use, and safeguard your data when you use our ${BUSINESS_INFO.primaryKeyword.toLowerCase()} services.`}
        image="/assets/config/placeholder-image.png"
        breadcrumbs={[
          { label: 'Politika e Privatësisë', href: '/politika-e-privatesise/' }
        ]}
      />

      {/* Privacy Content */}
      <section className="py-16 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Information We Collect</h2>
                <p className="text-gray-600 mb-6">
                  We collect information you provide directly to us, such as when you request services, contact us, or use our website. This may include:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Name, email address, and phone number</li>
                  <li>Service address and property information</li>
                  <li>Service history and preferences</li>
                  <li>Payment information (processed securely)</li>
                  <li>Communications with our team</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. How We Use Your Information</h2>
                <p className="text-gray-600 mb-6">
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Process transactions and send related information</li>
                  <li>Send technical notices, updates, and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Comply with legal obligations</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Information Sharing</h2>
                <p className="text-gray-600 mb-6">
                  We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>With service providers who assist us in operating our business</li>
                  <li>When required by law or to protect our rights</li>
                  <li>In connection with a business transfer or acquisition</li>
                  <li>With your explicit consent</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Data Security</h2>
                <p className="text-gray-600 mb-6">
                  We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies and Tracking</h2>
                <p className="text-gray-600 mb-6">
                  Our website may use cookies and similar tracking technologies to enhance your experience. You can control cookie settings through your browser preferences.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Third-Party Services</h2>
                <p className="text-gray-600 mb-6">
                  Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data Retention</h2>
                <p className="text-gray-600 mb-6">
                  We retain your personal information for as long as necessary to provide our services and comply with legal obligations. When we no longer need your information, we will securely delete or anonymize it.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your Rights</h2>
                <p className="text-gray-600 mb-6">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request a copy of your data</li>
                  <li>Object to certain processing activities</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Children&apos;s Privacy</h2>
                <p className="text-gray-600 mb-6">
                  Our services are not directed to children under 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected such information, we will take steps to delete it.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. California Privacy Rights</h2>
                <p className="text-gray-600 mb-6">
                  California residents have additional privacy rights under the California Consumer Privacy Act (CCPA), including the right to know what personal information is collected and how it&apos;s used.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to This Policy</h2>
                <p className="text-gray-600 mb-6">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Us</h2>
                <p className="text-gray-600 mb-6">
                  If you have any questions about this Privacy Policy or our privacy practices, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> {CONTACT.phone}</p>
                  <p className="text-gray-600 mb-2"><strong>Email:</strong> {CONTACT.email}</p>
                  {CONTACT.addressVisibility === 'VISIBLE' && (
                    <p className="text-gray-600 mb-2"><strong>Address:</strong> {CONTACT.address}</p>
                  )}
                  <p className="text-gray-600">
                    <strong>Service Areas:</strong> {serviceAreasString}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
