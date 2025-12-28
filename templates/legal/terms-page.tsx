import React from 'react';
import { DynamicHeader } from '@/components/global/dynamic-header';
import { 
  CONTACT, 
  LOCATIONS, 
  BUSINESS_INFO, 
  CORE_SERVICES,
  formatLocation,
  getLocationsString
} from '@/lib/business-config';

export default function TermsPage() {
  const serviceAreasString = getLocationsString();
  const servicesList = CORE_SERVICES.map(service => service.name).join(', ');
  const primaryLocation = LOCATIONS[0];
  const stateName = primaryLocation?.state || 'your state';

  return (
    <div className="min-h-screen bg-background">
      {/* Dynamic Header */}
      <DynamicHeader 
        title="Terms & Conditions"
        description={`Please read these terms and conditions carefully before using our ${BUSINESS_INFO.primaryKeyword.toLowerCase()} services. By engaging our services, you agree to be bound by these terms.`}
        image="/assets/config/placeholder-image.png"
        breadcrumbs={[
          { label: 'Kushtet e Përdorimit', href: '/kushtet-e-perdorimit/' }
        ]}
      />

      {/* Terms Content */}
      <section className="py-16 bg-linear-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-8 lg:p-12">
              <div className="prose prose-lg max-w-none">
                <p className="text-gray-600 mb-8">
                  <strong>Last updated:</strong> {new Date().toLocaleDateString()}
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-600 mb-6">
                  By accessing and using our {BUSINESS_INFO.primaryKeyword.toLowerCase()} services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service Description</h2>
                <p className="text-gray-600 mb-6">
                  {BUSINESS_INFO.name} provides professional {BUSINESS_INFO.primaryKeyword.toLowerCase()} services in {serviceAreasString}. Our services include but are not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  {CORE_SERVICES.map((service, index) => (
                    <li key={index}>{service.name}</li>
                  ))}
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Service Areas</h2>
                <p className="text-gray-600 mb-6">
                  Our services are available in {serviceAreasString}, and their surrounding metropolitan areas. Service availability may vary based on location and scheduling.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Pricing and Payment</h2>
                <p className="text-gray-600 mb-6">
                  All pricing is provided in advance through written estimates. Payment is due upon completion of services unless other arrangements have been made in writing. We accept cash, check, and major credit cards.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Warranties</h2>
                <p className="text-gray-600 mb-6">
                  We provide warranties on our workmanship and materials as specified in individual service agreements. Manufacturer warranties apply to parts and equipment. Warranty terms vary by service type and will be detailed in your service contract.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Limitation of Liability</h2>
                <p className="text-gray-600 mb-6">
                  Our liability is limited to the cost of the services provided. We are not liable for any indirect, incidental, or consequential damages arising from our services. This limitation applies to the fullest extent permitted by law.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Customer Responsibilities</h2>
                <p className="text-gray-600 mb-6">
                  Customers are responsible for:
                </p>
                <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                  <li>Providing accurate information about their service needs</li>
                  <li>Ensuring safe access to the work area</li>
                  <li>Removing personal items from the work area</li>
                  <li>Following maintenance recommendations</li>
                </ul>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Emergency Services</h2>
                <p className="text-gray-600 mb-6">
                  Emergency services are available 24/7 for urgent service needs. Emergency service rates may apply outside normal business hours. We reserve the right to determine what constitutes an emergency situation.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Cancellation Policy</h2>
                <p className="text-gray-600 mb-6">
                  Service appointments may be cancelled or rescheduled with at least 24 hours notice. Cancellation fees may apply for same-day cancellations or no-shows.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Privacy Policy</h2>
                <p className="text-gray-600 mb-6">
                  Your privacy is important to us. Please review our Privacy Policy, which also governs your use of our services, to understand our practices.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Modifications</h2>
                <p className="text-gray-600 mb-6">
                  We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of our services after changes constitutes acceptance of the new terms.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Governing Law</h2>
                <p className="text-gray-600 mb-6">
                  These terms are governed by the laws of the State of {stateName}. Any disputes arising from these terms or our services will be resolved in the courts of {stateName}.
                </p>

                <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
                <p className="text-gray-600 mb-6">
                  If you have any questions about these Terms & Conditions, please contact us:
                </p>
                <div className="bg-gray-50 rounded-lg p-6">
                  <p className="text-gray-600 mb-2"><strong>Phone:</strong> {CONTACT.phone}</p>
                  <p className="text-gray-600 mb-2"><strong>Email:</strong> {CONTACT.email}</p>
                  {CONTACT.addressVisibility === 'VISIBLE' && (
                    <p className="text-gray-600 mb-2"><strong>Address:</strong> {CONTACT.address}</p>
                  )}
                  <p className="text-gray-600"><strong>Service Areas:</strong> {serviceAreasString}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
