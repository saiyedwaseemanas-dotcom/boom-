import React, { useState, useEffect } from 'react';
import { Sparkles, Phone, MessageSquare, Calendar, ShieldCheck, Menu, X, LayoutDashboard, Clock, MapPin } from 'lucide-react';
import { SPA_INFO } from '../data/spaData';

interface NavbarProps {
  activeView: 'client' | 'management';
  onToggleView: (view: 'client' | 'management') => void;
  onOpenBooking: () => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeView,
  onToggleView,
  onOpenBooking,
  onOpenWhatsApp
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Notification Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              Ahmedabad’s Premier Turkish Hammam & Luxury Wellness
            </span>
            <span className="hidden md:inline text-stone-500">•</span>
            <span className="hidden md:flex items-center gap-1 text-stone-400">
              <Clock className="w-3.5 h-3.5 text-stone-400" />
              Open Daily: 10:00 AM – 9:00 PM
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={SPA_INFO.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-stone-300 hover:text-amber-300 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Thaltej, Ahmedabad</span>
            </a>
            <span className="text-stone-600">|</span>
            <a
              href={`tel:${SPA_INFO.phone}`}
              className="flex items-center gap-1 text-amber-300 font-semibold hover:text-amber-200 transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>{SPA_INFO.displayPhone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Sticky Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          scrolled
            ? 'bg-stone-900/95 backdrop-blur-md shadow-lg border-b border-stone-800 py-3'
            : 'bg-stone-900 border-b border-stone-800/60 py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={() => {
              if (activeView === 'management') onToggleView('client');
            }}
            className="group flex items-center gap-3 focus:outline-none"
            id="brand-logo"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-amber-500 to-amber-300 flex items-center justify-center text-stone-950 font-serif font-bold text-xl shadow-md group-hover:scale-105 transition-transform">
              B
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-serif tracking-wide text-stone-100 font-medium">
                  Blossom
                </span>
                <span className="text-2xl font-serif italic text-amber-400 font-light">
                  Spa
                </span>
              </div>
              <p className="text-[10px] tracking-widest text-stone-400 uppercase font-sans -mt-1">
                Thaltej • Ahmedabad
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8">
            <a
              href="#services"
              onClick={() => activeView === 'management' && onToggleView('client')}
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors"
            >
              Treatments
            </a>
            <a
              href="#rooms"
              onClick={() => activeView === 'management' && onToggleView('client')}
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors"
            >
              Luxury Rooms
            </a>
            <a
              href="#reviews"
              onClick={() => activeView === 'management' && onToggleView('client')}
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors flex items-center gap-1"
            >
              <span>Google Reviews</span>
              <span className="bg-amber-400/20 text-amber-300 text-xs px-1.5 py-0.5 rounded font-bold">
                4.9 ★
              </span>
            </a>
            <a
              href="#location"
              onClick={() => activeView === 'management' && onToggleView('client')}
              className="text-sm font-medium text-stone-300 hover:text-amber-400 transition-colors"
            >
              Location & Hours
            </a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            {/* View Switcher Button (Spa Management vs Client Website) */}
            <button
              id="management-toggle-btn"
              onClick={() => onToggleView(activeView === 'client' ? 'management' : 'client')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold tracking-wide border transition-all ${
                activeView === 'management'
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-md ring-2 ring-amber-400/30'
                  : 'bg-stone-800/80 hover:bg-stone-800 text-stone-300 hover:text-amber-300 border-stone-700'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>{activeView === 'management' ? 'Exit Management' : 'Spa Management'}</span>
            </button>

            {/* AI WhatsApp Chat Button */}
            <button
              id="nav-whatsapp-btn"
              onClick={onOpenWhatsApp}
              className="flex items-center gap-1.5 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-400 border border-emerald-500/40 px-3.5 py-2 rounded-lg text-xs font-semibold transition-all"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp AI</span>
            </button>

            {/* Book Now Button */}
            <button
              id="nav-book-btn"
              onClick={onOpenBooking}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider shadow-md hover:shadow-amber-500/20 transition-all hover:scale-[1.02]"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Book Appointment</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => onToggleView(activeView === 'client' ? 'management' : 'client')}
              className="p-2 rounded-lg bg-stone-800 text-amber-400 text-xs flex items-center gap-1 border border-stone-700"
              title="Toggle Management Portal"
            >
              <LayoutDashboard className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-stone-800 text-stone-200 hover:text-amber-400 focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-stone-900 border-b border-stone-800 px-4 pt-3 pb-6 space-y-3">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  onToggleView(activeView === 'client' ? 'management' : 'client');
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 rounded-lg text-xs font-medium text-center flex items-center justify-center gap-1.5 border ${
                  activeView === 'management'
                    ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                    : 'bg-stone-800 text-stone-300 border-stone-700'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                {activeView === 'management' ? 'Client View' : 'Manager Portal'}
              </button>
              <button
                onClick={() => {
                  onOpenWhatsApp();
                  setMobileMenuOpen(false);
                }}
                className="py-2 px-3 rounded-lg text-xs font-medium text-center bg-emerald-600/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WhatsApp AI
              </button>
            </div>

            <div className="space-y-1">
              <a
                href="#services"
                onClick={() => {
                  if (activeView === 'management') onToggleView('client');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-amber-400 hover:bg-stone-800"
              >
                Spa Treatments & Rates
              </a>
              <a
                href="#rooms"
                onClick={() => {
                  if (activeView === 'management') onToggleView('client');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-amber-400 hover:bg-stone-800"
              >
                Turkish Hammam & Suites
              </a>
              <a
                href="#reviews"
                onClick={() => {
                  if (activeView === 'management') onToggleView('client');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-amber-400 hover:bg-stone-800"
              >
                Google Reviews (4.9 ★)
              </a>
              <a
                href="#location"
                onClick={() => {
                  if (activeView === 'management') onToggleView('client');
                  setMobileMenuOpen(false);
                }}
                className="block px-3 py-2 rounded-md text-base font-medium text-stone-300 hover:text-amber-400 hover:bg-stone-800"
              >
                Location in Thaltej
              </a>
            </div>

            <div className="pt-2 border-t border-stone-800 flex flex-col gap-2">
              <button
                onClick={() => {
                  onOpenBooking();
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-sm rounded-lg flex items-center justify-center gap-2 shadow"
              >
                <Calendar className="w-4 h-4" />
                Book Spa Appointment
              </button>
              <a
                href={`tel:${SPA_INFO.phone}`}
                className="w-full py-2.5 bg-stone-800 text-stone-200 text-center rounded-lg text-sm flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                Call {SPA_INFO.displayPhone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
