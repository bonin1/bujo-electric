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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Telefoni</h3>
            <p className="text-gray-600 mb-2">Na telefononi për asistencë të menjëhershme</p>
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
            <p className="text-gray-600 mb-2">Na dërgoni një mesazh në çdo kohë</p>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Zonat e Shërbimit</h3>
            <p className="text-gray-600 mb-2">Ne shërbejmë me krenari në</p>
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
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Orari i Punës</h3>
            <div className="text-gray-600 space-y-1">
              <p>E Hënë: {businessHours.monday}</p>
              <p>E Martë: {businessHours.tuesday}</p>
              <p>E Mërkurë: {businessHours.wednesday}</p>
              <p>E Enjte: {businessHours.thursday}</p>
              <p>E Premte: {businessHours.friday}</p>
              <p>E Shtunë: {businessHours.saturday}</p>
              <p>E Diel: {businessHours.sunday}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
