'use client';

import { Quote, Star, CheckCircle2 } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/business-config'
import { motion } from 'framer-motion';

interface TestimonialsSectionProps {
  city?: string;
}

const testimonials = [
  {
    name: "Arben Krasniqi",
    role: "Pronar Shtëpie",
    content: `${BUSINESS_INFO.name} ka bërë një punë të shkëlqyer në instalimin e sistemit elektrik në shtëpinë tonë të re. Profesionalizmi dhe kujdesi ndaj detajeve ishin mbresëlënëse. Rekomandoj me kënaqësi!`,
    rating: 5,
    service: "Instalime Elektrike",
    avatar: "AK"
  },
  {
    name: "Besa Gashi",
    role: "Menaxhere Biznesi",
    content: `Kemi pasur një defekt urgjent në zyrë dhe ekipi i Bujo Electric erdhi brenda 30 minutave. E zgjidhën problemin shpejt dhe me një çmim shumë korrekt. Faleminderit për shërbimin!`,
    rating: 5,
    service: "Riparime Emergjente",
    avatar: "BG"
  },
  {
    name: "Driton Hoxha",
    role: "Pronar Restoranti",
    content: `Për mirëmbajtjen e rrjetit elektrik në restorantin tonë, ne i besojmë vetëm Bujo Electric. Janë të saktë, të pastër në punë dhe gjithmonë të gatshëm për të na ndihmuar.`,
    rating: 5,
    service: "Mirëmbajtje Industriale",
    avatar: "DH"
  },
  {
    name: "Liridona Berisha",
    role: "Kliente",
    content: `Instalimi i ndriçimit smart në kopshtin tonë doli më mirë se sa e kishim imagjinuar. Këshillat e tyre ishin shumë të vlefshme dhe rezultati final është fantastik.`,
    rating: 5,
    service: "Ndriçim Smart",
    avatar: "LB"
  }
]

export function TestimonialsSection({ city }: TestimonialsSectionProps = {}) {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-5">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 leading-tight">
            Çfarë thonë klientët tanë{city ? ` në ${city}` : ''}
          </h2>
          <p className="text-lg text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Përvoja e tyre është dëshmia më e mirë e përkushtimit tonë ndaj cilësisë dhe sigurisë elektrike.
          </p>
        </div>

        {/* Infinite Carousel */}
        <div className="relative mt-8 overflow-hidden py-8">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
          
          <motion.div 
            className="flex gap-6"
            animate={{
              x: [0, -1800],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 40,
                ease: "linear",
              },
            }}
          >
            {[...testimonials, ...testimonials, ...testimonials].map((t, i) => (
              <div
                key={i}
                className="min-w-[300px] md:min-w-[380px]"
              >
                <div className="bg-gray-50 border border-gray-100 p-8 rounded-3xl h-full flex flex-col hover:shadow-lg transition-all duration-500 group">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex gap-1">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                      ))}
                    </div>
                    <Quote className="w-8 h-8 text-primary/20 group-hover:text-primary/40 transition-colors" />
                  </div>
                  
                  <p className="text-lg text-gray-700 leading-relaxed mb-8 flex-grow italic">
                    &ldquo;{t.content}&rdquo;
                  </p>

                  <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-black text-lg group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {t.avatar}
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-bold text-base flex items-center gap-2">
                        {t.name}
                        <CheckCircle2 className="w-3 h-3 text-primary" />
                      </h4>
                      <p className="text-gray-500 text-xs">{t.role} • {t.service}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

 