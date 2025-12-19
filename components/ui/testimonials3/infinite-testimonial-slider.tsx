"use client";
import React, { useEffect, useRef } from 'react';
import Image from '@/components/ui/image';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  profilePic: string;
  rating: number;
  review: string;
}

interface InfiniteTestimonialSliderProps {
  testimonials: Testimonial[];
  speed?: number;
  className?: string;
}

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => (
        <svg
          key={index}
          className={`w-4 h-4 ${
            index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-2 text-sm text-gray-600">({rating}/5)</span>
    </div>
  );
};

export const InfiniteTestimonialSlider: React.FC<InfiniteTestimonialSliderProps> = ({
  testimonials,
  speed = 30,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number | null>(null);

  // Duplicate testimonials to create seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollPosition = 0;
    const scrollWidth = container.scrollWidth / 2; // Since we duplicated the testimonials

    const animate = () => {
      scrollPosition += speed / 60; // 60fps
      if (scrollPosition >= scrollWidth) {
        scrollPosition = 0;
      }
      container.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [speed]);

  return (
    <div className={`w-full py-16 bg-linear-to-br from-gray-50 to-blue-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about our professional installation and repair services.
          </p>
        </div>

        {/* Slider Container with Fog Effects */}
        <div className="relative">
          {/* Left Fog Effect */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-linear-to-r from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />
          
          {/* Right Fog Effect */}
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-linear-to-l from-gray-50 via-gray-50/80 to-transparent z-10 pointer-events-none" />

          {/* Infinite Slider */}
          <div
            ref={containerRef}
            className="flex gap-6 overflow-hidden scrollbar-hide"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={`${testimonial.id}-${index}`}
                className="shrink-0 w-80 bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Review */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed text-sm">
                  &ldquo;{testimonial.review}&rdquo;
                </blockquote>

                {/* Profile */}
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <Image
                      src={testimonial.profilePic}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="w-12 h-12 rounded-full object-cover border-2 border-blue-100"
                    />
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 text-base truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-gray-600 text-sm truncate">
                      {testimonial.role}
                    </p>
                    <p className="text-blue-600 text-xs font-medium truncate">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center space-x-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span>Scroll to see more testimonials</span>
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for hiding scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default InfiniteTestimonialSlider;
