"use client";

import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
  service: string;
  avatar: string;
}

export const TestimonialsColumn = (props: {
  className?: string;
  testimonials: Testimonial[];
  duration?: number;
}) => {
  const yProgress = useMotionValue(0);
  const animationRef = useRef<ReturnType<typeof animate> | null>(null);
  
  // Transform motion value to percentage
  const y = useTransform(yProgress, [0, 1], ["0%", "-50%"]);

  useEffect(() => {
    // Use motion values to avoid re-renders during animation
    animationRef.current = animate(yProgress, [0, 1], {
      duration: props.duration || 10,
      repeat: Infinity,
      ease: "linear",
      repeatType: "loop",
    });

    return () => {
      if (animationRef.current) {
        animationRef.current.stop();
      }
    };
  }, [yProgress, props.duration]);

  return (
    <div className={props.className}>
      {/* Framer Motion with motion values - no re-renders during animation */}
      <motion.div
        style={{ y }}
        className="flex flex-col gap-6 pb-6 bg-background"
      >
        {[
          ...new Array(2).fill(0).map((_, index) => (
            <React.Fragment key={index}>
              {props.testimonials.map(({ name, role, content, rating, service, avatar }, i) => (
                <div className="p-6 rounded-2xl border border-border/50 shadow-lg shadow-primary/10 max-w-xs w-full bg-background" key={i}>
                  {/* Rating */}
                  <div className="flex items-center mb-4">
                    {[...Array(rating)].map((_, starIndex) => (
                      <Star key={starIndex} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                    <span className="ml-2 text-xs text-muted-foreground">
                      {rating}.0 rating
                    </span>
                  </div>
                  
                  {/* Content */}
                  <div className="text-sm text-foreground mb-4 leading-relaxed">
                    &ldquo;{content}&rdquo;
                  </div>
                  
                  {/* Service Badge */}
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full">
                      {service}
                    </span>
                  </div>
                  
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold text-sm">
                        {avatar}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <div className="font-medium tracking-tight leading-5 text-foreground">{name}</div>
                      <div className="leading-5 opacity-60 tracking-tight text-sm text-muted-foreground">{role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </React.Fragment>
          )),
        ]}
      </motion.div>
    </div>
  );
};
