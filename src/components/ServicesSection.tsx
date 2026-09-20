import React, { useState } from 'react';
import { Clock, Sparkles, Check, ArrowRight, MessageSquare, Tag } from 'lucide-react';
import { SPA_SERVICES, SPA_INFO } from '../data/spaData';
import { SpaService, ServiceCategory } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: SpaService) => void;
  onAskWhatsAppAboutService: (service: SpaService) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
  onAskWhatsAppAboutService
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories: { id: string; label: string }[] = [
    { id: 'all', label: 'All Therapies' },
    { id: 'massage', label: 'Restorative Massages' },
    { id: 'hammam', label: 'Turkish Hammam' },
    { id: 'hydrotherapy', label: 'Zakuzi Hydro' },
    { id: 'couples', label: 'Couples Sanctuary' },
    { id: 'scrub', label: 'Body Scrubs' }
  ];

  const filteredServices =
    activeCategory === 'all'
      ? SPA_SERVICES
      : SPA_SERVICES.filter((s) => s.category === activeCategory);

  return (
    <section id="services" className="py-24 bg-stone-100 text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block mb-3">
            World-Class Wellness In Thaltej
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-stone-900 tracking-tight">
            Curated <span className="italic text-amber-800">Spa Therapies</span>
          </h2>
          <div className="w-16 h-0.5 bg-amber-600/40 mx-auto my-4" />
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Every ritual is conducted by master practitioners using pure cold-pressed oils, organic aromatic botanicals, and therapeutic traditions designed to restore total equilibrium.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-stone-900 text-white shadow-md'
                    : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group bg-white rounded-2xl overflow-hidden border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden bg-stone-200">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent" />

                {/* Badge Tag */}
                <div className="absolute top-3 left-3">
                  <span className="bg-stone-900/80 backdrop-blur-md text-amber-300 text-xs px-2.5 py-1 rounded-full font-medium border border-stone-700">
                    {service.tag}
                  </span>
                </div>

                {/* Duration Pill */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white bg-stone-900/80 backdrop-blur-sm px-2.5 py-1 rounded-md">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{service.durationMinutes} Minutes</span>
                </div>

                {/* Price Display */}
                <div className="absolute bottom-3 right-3 text-right">
                  <span className="text-xl font-serif font-bold text-amber-300 drop-shadow">
                    ₹{service.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-serif font-semibold text-stone-900 mb-2 group-hover:text-amber-700 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-stone-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {service.description}
                  </p>

                  {/* Key Benefits */}
                  <div className="space-y-1.5 mb-6 pt-3 border-t border-stone-100">
                    {service.benefits.slice(0, 3).map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-stone-700">
                        <Check className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-stone-100 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => onSelectServiceForBooking(service)}
                    className="w-full py-2.5 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>Book Slot</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>

                  <button
                    onClick={() => onAskWhatsAppAboutService(service)}
                    className="w-full py-2.5 px-3 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Ask on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Packages Note */}
        <div className="mt-16 bg-amber-50 rounded-2xl p-6 sm:p-8 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-200/70 flex items-center justify-center text-amber-800 flex-shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-serif font-bold text-amber-950">
                Custom Corporate, Bridal &amp; Wellness Packages
              </h4>
              <p className="text-sm text-amber-900/80 mt-0.5">
                Planning a special celebration or regular weekly rejuvenation routine? Contact our Thaltej spa manager for tailored membership rates.
              </p>
            </div>
          </div>
          <a
            href={`https://wa.me/${SPA_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Blossom Spa, I would like to inquire about custom wellness packages and membership offers.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold flex items-center gap-2 flex-shrink-0 shadow transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Chat with Spa Manager</span>
          </a>
        </div>
      </div>
    </section>
  );
};
