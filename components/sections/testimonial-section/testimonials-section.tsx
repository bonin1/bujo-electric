import { Quote } from 'lucide-react';
import { TestimonialsColumn } from './testimonials-columns-1';
import { BUSINESS_INFO } from '@/lib/business-config'

interface TestimonialsSectionProps {
  city?: string;
}

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Homeowner",
    content: `${BUSINESS_INFO.name} delivered exceptional craftsmanship on our residential property upgrade. Their meticulous attention to detail and proactive project management ensured every phase exceeded our quality standards. The investment has significantly enhanced both our property value and daily functionality.`,
    rating: 5,
    service: `${BUSINESS_INFO.primaryKeyword}`,
    avatar: "SJ"
  },
  {
    name: "Mike Rodriguez",
    role: "Commercial Property Owner",
    content: `Outstanding results on our commercial facility project. ${BUSINESS_INFO.name} demonstrated superior technical expertise and completed the installation three days ahead of schedule. Their comprehensive maintenance program has eliminated downtime and provided excellent return on investment.`,
    rating: 5,
    service: "Commercial Services",
    avatar: "MR"
  },
  {
    name: "Jennifer Davis",
    role: "Luxury Homeowner",
    content: `${BUSINESS_INFO.name} exemplifies professional excellence in every interaction. Their technical proficiency, paired with premium materials and precision installation, delivered results that perfectly complement our high-end residence. I recommend their services without reservation.`,
    rating: 5,
    service: `${BUSINESS_INFO.primaryKeyword}`,
    avatar: "JD"
  },
  {
    name: "Robert Chen",
    role: "Property Manager",
    content: `Managing multiple properties requires reliable partners who deliver consistent quality. ${BUSINESS_INFO.name} has proven invaluable with their swift response times, transparent pricing, and durable installations. Their proactive maintenance approach has reduced our operational costs by 30 percent across our portfolio.`,
    rating: 5,
    service: "Property Management Services",
    avatar: "RC"
  },
  {
    name: "David Thompson",
    role: "Architect",
    content: `As an architect, I appreciate ${BUSINESS_INFO.name}'s collaborative approach and technical precision. They seamlessly integrate design specifications with practical engineering solutions, ensuring both aesthetic excellence and structural integrity. Their work consistently enhances the overall project value.`,
    rating: 5,
    service: "Custom Design Projects",
    avatar: "DT"
  }
]

export function TestimonialsSection({ city }: TestimonialsSectionProps = {}) {
  // Split testimonials into columns for the scrolling section
  const firstColumn = testimonials.slice(0, 2);
  const secondColumn = testimonials.slice(2, 4);
  const thirdColumn = testimonials.slice(4, 6);

  return (
    <section className="py-20 bg-linear-to-br from-background via-background to-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Quote className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            What Our Clients Say{city ? ` in ${city}` : ''}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience with Example Company.
          </p>
        </div>

        {/* Scrolling Testimonials Columns - Server-rendered */}
        <div className="mb-16 max-w-8xl mx-auto">
          <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[30dvh] overflow-hidden">
            <TestimonialsColumn testimonials={firstColumn} duration={15} />
            <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
            <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center justify-center flex flex-col items-center p-6 bg-card border border-border/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <p className="text-3xl w-full font-bold text-primary flex-col bg-primary/10 rounded-xl mb-2 py-3">
              1,200+
            </p>
            <p className="text-muted-foreground">
              Happy Clients
            </p>
          </div>

          <div className="text-center justify-center flex flex-col items-center p-6 bg-card border border-border/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl w-full font-bold flex-col text-primary bg-primary/10 rounded-xl mb-2 py-3">150+</div>
            <p className="text-muted-foreground">
              Projects Completed
            </p>
          </div>

          <div className="text-center justify-center flex flex-col items-center p-6 bg-card border border-border/50 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="text-3xl w-full font-bold flex-col text-primary bg-primary/10 rounded-xl mb-2 py-3">98%</div>
            <p className="text-muted-foreground">
              Satisfaction Rate
            </p>
          </div>
        </div>
      </div>
    </section>
  )
} 