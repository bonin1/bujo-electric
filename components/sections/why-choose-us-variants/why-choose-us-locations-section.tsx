import { CheckCircle, MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import Link from "next/link";

const WhyChooseUsLocationsSection = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 className="text-3xl font-bold text-text-dark mb-4">
          Our services near your area
          </h3>
          <p className="text-lg text-text-secondary mb-6">
            Our local knowledge ensures your property thrives year-round. We understand the unique challenges 
            of maintaining systems in various climates.
          </p>
          <ul className="space-y-3">
            
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
              <span className="text-text-dark">Local permit and regulation expertise</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
              <span className="text-text-dark">Quick response for maintenance needs</span>
            </li>
          </ul>
        </div>
        <div className="text-center">
          <div className="text-6xl font-bold text-primary mb-2">15+</div>
          <div className="text-xl font-semibold text-text-dark mb-2">Service Areas</div>
          <div className="text-text-secondary mb-6">Across Multiple Regions</div>
          <Button size="lg" asChild className="group">
            <Link href="/service-areas">
              <MapPin className="w-4 h-4 mr-2" />
              View All Locations
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsLocationsSection
