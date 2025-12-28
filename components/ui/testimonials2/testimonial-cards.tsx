import React from 'react';
import Image from '@/components/ui/image';
import { StarIcon } from '@heroicons/react/24/solid';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  profilePic: string;
  rating: number;
  review: string;
  company?: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <StarIcon
          key={index}
          className={`w-5 h-5 ${
            index < rating ? 'text-yellow-400' : 'text-gray-300'
          }`}
        />
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
    </div>
  );
};

interface TestimonialCardsProps {
  className?: string;
  testimonials: Testimonial[];
}

const TestimonialCards = React.forwardRef<HTMLDivElement, TestimonialCardsProps>(
  ({ className, testimonials, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full py-16 bg-gray-50 ${className || ''}`}
        {...props}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-lg text-gray-600 max-w-7xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about our professional installation and repair services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 p-6 border border-gray-100"
              >
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.review}&rdquo;
                </blockquote>

                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonial.profilePic}
                      alt={testimonial.name}
                      width={56}
                      height={56}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-lg">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm">
                      {testimonial.role}
                    </p>
                    {testimonial.company && (
                      <p className="text-blue-600 text-sm font-medium">
                        {testimonial.company}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

TestimonialCards.displayName = "TestimonialCards";

export { TestimonialCards };

export const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    role: 'Homeowner',
    profilePic: '/michael-sum-LEpfefQf4rU-unsplash.jpg',
    rating: 5,
    review: 'The team at Example Company completed our project quickly and professionally. The installation was flawless and exceeded our expectations. Highly recommend!',
    company: 'Residential Client'
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: 'Property Manager',
    profilePic: '/vercel.svg',
    rating: 5,
    review: 'Professional service from start to finish. Our commercial property now has the quality solutions that enhance security and functionality.',
    company: 'Chen Properties'
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Designer',
    profilePic: '/og.png',
    rating: 5,
    review: 'As a fellow professional, I can attest to the quality of their work. Their attention to detail and craftsmanship is outstanding.',
    company: 'Rodriguez Designs'
  },
  {
    id: '4',
    name: 'David Thompson',
    role: 'Restaurant Owner',
    profilePic: '/globe.svg',
    rating: 5,
    review: 'Our new commercial system works perfectly. The team installed it quickly and the automated features save us time every day.',
    company: 'Thompson\'s Bistro'
  }
];
