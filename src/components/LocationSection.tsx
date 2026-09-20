import React from 'react';
import { MapPin, Phone, MessageSquare, Clock, Mail, Navigation, Car, ShieldAlert } from 'lucide-react';
import { SPA_INFO } from '../data/spaData';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-24 bg-white text-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-700 bg-amber-100 px-3 py-1 rounded-full inline-block mb-3">
            Visit Our Sanctuary
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-stone-900 tracking-tight">
            Address &amp; <span className="italic text-amber-800">Location Details</span>
          </h2>
          <div className="w-16 h-0.5 bg-amber-600/40 mx-auto my-4" />
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Conveniently situated in Thaltej, Ahmedabad, with tranquil private surroundings and hassle-free vehicle parking.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Contact Info Cards & Landmarks */}
          <div className="lg:col-span-5 space-y-4">
            {/* Address Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 flex-shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-1">
                  Spa Address
                </h3>
                <p className="text-stone-700 text-sm font-medium leading-relaxed">
                  {SPA_INFO.address}
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Landmark: Near Bhagwat Bungalows, Thaltej, Ahmedabad
                </p>
                <div className="mt-3">
                  <a
                    href={SPA_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 hover:text-amber-800 bg-amber-50 px-3 py-1.5 rounded-lg border border-amber-200 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Turn-by-Turn Directions</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-800 flex-shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-1">
                  Phone &amp; WhatsApp
                </h3>
                <div className="space-y-1">
                  <p className="text-stone-800 text-sm font-semibold">
                    Direct Line:{' '}
                    <a href={`tel:${SPA_INFO.phone}`} className="text-amber-700 hover:underline">
                      {SPA_INFO.displayPhone}
                    </a>
                  </p>
                  <p className="text-stone-800 text-sm font-semibold">
                    WhatsApp Desk:{' '}
                    <a
                      href={`https://wa.me/${SPA_INFO.whatsappNumber}?text=${encodeURIComponent('Hello Blossom Spa, I would like to book an appointment.')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-emerald-700 hover:underline"
                    >
                      +91 95741 56515
                    </a>
                  </p>
                </div>
                <p className="text-xs text-stone-500 mt-1">
                  Instant scheduling &amp; automated customer support available 24/7 on WhatsApp.
                </p>
              </div>
            </div>

            {/* Timings Card */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 flex-shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-1">
                  Operating Hours
                </h3>
                <p className="text-stone-800 text-sm font-semibold">
                  Monday to Sunday: 10:00 AM – 9:00 PM
                </p>
                <p className="text-xs text-stone-500 mt-1">
                  Open 7 days a week, including public holidays. Last appointment booking at 8:00 PM.
                </p>
              </div>
            </div>

            {/* Email & Support */}
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-stone-200 flex items-center justify-center text-stone-700 flex-shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wider mb-1">
                  Email Desk
                </h3>
                <a
                  href={`mailto:${SPA_INFO.email}`}
                  className="text-stone-800 text-sm font-medium hover:text-amber-700 transition-colors"
                >
                  {SPA_INFO.email}
                </a>
                <p className="text-xs text-stone-500 mt-1">
                  For corporate memberships and management inquiries.
                </p>
              </div>
            </div>

            {/* Parking & Accessibility Info */}
            <div className="bg-stone-100 p-4 rounded-xl border border-stone-200 flex items-center gap-3 text-xs text-stone-700">
              <Car className="w-5 h-5 text-amber-700 flex-shrink-0" />
              <span>
                <strong>Parking Notice:</strong> Reserved private customer parking is available directly in front of the premises on Bhagwat Bungalows Rd.
              </span>
            </div>
          </div>

          {/* Right: Embedded Interactive Google Map & Direction Visualizer */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900 rounded-3xl overflow-hidden border border-stone-300 shadow-xl flex flex-col">
              {/* Map Title Bar */}
              <div className="bg-stone-900 text-white px-6 py-4 flex items-center justify-between border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-semibold tracking-wide">
                    Live Location: Blossom Spa, Thaltej, Ahmedabad
                  </span>
                </div>
                <a
                  href={SPA_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1"
                >
                  <span>Open in Google Maps App</span>
                  <Navigation className="w-3 h-3" />
                </a>
              </div>

              {/* Map iFrame */}
              <div className="relative w-full h-[460px] bg-stone-200">
                <iframe
                  title="Blossom Spa Thaltej Ahmedabad Location"
                  src={SPA_INFO.googleMapsEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating Map Pin Badge */}
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md p-3.5 rounded-xl shadow-lg border border-stone-200 max-w-xs pointer-events-none">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <h4 className="text-xs font-bold text-stone-900">Blossom Spa</h4>
                  </div>
                  <p className="text-[11px] text-stone-600 leading-tight">
                    101, Bhagwat Bungalows Rd, Thaltej, Ahmedabad
                  </p>
                  <p className="text-[10px] text-amber-700 font-semibold mt-1">
                    ★ 4.9 Rating (150+ Reviews)
                  </p>
                </div>
              </div>

              {/* Action bar below map */}
              <div className="bg-stone-900 p-4 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-300">
                <span>Coordinates: 23.0589° N, 72.5085° E</span>
                <div className="flex items-center gap-2">
                  <a
                    href={`tel:${SPA_INFO.phone}`}
                    className="px-3 py-1.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg transition-colors"
                  >
                    Call Reception
                  </a>
                  <a
                    href={`https://wa.me/${SPA_INFO.whatsappNumber}?text=${encodeURIComponent('Hi, I need directions to Blossom Spa in Thaltej.')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg flex items-center gap-1.5 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>WhatsApp Location</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
