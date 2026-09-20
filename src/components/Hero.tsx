import React from 'react';
import { Calendar, MessageSquare, Star, Sparkles, MapPin, ShieldCheck, HeartHandshake } from 'lucide-react';
import { SPA_INFO } from '../data/spaData';

interface HeroProps {
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onOpenWhatsApp }) => {
  return (
    <section id="home" className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-stone-950 text-white">
      {/* Background Image with warm rich dark gradient overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/IMG_3858.png"
          alt="Blossom Spa Ahmedabad luxury interior and hydrotherapy"
          className="w-full h-full object-cover object-center filter brightness-45 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/60 to-stone-950/40" />
        <div className="absolute inset-0 bg-radial from-amber-900/10 via-transparent to-stone-950/80 pointer-events-none" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        {/* Rating Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-stone-900/80 border border-amber-500/40 backdrop-blur-md mb-6 shadow-xl">
          <div className="flex text-amber-400">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            ))}
          </div>
          <span className="text-xs font-semibold text-stone-200">
            {SPA_INFO.googleRating}★ Google Reviews
          </span>
          <span className="text-stone-500 text-xs">•</span>
          <span className="text-xs text-amber-300/90 font-medium">150+ Verified Guests in Thaltej</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-stone-50 font-normal leading-tight max-w-4xl">
          Rejuvenate <br />
          <span className="italic font-light text-amber-300">Body &amp; Soul</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-lg sm:text-xl text-stone-300 max-w-2xl font-light leading-relaxed">
          An authentic sanctuary of absolute tranquility nestled in Thaltej, Ahmedabad.
          Experience our signature <span className="text-amber-200 font-medium">Turkish Hammam</span>,
          heated marble platforms, <span className="text-amber-200 font-medium">Zakuzi hydrotherapy</span>, and restorative massages.
        </p>

        {/* Action CTAs */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button
            id="hero-book-appointment-btn"
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm sm:text-base tracking-wide shadow-lg shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
          >
            <Calendar className="w-5 h-5" />
            <span>Book Your Session</span>
          </button>

          <button
            id="hero-whatsapp-concierge-btn"
            onClick={onOpenWhatsApp}
            className="w-full sm:w-auto px-7 py-4 rounded-xl bg-emerald-600/90 hover:bg-emerald-600 text-white font-semibold text-sm sm:text-base border border-emerald-400/40 shadow-lg shadow-emerald-950/50 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2.5"
          >
            <MessageSquare className="w-5 h-5 text-emerald-200" />
            <span>AI WhatsApp Concierge</span>
          </button>

          <a
            href="#services"
            className="w-full sm:w-auto px-6 py-4 rounded-xl bg-stone-900/60 hover:bg-stone-800 text-stone-200 font-medium text-sm sm:text-base border border-stone-700/80 backdrop-blur-sm transition-all text-center"
          >
            View Menu &amp; Rates
          </a>
        </div>

        {/* Trust Badges */}
        <div className="mt-14 pt-8 border-t border-stone-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6 text-left w-full">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400">Authentic</p>
              <p className="text-sm font-semibold text-stone-200">Turkish Hammam</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400">Highest Standards</p>
              <p className="text-sm font-semibold text-stone-200">Private Hygiene Suites</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400">Certified Staff</p>
              <p className="text-sm font-semibold text-stone-200">Expert Therapists</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-stone-400">Prime Location</p>
              <p className="text-sm font-semibold text-stone-200">Thaltej, Ahmedabad</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
