import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { RoomsSection } from './components/RoomsSection';
import { ReviewsSection } from './components/ReviewsSection';
import { LocationSection } from './components/LocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { ManagementPortal } from './components/ManagementPortal';
import { INITIAL_APPOINTMENTS } from './data/spaData';
import { SpaService, SpaRoom, Appointment } from './types';

export function App() {
  const [activeView, setActiveView] = useState<'client' | 'management'>('client');
  const [appointments, setAppointments] = useState<Appointment[]>(INITIAL_APPOINTMENTS);

  // Modals state
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [isWhatsAppOpen, setIsWhatsAppOpen] = useState<boolean>(false);
  const [preSelectedService, setPreSelectedService] = useState<SpaService | null>(null);
  const [preSelectedRoom, setPreSelectedRoom] = useState<SpaRoom | null>(null);
  const [whatsAppInitialQuery, setWhatsAppInitialQuery] = useState<string | undefined>(undefined);

  // Fetch initial appointments from backend API
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const res = await fetch('/api/appointments');
        const data = await res.json();
        if (data.success && Array.isArray(data.appointments) && data.appointments.length > 0) {
          setAppointments(data.appointments);
        }
      } catch (err) {
        console.log('Using initial client appointment datasets');
      }
    };
    fetchAppointments();
  }, []);

  const handleOpenBooking = (service?: SpaService, room?: SpaRoom) => {
    setPreSelectedService(service || null);
    setPreSelectedRoom(room || null);
    setIsBookingOpen(true);
  };

  const handleOpenWhatsApp = (query?: string) => {
    setWhatsAppInitialQuery(query);
    setIsWhatsAppOpen(true);
  };

  const handleAppointmentBooked = (newApt: Appointment) => {
    setAppointments((prev) => [newApt, ...prev]);
  };

  const handleUpdateAppointment = (updated: Appointment) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === updated.id ? updated : a))
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900 selection:bg-amber-200 selection:text-amber-900">
      {/* Navigation Header */}
      <Navbar
        activeView={activeView}
        onToggleView={(view) => setActiveView(view)}
        onOpenBooking={() => handleOpenBooking()}
        onOpenWhatsApp={() => handleOpenWhatsApp()}
      />

      {/* Main View Router */}
      {activeView === 'management' ? (
        <ManagementPortal
          appointments={appointments}
          onUpdateAppointment={handleUpdateAppointment}
          onExitManagement={() => setActiveView('client')}
          onOpenNewBooking={() => handleOpenBooking()}
        />
      ) : (
        <main className="flex-1">
          {/* Hero Section */}
          <Hero
            onOpenBooking={() => handleOpenBooking()}
            onOpenWhatsApp={() => handleOpenWhatsApp()}
          />

          {/* Curated Spa Therapies & Rates */}
          <ServicesSection
            onSelectServiceForBooking={(service) => handleOpenBooking(service)}
            onAskWhatsAppAboutService={(service) =>
              handleOpenWhatsApp(`Can you tell me more about ${service.name} and available timings?`)
            }
          />

          {/* Authentic Luxury Suites Showcase */}
          <RoomsSection
            onSelectRoomForBooking={(room) => handleOpenBooking(undefined, room)}
          />

          {/* Google Reviews Breakdown & Verifications */}
          <ReviewsSection />

          {/* Detailed Location, Phone, Map & Hours in Thaltej */}
          <LocationSection />
        </main>
      )}

      {/* Global Footer (Client View) */}
      {activeView === 'client' && (
        <Footer
          onOpenBooking={() => handleOpenBooking()}
          onOpenWhatsApp={() => handleOpenWhatsApp()}
          onOpenManagement={() => setActiveView('management')}
        />
      )}

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preSelectedService={preSelectedService}
        preSelectedRoom={preSelectedRoom}
        onAppointmentBooked={handleAppointmentBooked}
      />

      {/* AI WhatsApp Message Integration Widget & Concierge */}
      <WhatsAppWidget
        isOpen={isWhatsAppOpen}
        onClose={() => setIsWhatsAppOpen(false)}
        onToggle={() => setIsWhatsAppOpen(!isWhatsAppOpen)}
        onOpenBooking={() => handleOpenBooking()}
        initialQuery={whatsAppInitialQuery}
      />
    </div>
  );
}

export default App;
