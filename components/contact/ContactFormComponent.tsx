'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface FormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  location: string;
  message: string;
}

interface ContactFormComponentProps {
  onSubmit?: (formData: FormData) => void;
  className?: string;
}

const ContactFormComponent: React.FC<ContactFormComponentProps> = ({ 
  onSubmit, 
  className = "" 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Call custom onSubmit if provided, otherwise use default behavior
    if (onSubmit) {
      try {
        await onSubmit(formData);
        setIsSubmitted(true);
      } catch (error) {
        console.error('Form submission error:', error);
      }
    } else {
      // Default form submission behavior
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
    }
    
    setIsSubmitting(false);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        location: '',
        message: ''
      });
    }, 3000);
  };

  const services = [
    'Instalime Elektrike',
    'Riparime Elektrike', 
    'Mirëmbajtje Elektrike',
    'Ndriçim & Energji',
    'Sisteme Speciale',
    'Tjetër'
  ];

  const locations = [
    'Prishtinë',
    'Prizren',
    'Ferizaj',
    'Gjilan',
    'Pejë',
    'Gjakovë',
    'Mitrovicë',
    'Fushë Kosovë',
    'Obiliq',
    'Podujevë',
    'Vushtrri',
    'Lipjan',
    'Suharekë',
    'Tjetër'
  ];

  if (isSubmitted) {
    return (
      <div className={`bg-white rounded-xl shadow-lg p-8 text-center ${className}`}>
        <div className="bg-green-100 p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">Ju faleminderit!</h3>
        <p className="text-gray-600">
          Ne kemi pranuar mesazhin tuaj dhe do t&apos;ju kontaktojmë brenda 24 orëve.
        </p>
      </div>
    );
  }

  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 border border-gray-100 ${className}`}>
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Kërko një Ofertë Falas
        </h2>
        <p className="text-gray-600">
          Plotësoni formën më poshtë dhe ne do t&apos;ju kontaktojmë brenda 24 orëve.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Emri dhe Mbiemri *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="Emri juaj i plotë"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresa e Email-it *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="email@juaj.com"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Numri i Telefonit
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400"
              placeholder="+383 4X XXX XXX"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Lokacioni i Shërbimit *
            </label>
            <select
              id="location"
              name="location"
              required
              value={formData.location}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 hover:border-gray-400"
            >
              <option value="">Zgjidhni qytetin tuaj</option>
              {locations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-2">
            Shërbimi i Nevojshëm *
          </label>
          <select
            id="service"
            name="service"
            required
            value={formData.service}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
          >
            <option value="">Zgjidhni një shërbim</option>
            {services.map((service) => (
              <option key={service} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
            Detajet e Projektit
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-colors resize-none"
            placeholder="Na tregoni më shumë rreth projektit tuaj, afatet, ose ndonjë kërkesë specifike..."
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-primary text-primary-foreground py-4 px-6 rounded-lg font-medium hover:bg-primary/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:transform-none"
        >
          {isSubmitting ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Duke u dërguar...
            </>
          ) : (
            <>
              <Send className="w-5 h-5 mr-2" />
              Dërgo Mesazhin
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default ContactFormComponent;
