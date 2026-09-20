import React from 'react';
import { Sparkles, Phone, MessageSquare, MapPin, Clock, Star, Heart } from 'lucide-react';
import { SPA_INFO } from '../data/spaData';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
  onOpenManagement: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenWhatsApp,
  onOpenManagement
}) => {
  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-stone-800/80">
          {/* Col 1: Brand & Philosophy */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-amber-600 to-amber-400 flex items-center justify-center text-stone-950 font-serif font-bold text-lg">
                B
              </div>
              <span className="text-xl font-serif text-white tracking-wide">
                Blossom <span className="italic text-amber-400 font-light">Spa</span>
              </span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Ahmedabad’s premier destination for authentic Turkish Hammam, Zakuzi hydrotherapy, and holistic botanical massages in Thaltej.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
              <span className="font-bold">{SPA_INFO.googleRating} / 5.0</span>
              <span className="text-stone-500">• 150+ Google Reviews</span>
            </div>
          </div>

          {/* Col 2: Signature Therapies */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Signature Treatments
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Turkish Hammam &amp; Foam Cloud
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Hydrotherapy Zakuzi Bath
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Swedish Relaxation Massage
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Couples Wellness Retreat
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-amber-300 transition-colors">
                  Maharaja Royal Dry Therapy
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Address */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Sanctuary Contact
            </h4>
            <div className="space-y-2 text-xs text-stone-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <span>{SPA_INFO.address}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <a href={`tel:${SPA_INFO.phone}`} className="hover:text-amber-300">
                  {SPA_INFO.displayPhone}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <a
                  href={`https://wa.me/${SPA_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Blossom Spa')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 hover:underline"
                >
                  WhatsApp: +91 95741 56515
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-stone-500 flex-shrink-0" />
                <span>10:00 AM – 9:00 PM (Every Day)</span>
              </p>
            </div>
          </div>

          {/* Col 4: Quick Actions & Management */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Instant Scheduling
            </h4>
            <p className="text-xs text-stone-400">
              Reserve your slot with instant WhatsApp confirmation or chat directly with our AI assistant.
            </p>
            <div className="space-y-2 pt-1">
              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-3 rounded-lg bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs shadow transition-all"
              >
                Book Appointment
              </button>
              <button
                onClick={onOpenWhatsApp}
                className="w-full py-2.5 px-3 rounded-lg bg-emerald-700/60 hover:bg-emerald-600 text-white font-medium text-xs border border-emerald-500/40 transition-all flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Open WhatsApp AI Concierge</span>
              </button>
              <button
                onClick={onOpenManagement}
                className="w-full py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-amber-300 text-[11px] border border-stone-800 transition-all"
              >
                Spa Owner / Staff Management Portal →
              </button>
            </div>
          </div>
        </div>

        {/* Bottom copyright & attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Blossom Spa Ahmedabad. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Crafted for true wellness in Thaltej, Gujarat</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
