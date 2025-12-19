import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { 
  getPhoneDisplay, 
  getPhoneTel, 
  getEmail, 
  getBusinessHours,
  LOCATIONS,
  formatLocation 
} from '@/lib/business-config';

interface ContactInfoProps {
  className?: string;
}

const ContactInfo: React.FC<ContactInfoProps> = ({ className = "" }) => {
  // Get business info from centralized config
  const phoneDisplay = getPhoneDisplay();
  const phoneTel = getPhoneTel();
  const email = getEmail();
  const businessHours = getBusinessHours();
  const topLocations = LOCATIONS.slice(0, 4).map(loc => formatLocation(loc)).join(', ');

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Contact Cards */}
      <div className="space-y-4">
        <div className="group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Phone className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
            <p className="text-gray-600 mb-2">Call us for immediate assistance</p>
            <a 
              href={`tel:${phoneTel}`} 
              className="text-primary font-medium hover:text-primary/80 transition-colors text-lg"
            >
              {phoneDisplay}
            </a>
          </div>
        </div>

        <div className="group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Mail className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-2">Send us a message anytime</p>
            <a 
              href={`mailto:${email}`} 
              className="text-primary font-medium hover:text-primary/80 transition-colors text-lg"
            >
              {email}
            </a>
          </div>
        </div>

        <div className="group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Service Areas</h3>
            <p className="text-gray-600 mb-2">We proudly serve</p>
            <p className="text-primary font-medium text-lg">
              {topLocations}
            </p>
          </div>
        </div>

        <div className="group flex items-start space-x-4 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-primary/20">
          <div className="bg-primary/10 p-3 rounded-lg group-hover:bg-primary/20 transition-colors">
            <Clock className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
            <div className="text-gray-600 space-y-1">
              <p>Monday: {businessHours.monday}</p>
              <p>Tuesday: {businessHours.tuesday}</p>
              <p>Wednesday: {businessHours.wednesday}</p>
              <p>Thursday: {businessHours.thursday}</p>
              <p>Friday: {businessHours.friday}</p>
              <p>Saturday: {businessHours.saturday}</p>
              <p>Sunday: {businessHours.sunday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
