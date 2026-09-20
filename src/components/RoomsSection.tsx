import React, { useState } from 'react';
import { Sparkles, CheckCircle2, Waves, Flame, Heart, Crown } from 'lucide-react';
import { SPA_ROOMS } from '../data/spaData';
import { SpaRoom } from '../types';

interface RoomsSectionProps {
  onSelectRoomForBooking: (room: SpaRoom) => void;
}

export const RoomsSection: React.FC<RoomsSectionProps> = ({ onSelectRoomForBooking }) => {
  const [selectedRoom, setSelectedRoom] = useState<SpaRoom>(SPA_ROOMS[0]);

  const getIconForRoom = (id: string) => {
    switch (id) {
      case 'turkish-hammam':
        return <Flame className="w-4 h-4 text-amber-500" />;
      case 'zakuzi-suite':
        return <Waves className="w-4 h-4 text-sky-400" />;
      case 'vip-couples':
        return <Heart className="w-4 h-4 text-rose-400" />;
      case 'maharaja-room':
        return <Crown className="w-4 h-4 text-amber-400" />;
      default:
        return <Sparkles className="w-4 h-4 text-amber-400" />;
    }
  };

  return (
    <section id="rooms" className="py-24 bg-stone-900 text-stone-100 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 bg-amber-950/80 border border-amber-800/60 px-3 py-1 rounded-full inline-block mb-3">
            Private Sanctuaries
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif font-normal text-stone-50 tracking-tight">
            Luxury <span className="italic text-amber-300">Treatment Rooms</span>
          </h2>
          <div className="w-16 h-0.5 bg-amber-500/40 mx-auto my-4" />
          <p className="text-stone-300 text-base sm:text-lg leading-relaxed">
            Each suite in our Thaltej center is an enclosed private retreat, acoustically isolated with warm lighting and sterile climate controls for your complete peace.
          </p>

          {/* Room Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {SPA_ROOMS.map((room) => {
              const isSelected = selectedRoom.id === room.id;
              return (
                <button
                  key={room.id}
                  onClick={() => setSelectedRoom(room)}
                  className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-2 border ${
                    isSelected
                      ? 'bg-amber-500 text-stone-950 border-amber-400 font-bold shadow-lg shadow-amber-500/20 scale-105'
                      : 'bg-stone-800/80 text-stone-300 hover:text-white hover:bg-stone-800 border-stone-700'
                  }`}
                >
                  {getIconForRoom(room.id)}
                  <span>{room.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Featured Room Showcase */}
        <div className="bg-stone-800/90 rounded-3xl overflow-hidden border border-stone-700/80 shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Left: High-res Room Image with badges */}
          <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-[480px] bg-stone-950">
            <img
              src={selectedRoom.image}
              alt={selectedRoom.name}
              className="w-full h-full object-cover object-center filter brightness-90 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent lg:hidden" />

            <div className="absolute top-4 left-4">
              <span className="bg-stone-950/80 backdrop-blur-md text-amber-300 border border-amber-500/40 text-xs px-3 py-1.5 rounded-full font-semibold">
                {selectedRoom.badge}
              </span>
            </div>

            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-stone-300 bg-stone-950/80 backdrop-blur-md p-3 rounded-xl border border-stone-800">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Sanitized &amp; Temperature Controlled
              </span>
              <span>Capacity: {selectedRoom.capacity} Guest{selectedRoom.capacity > 1 ? 's' : ''}</span>
            </div>
          </div>

          {/* Right: Room Details & Amenities */}
          <div className="lg:col-span-5 p-8 sm:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedRoom.tagline}</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-4">
                {selectedRoom.name}
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed mb-6 font-light">
                {selectedRoom.description}
              </p>

              {/* Architectural features list */}
              <div className="mb-8">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                  Suite Highlights &amp; Features:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedRoom.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-xs text-stone-200 bg-stone-900/60 p-2.5 rounded-lg border border-stone-700/50"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-stone-700/60 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => onSelectRoomForBooking(selectedRoom)}
                className="flex-1 py-3 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold text-xs uppercase tracking-wider text-center shadow-lg transition-all"
              >
                Request This Room
              </button>
              <a
                href={`https://wa.me/919574156515?text=${encodeURIComponent(`Hello Blossom Spa, I would like to reserve the ${selectedRoom.name} for my visit.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 px-4 rounded-xl bg-stone-700 hover:bg-stone-600 text-stone-100 font-medium text-xs text-center border border-stone-600 transition-colors"
              >
                Inquire on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Gallery Strip with authentic venue images */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { img: '/images/IMG_3873.png', title: 'Soothing Ambiance' },
            { img: '/images/oil-room/IMG_4261.jpg', title: 'Aroma Oil Suite' },
            { img: '/images/dry-room/IMG_4249.jpg', title: 'Maharaja Tatami' },
            { img: '/images/IMG_3879.png', title: 'Spa Details' }
          ].map((item, idx) => (
            <div
              key={idx}
              className="group relative h-36 sm:h-44 rounded-2xl overflow-hidden border border-stone-800 bg-stone-950"
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-full object-cover filter brightness-75 group-hover:brightness-100 group-hover:scale-110 transition-all duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-transparent to-transparent" />
              <p className="absolute bottom-2.5 left-3 text-xs font-medium text-stone-200 drop-shadow">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
