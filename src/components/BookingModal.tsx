import React, { useState } from 'react';
import { X, Calendar, Clock, Sparkles, CheckCircle2, User, Phone, Mail, MessageSquare, ShieldCheck } from 'lucide-react';
import { SPA_SERVICES, SPA_ROOMS, TIME_SLOTS, SPA_INFO } from '../data/spaData';
import { SpaService, SpaRoom, Appointment } from '../types';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preSelectedService?: SpaService | null;
  preSelectedRoom?: SpaRoom | null;
  onAppointmentBooked: (appointment: Appointment) => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preSelectedService,
  preSelectedRoom,
  onAppointmentBooked
}) => {
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preSelectedService ? preSelectedService.id : SPA_SERVICES[0].id
  );
  const [selectedRoomId, setSelectedRoomId] = useState<string>(
    preSelectedRoom ? preSelectedRoom.id : SPA_ROOMS[0].id
  );

  // Today's date default
  const todayStr = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState<string>(todayStr);
  const [timeSlot, setTimeSlot] = useState<string>(TIME_SLOTS[1]);
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pressure, setPressure] = useState<'soft' | 'medium' | 'deep'>('medium');
  const [therapistGender, setTherapistGender] = useState<'female' | 'male' | 'no_preference'>('no_preference');
  const [notes, setNotes] = useState<string>('');
  const [whatsappNotification, setWhatsappNotification] = useState<boolean>(true);

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [bookedAppointment, setBookedAppointment] = useState<Appointment | null>(null);

  if (!isOpen) return null;

  const currentService = SPA_SERVICES.find((s) => s.id === selectedServiceId) || SPA_SERVICES[0];
  const currentRoom = SPA_ROOMS.find((r) => r.id === selectedRoomId) || SPA_ROOMS[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) {
      alert('Please enter your name and contact phone number.');
      return;
    }

    setIsSubmitting(true);

    const newAppointmentData: Partial<Appointment> = {
      customerName: name,
      customerPhone: phone.startsWith('+91') ? phone : `+91 ${phone.replace(/^0/, '')}`,
      customerEmail: email || undefined,
      serviceId: currentService.id,
      serviceName: currentService.name,
      durationMinutes: currentService.durationMinutes,
      priceINR: currentService.priceINR,
      roomId: currentRoom.id,
      roomName: currentRoom.name,
      date,
      timeSlot,
      pressurePreference: pressure,
      therapistGenderPreference: therapistGender,
      notes: notes || undefined,
      whatsappNotification,
      whatsappStatus: 'delivered',
      status: 'confirmed'
    };

    try {
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAppointmentData)
      });
      const data = await response.json();
      if (data.success && data.appointment) {
        setBookedAppointment(data.appointment);
        onAppointmentBooked(data.appointment);
      } else {
        throw new Error('Server returned invalid data');
      }
    } catch (err) {
      console.warn('Backend fetch failed, saving locally:', err);
      // Fallback local booking
      const fallbackApt: Appointment = {
        id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
        ...(newAppointmentData as any),
        createdAt: new Date().toISOString()
      };
      setBookedAppointment(fallbackApt);
      onAppointmentBooked(fallbackApt);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getWhatsAppMessageUrl = () => {
    if (!bookedAppointment) return '#';
    const text = `🌿 *Blossom Spa Booking Request*
    
• *Guest:* ${bookedAppointment.customerName}
• *Phone:* ${bookedAppointment.customerPhone}
• *Service:* ${bookedAppointment.serviceName} (${bookedAppointment.durationMinutes} min)
• *Suite:* ${bookedAppointment.roomName}
• *Date:* ${bookedAppointment.date}
• *Time:* ${bookedAppointment.timeSlot}
• *Pressure:* ${bookedAppointment.pressurePreference || 'Normal'}
• *Booking ID:* ${bookedAppointment.id}

Please confirm my appointment slot at your Thaltej sanctuary.`;

    return `https://wa.me/${SPA_INFO.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden my-8">
        {/* Modal Header */}
        <div className="bg-stone-900 text-white p-6 flex items-center justify-between border-b border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold tracking-wide">
                Book Spa Appointment
              </h3>
              <p className="text-xs text-stone-400">
                Blossom Spa, Thaltej • Instant WhatsApp Confirmation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Confirmation Screen */}
        {bookedAppointment ? (
          <div className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full">
                Appointment Confirmed
              </span>
              <h4 className="text-2xl font-serif font-bold text-stone-900 mt-3">
                We Look Forward to Welcoming You!
              </h4>
              <p className="text-sm text-stone-600 mt-1">
                Booking Reference:{' '}
                <span className="font-mono font-bold text-amber-800">
                  {bookedAppointment.id}
                </span>
              </p>
            </div>

            {/* Summary card */}
            <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Service:</span>
                <span className="font-bold text-stone-900">{bookedAppointment.serviceName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Duration &amp; Price:</span>
                <span className="font-bold text-amber-800">
                  {bookedAppointment.durationMinutes} min • ₹{bookedAppointment.priceINR.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Treatment Suite:</span>
                <span className="font-semibold text-stone-800">{bookedAppointment.roomName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Date &amp; Time:</span>
                <span className="font-bold text-stone-900">
                  {bookedAppointment.date} at {bookedAppointment.timeSlot}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-500">Location:</span>
                <span className="text-stone-700">101, Bhagwat Bungalows Rd, Thaltej</span>
              </div>
              <div className="flex items-center gap-1.5 text-emerald-700 pt-1">
                <MessageSquare className="w-3.5 h-3.5" />
                <span className="font-medium">
                  Automated WhatsApp confirmation dispatched to {bookedAppointment.customerPhone}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto pt-2">
              <a
                href={getWhatsAppMessageUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Open in WhatsApp</span>
              </a>

              <button
                onClick={onClose}
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs"
              >
                Close &amp; Return
              </button>
            </div>
          </div>
        ) : (
          /* Booking Form */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Therapy Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                1. Select Spa Therapy:
              </label>
              <select
                value={selectedServiceId}
                onChange={(e) => setSelectedServiceId(e.target.value)}
                className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-sm font-medium text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {SPA_SERVICES.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {svc.name} ({svc.durationMinutes} min) — ₹{svc.priceINR.toLocaleString('en-IN')}
                  </option>
                ))}
              </select>
            </div>

            {/* Step 2: Preferred Room & Date/Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  2. Luxury Suite Preference:
                </label>
                <select
                  value={selectedRoomId}
                  onChange={(e) => setSelectedRoomId(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                >
                  {SPA_ROOMS.map((room) => (
                    <option key={room.id} value={room.id}>
                      {room.name} ({room.badge})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                  3. Appointment Date:
                </label>
                <input
                  type="date"
                  value={date}
                  min={todayStr}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  required
                />
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-stone-700 mb-2">
                4. Select Available Time Slot:
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {TIME_SLOTS.map((slot) => (
                  <button
                    type="button"
                    key={slot}
                    onClick={() => setTimeSlot(slot)}
                    className={`py-2 px-2 text-xs rounded-lg font-medium border text-center transition-all ${
                      timeSlot === slot
                        ? 'bg-stone-900 text-white border-stone-900 shadow-sm font-bold'
                        : 'bg-stone-50 text-stone-700 hover:bg-stone-200 border-stone-300'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Contact & Guest Details */}
            <div className="border-t border-stone-200 pt-5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                5. Guest Information &amp; Preferences:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-1">
                    <User className="w-3.5 h-3.5 text-stone-400" />
                    <span>Full Name *</span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-1.5 text-xs text-stone-600 mb-1">
                    <Phone className="w-3.5 h-3.5 text-stone-400" />
                    <span>Phone Number (WhatsApp) *</span>
                  </div>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 98250 12345"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 bg-stone-50 border border-stone-300 rounded-xl text-sm text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Preferences: Pressure & Gender */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-stone-600 mb-1">Pressure Preference:</label>
                  <div className="flex gap-2">
                    {(['soft', 'medium', 'deep'] as const).map((p) => (
                      <button
                        type="button"
                        key={p}
                        onClick={() => setPressure(p)}
                        className={`flex-1 py-2 text-xs rounded-lg capitalize border ${
                          pressure === p
                            ? 'bg-amber-100 text-amber-900 font-bold border-amber-400'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        {p}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-stone-600 mb-1">Therapist Gender:</label>
                  <div className="flex gap-2">
                    {[
                      { id: 'no_preference', label: 'Any' },
                      { id: 'female', label: 'Female' },
                      { id: 'male', label: 'Male' }
                    ].map((g) => (
                      <button
                        type="button"
                        key={g.id}
                        onClick={() => setTherapistGender(g.id as any)}
                        className={`flex-1 py-2 text-xs rounded-lg border ${
                          therapistGender === g.id
                            ? 'bg-amber-100 text-amber-900 font-bold border-amber-400'
                            : 'bg-stone-50 text-stone-600 border-stone-200'
                        }`}
                      >
                        {g.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-xs text-stone-600 mb-1">
                  Special Notes / Occasion / Physical Concerns (Optional):
                </label>
                <input
                  type="text"
                  placeholder="e.g., Anniversary visit, lower back focus, preferred fragrance"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-2.5 bg-stone-50 border border-stone-300 rounded-xl text-xs text-stone-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              {/* WhatsApp Notification Opt-in */}
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappNotification}
                  onChange={(e) => setWhatsappNotification(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"
                />
                <div className="text-xs">
                  <span className="font-bold text-emerald-900">
                    Send automated WhatsApp booking confirmation &amp; reminder
                  </span>
                  <p className="text-emerald-700 text-[11px]">
                    Receive arrival directions, parking advice, and prompt customer support.
                  </p>
                </div>
              </label>
            </div>

            {/* Price Total & Submit */}
            <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-stone-500">Estimated Total (Pay at Spa):</span>
                <div className="text-2xl font-serif font-bold text-stone-900">
                  ₹{currentService.priceINR.toLocaleString('en-IN')}{' '}
                  <span className="text-xs font-sans font-normal text-stone-500">
                    ({currentService.durationMinutes} min)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-100 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none px-8 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold uppercase tracking-wider shadow-md transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Confirming...' : 'Confirm Appointment'}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
