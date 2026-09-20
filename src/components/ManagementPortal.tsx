import React, { useState } from 'react';
import {
  LayoutDashboard,
  Calendar,
  Users,
  DoorOpen,
  MessageSquare,
  Star,
  CheckCircle,
  Clock,
  Send,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Phone,
  RefreshCw,
  Search,
  Filter,
  ArrowUpRight,
  ShieldCheck
} from 'lucide-react';
import { SPA_ROOMS, SPA_SERVICES, THERAPISTS, GOOGLE_REVIEWS, SPA_INFO } from '../data/spaData';
import { Appointment, SpaRoom, Therapist } from '../types';

interface ManagementPortalProps {
  appointments: Appointment[];
  onUpdateAppointment: (updated: Appointment) => void;
  onExitManagement: () => void;
  onOpenNewBooking: () => void;
}

export const ManagementPortal: React.FC<ManagementPortalProps> = ({
  appointments,
  onUpdateAppointment,
  onExitManagement,
  onOpenNewBooking
}) => {
  const [activeTab, setActiveTab] = useState<'appointments' | 'rooms' | 'whatsapp' | 'customers' | 'reviews'>('appointments');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Notification Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // WhatsApp broadcast state
  const [broadcastTarget, setBroadcastTarget] = useState<string>('all_today');
  const [broadcastTemplate, setBroadcastTemplate] = useState<string>(
    'Reminder: Your luxury spa appointment at Blossom Spa Thaltej is scheduled today. Please arrive 10 minutes prior for welcoming herbal tea.'
  );
  const [isSendingBroadcast, setIsSendingBroadcast] = useState<boolean>(false);

  // Local rooms state to allow toggling status (Available, In Session, Cleaning)
  const [rooms, setRooms] = useState<SpaRoom[]>(SPA_ROOMS);

  // Filtered Appointments
  const filteredAppointments = appointments.filter((apt) => {
    const matchesStatus = statusFilter === 'all' || apt.status === statusFilter;
    const matchesSearch =
      apt.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.customerPhone.includes(searchQuery) ||
      apt.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const todayRevenue = appointments.reduce((sum, apt) => sum + (apt.status !== 'cancelled' ? apt.priceINR : 0), 0);
  const activeSessionsCount = appointments.filter((a) => a.status === 'in_progress').length;
  const confirmedCount = appointments.filter((a) => a.status === 'confirmed').length;
  const completedCount = appointments.filter((a) => a.status === 'completed').length;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleStatusChange = (appointment: Appointment, newStatus: Appointment['status']) => {
    const updated = { ...appointment, status: newStatus };
    onUpdateAppointment(updated);
    showToast(`Appointment ${appointment.id} status updated to: ${newStatus.toUpperCase()}`);
  };

  const handleSendWhatsAppReminder = async (apt: Appointment) => {
    try {
      const res = await fetch('/api/whatsapp/send-simulation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerPhone: apt.customerPhone,
          customerName: apt.customerName,
          type: 'appointment_reminder',
          details: apt
        })
      });
      const data = await res.json();
      if (data.success) {
        onUpdateAppointment({ ...apt, whatsappStatus: 'delivered' });
        showToast(`WhatsApp reminder dispatched to ${apt.customerName} (${apt.customerPhone})!`);
      }
    } catch {
      showToast(`WhatsApp reminder queued for ${apt.customerName}!`);
    }
  };

  const handleToggleRoomStatus = (roomId: string, newStatus: SpaRoom['status']) => {
    setRooms((prev) =>
      prev.map((r) => (r.id === roomId ? { ...r, status: newStatus } : r))
    );
    showToast(`Room status updated`);
  };

  const handleSendBroadcast = async () => {
    setIsSendingBroadcast(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSendingBroadcast(false);
    showToast(`WhatsApp broadcast dispatched to ${appointments.length} clients!`);
  };

  return (
    <div className="min-h-screen bg-stone-900 text-stone-100 font-sans pb-24">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-emerald-500 text-stone-950 px-5 py-3 rounded-xl shadow-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 animate-in fade-in slide-in-from-top-3">
          <CheckCircle className="w-5 h-5" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Backoffice Header */}
      <header className="bg-stone-950 border-b border-stone-800 sticky top-0 z-30 px-4 sm:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-stone-950 font-serif font-bold text-lg flex items-center justify-center">
              B
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-serif font-bold tracking-wide text-white">
                  Blossom Spa Management Hub
                </h1>
                <span className="bg-amber-500/20 text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold border border-amber-500/40">
                  Business Backoffice
                </span>
              </div>
              <p className="text-xs text-stone-400">
                Thaltej Center • WhatsApp AI Dispatcher • Real-time Operations
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onOpenNewBooking}
              className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow transition-all"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>+ New Walk-in / Booking</span>
            </button>

            <button
              onClick={onExitManagement}
              className="px-3.5 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-lg text-xs font-medium border border-stone-700 transition-colors"
            >
              Back to Client Website
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* KPI Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* Revenue */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 shadow-md">
            <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
              <span>Today’s Bookings Value</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              ₹{todayRevenue.toLocaleString('en-IN')}
            </div>
            <p className="text-[11px] text-emerald-400 mt-1 flex items-center gap-1">
              <span>{appointments.length} Total appointments booked</span>
            </p>
          </div>

          {/* Active Sessions */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 shadow-md">
            <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
              <span>In Progress Now</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-amber-300">
              {activeSessionsCount} <span className="text-sm font-sans font-normal text-stone-400">Suites</span>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              {confirmedCount} Confirmed upcoming today
            </p>
          </div>

          {/* Rooms Occupancy */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 shadow-md">
            <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
              <span>Treatment Suites Status</span>
              <DoorOpen className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-white">
              {rooms.filter((r) => r.status === 'available').length} / {rooms.length}{' '}
              <span className="text-xs font-sans font-normal text-stone-400">Ready</span>
            </div>
            <p className="text-[11px] text-stone-400 mt-1">
              Hammam &amp; Zakuzi suites active
            </p>
          </div>

          {/* WhatsApp AI Engagement */}
          <div className="bg-stone-800/80 rounded-2xl p-5 border border-stone-700 shadow-md">
            <div className="flex items-center justify-between text-stone-400 text-xs mb-2">
              <span>WhatsApp AI Auto-Dispatcher</span>
              <MessageSquare className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-serif font-bold text-emerald-400">
              100% Active
            </div>
            <p className="text-[11px] text-emerald-300/80 mt-1">
              24/7 Gemini Bot • +91 95741 56515
            </p>
          </div>
        </div>

        {/* Management Navigation Tabs */}
        <div className="flex border-b border-stone-800 mb-8 overflow-x-auto gap-2">
          {[
            { id: 'appointments', label: 'Appointments Bookings', icon: Calendar },
            { id: 'rooms', label: 'Suites & Therapist Allocation', icon: DoorOpen },
            { id: 'whatsapp', label: 'WhatsApp AI Messages & Broadcast', icon: MessageSquare },
            { id: 'customers', label: 'Client CRM Directory', icon: Users },
            { id: 'reviews', label: 'Google Reviews Hub', icon: Star }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-3 px-4 text-xs sm:text-sm font-semibold transition-all border-b-2 flex items-center gap-2 whitespace-nowrap ${
                  isActive
                    ? 'border-amber-400 text-amber-400 font-bold'
                    : 'border-transparent text-stone-400 hover:text-stone-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: Appointments Management */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-stone-800/60 p-4 rounded-2xl border border-stone-700">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="Search by customer, phone, therapy..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
                <span className="text-xs text-stone-400 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Status:
                </span>
                {['all', 'confirmed', 'in_progress', 'completed', 'cancelled'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize border transition-all ${
                      statusFilter === st
                        ? 'bg-amber-500 text-stone-950 font-bold border-amber-400'
                        : 'bg-stone-900 text-stone-300 border-stone-700 hover:bg-stone-700'
                    }`}
                  >
                    {st.replace('_', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Table of Appointments */}
            <div className="bg-stone-800 rounded-2xl border border-stone-700 overflow-hidden shadow-xl">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 uppercase tracking-wider text-[10px] border-b border-stone-700">
                    <tr>
                      <th className="py-3.5 px-4">Booking ID</th>
                      <th className="py-3.5 px-4">Guest Details</th>
                      <th className="py-3.5 px-4">Therapy &amp; Suite</th>
                      <th className="py-3.5 px-4">Date &amp; Slot</th>
                      <th className="py-3.5 px-4">Price</th>
                      <th className="py-3.5 px-4">Assigned Staff</th>
                      <th className="py-3.5 px-4">WhatsApp Status</th>
                      <th className="py-3.5 px-4 text-center">Status Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-700/60">
                    {filteredAppointments.map((apt) => (
                      <tr key={apt.id} className="hover:bg-stone-750 transition-colors">
                        <td className="py-4 px-4 font-mono font-bold text-amber-400">
                          {apt.id}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-semibold text-white">{apt.customerName}</div>
                          <div className="text-stone-400 flex items-center gap-1 mt-0.5">
                            <Phone className="w-3 h-3 text-stone-500" />
                            <span>{apt.customerPhone}</span>
                          </div>
                          {apt.notes && (
                            <p className="text-[10px] text-amber-200/80 italic mt-0.5">
                              Note: {apt.notes}
                            </p>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium text-stone-200">{apt.serviceName}</div>
                          <div className="text-[11px] text-amber-300">{apt.roomName}</div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="text-stone-200 font-medium">{apt.date}</div>
                          <div className="text-amber-400 font-bold">{apt.timeSlot}</div>
                        </td>
                        <td className="py-4 px-4 font-semibold text-stone-200">
                          ₹{apt.priceINR.toLocaleString('en-IN')}
                        </td>
                        <td className="py-4 px-4 text-stone-300">
                          {apt.assignedTherapist || (
                            <span className="text-stone-500 italic">Unassigned</span>
                          )}
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold ${
                              apt.whatsappStatus === 'read' || apt.whatsappStatus === 'delivered'
                                ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                                : 'bg-stone-700 text-stone-300'
                            }`}
                          >
                            <MessageSquare className="w-2.5 h-2.5" />
                            {apt.whatsappStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-1.5">
                            <select
                              value={apt.status}
                              onChange={(e) => handleStatusChange(apt, e.target.value as any)}
                              className="bg-stone-900 text-stone-200 text-xs px-2.5 py-1.5 rounded-lg border border-stone-700 focus:outline-none focus:ring-1 focus:ring-amber-400"
                            >
                              <option value="confirmed">Confirmed</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>

                            <button
                              onClick={() => handleSendWhatsAppReminder(apt)}
                              title="Send WhatsApp Reminder Template"
                              className="p-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 rounded-lg border border-emerald-500/40 transition-colors"
                            >
                              <Send className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Room & Therapist Allocator */}
        {activeTab === 'rooms' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-serif font-bold text-white">
                  Luxury Treatment Suites Real-time Status
                </h3>
                <p className="text-xs text-stone-400">
                  Manage availability, maintenance, and assign active therapists.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {rooms.map((room) => {
                const isAvailable = room.status === 'available';
                const isInSession = room.status === 'in_session';
                const isCleaning = room.status === 'cleaning';

                return (
                  <div
                    key={room.id}
                    className="bg-stone-800 rounded-2xl border border-stone-700 overflow-hidden shadow-lg flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-44 w-full bg-stone-950">
                        <img
                          src={room.image}
                          alt={room.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span
                            className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                              isAvailable
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                : isInSession
                                ? 'bg-amber-950 text-amber-300 border-amber-700'
                                : 'bg-rose-950 text-rose-300 border-rose-700'
                            }`}
                          >
                            {room.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h4 className="text-lg font-serif font-bold text-white">{room.name}</h4>
                        <p className="text-xs text-stone-400 mb-3">{room.tagline}</p>

                        <div className="text-xs text-stone-300 space-y-1 py-2 border-t border-stone-700/60">
                          <div className="flex justify-between">
                            <span className="text-stone-500">Suite Type:</span>
                            <span className="font-semibold text-amber-300">{room.badge}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-500">Therapist:</span>
                            <span>{room.currentTherapist || 'Available to allocate'}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 bg-stone-850 border-t border-stone-700 flex items-center justify-between gap-2">
                      <span className="text-[11px] text-stone-400">Change Status:</span>
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => handleToggleRoomStatus(room.id, 'available')}
                          className={`px-2.5 py-1 text-[11px] rounded font-medium ${
                            isAvailable ? 'bg-emerald-600 text-white font-bold' : 'bg-stone-700 text-stone-300'
                          }`}
                        >
                          Ready
                        </button>
                        <button
                          onClick={() => handleToggleRoomStatus(room.id, 'in_session')}
                          className={`px-2.5 py-1 text-[11px] rounded font-medium ${
                            isInSession ? 'bg-amber-600 text-white font-bold' : 'bg-stone-700 text-stone-300'
                          }`}
                        >
                          Session
                        </button>
                        <button
                          onClick={() => handleToggleRoomStatus(room.id, 'cleaning')}
                          className={`px-2.5 py-1 text-[11px] rounded font-medium ${
                            isCleaning ? 'bg-rose-600 text-white font-bold' : 'bg-stone-700 text-stone-300'
                          }`}
                        >
                          Cleaning
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: WhatsApp AI Dispatcher & Broadcast */}
        {activeTab === 'whatsapp' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Broadcast Sender */}
            <div className="lg:col-span-6 bg-stone-800 rounded-2xl p-6 border border-stone-700 shadow-xl space-y-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-serif font-bold text-white">
                    Send WhatsApp Notification Broadcast
                  </h3>
                  <p className="text-xs text-stone-400">
                    Dispatch reminders, promotional offers, or Google Review requests to guests.
                  </p>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Target Audience:
                </label>
                <select
                  value={broadcastTarget}
                  onChange={(e) => setBroadcastTarget(e.target.value)}
                  className="w-full p-2.5 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white focus:outline-none"
                >
                  <option value="all_today">Today’s Booked Guests ({appointments.length} Contacts)</option>
                  <option value="completed_feedback">Recent Completed Sessions (Google Review Request)</option>
                  <option value="vip_members">VIP Regular Guests (Weekend Hammam Offer)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-300 mb-1.5">
                  Message Content (WhatsApp Template):
                </label>
                <textarea
                  rows={4}
                  value={broadcastTemplate}
                  onChange={(e) => setBroadcastTemplate(e.target.value)}
                  className="w-full p-3 bg-stone-900 border border-stone-700 rounded-xl text-xs text-white font-sans focus:outline-none focus:ring-1 focus:ring-emerald-500"
                />
              </div>

              <button
                onClick={handleSendBroadcast}
                disabled={isSendingBroadcast}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider rounded-xl shadow flex items-center justify-center gap-2 transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isSendingBroadcast ? 'Dispatching via WhatsApp API...' : 'Dispatch WhatsApp Messages'}</span>
              </button>
            </div>

            {/* Live AI Customer Support Simulator Log */}
            <div className="lg:col-span-6 bg-stone-800 rounded-2xl p-6 border border-stone-700 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-serif font-bold">Automated Support Logs</h3>
                </div>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-700 px-2 py-0.5 rounded-full font-bold">
                  AI Live Monitor
                </span>
              </div>

              <div className="bg-stone-950 rounded-xl p-4 border border-stone-800 space-y-3 max-h-[380px] overflow-y-auto font-mono text-xs">
                <div className="text-stone-400 text-[11px] pb-2 border-b border-stone-800 flex justify-between">
                  <span>[10:14 AM] Inbound from +91 98250 11420</span>
                  <span className="text-emerald-400">Handled by Gemini AI</span>
                </div>
                <div className="text-stone-300">
                  <span className="text-amber-400">Customer:</span> "Is the Turkish Hammam available at 4 PM today?"
                </div>
                <div className="text-emerald-300 pl-3 border-l-2 border-emerald-600">
                  <span className="text-stone-400">Blossom AI:</span> "Namaste! Yes, our authentic Turkish Hammam suite is available at 4:00 PM today. It includes the heated marble platform and kessa scrub for ₹3,499 (75 min). Shall I confirm your slot?"
                </div>

                <div className="text-stone-400 text-[11px] pt-3 pb-2 border-b border-stone-800 flex justify-between">
                  <span>[09:48 AM] Inbound from +91 94260 88310</span>
                  <span className="text-emerald-400">Handled by Gemini AI</span>
                </div>
                <div className="text-stone-300">
                  <span className="text-amber-400">Customer:</span> "Do you have car parking near Bhagwat Bungalows?"
                </div>
                <div className="text-emerald-300 pl-3 border-l-2 border-emerald-600">
                  <span className="text-stone-400">Blossom AI:</span> "Yes! Dedicated private customer parking is available right in front of our spa at 101 Bhagwat Bungalows Rd, Thaltej. We are open until 9:00 PM."
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Client CRM */}
        {activeTab === 'customers' && (
          <div className="bg-stone-800 rounded-2xl border border-stone-700 overflow-hidden shadow-xl p-6">
            <h3 className="text-lg font-serif font-bold text-white mb-4">
              Registered Clients &amp; Preferences (CRM)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="bg-stone-900/90 p-4 rounded-xl border border-stone-700/80 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <h4 className="font-bold text-stone-100 text-sm">{apt.customerName}</h4>
                    <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded font-medium">
                      Verified Client
                    </span>
                  </div>
                  <p className="text-xs text-stone-400 flex items-center gap-1.5">
                    <Phone className="w-3 h-3 text-stone-500" />
                    <span>{apt.customerPhone}</span>
                  </p>
                  <div className="text-xs text-stone-300 pt-2 border-t border-stone-800">
                    <p>Preferred: <span className="text-amber-400">{apt.serviceName}</span></p>
                    <p>Pressure: <span className="capitalize text-stone-400">{apt.pressurePreference || 'Medium'}</span></p>
                  </div>
                  <div className="pt-2 flex gap-2">
                    <a
                      href={`https://wa.me/${apt.customerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hello ${apt.customerName}, greeting from Blossom Spa Thaltej.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-1.5 bg-emerald-600/20 hover:bg-emerald-600/40 text-emerald-400 text-[11px] font-semibold rounded-lg text-center border border-emerald-500/40"
                    >
                      WhatsApp Message
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: Google Reviews Manager */}
        {activeTab === 'reviews' && (
          <div className="bg-stone-800 rounded-2xl border border-stone-700 overflow-hidden shadow-xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h3 className="text-lg font-serif font-bold text-white">
                  Google Maps Reviews &amp; Owner Responses
                </h3>
                <p className="text-xs text-stone-400">
                  Current Rating: {SPA_INFO.googleRating} ★ based on {SPA_INFO.totalGoogleReviews} reviews
                </p>
              </div>
              <a
                href={SPA_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-stone-900 hover:bg-stone-700 text-stone-200 text-xs rounded-xl border border-stone-700 flex items-center gap-1.5"
              >
                <span>Open Google Business Profile</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="space-y-4">
              {GOOGLE_REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-stone-900 p-4 rounded-xl border border-stone-700/60 space-y-2"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-xs">{rev.authorName}</span>
                      <span className="text-[11px] text-stone-500">• {rev.timeAgo}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-stone-300 italic leading-relaxed">
                    "{rev.text}"
                  </p>
                  {rev.ownerReply ? (
                    <div className="p-2.5 bg-amber-950/40 border-l-2 border-amber-500 text-[11px] text-amber-200">
                      <strong>Owner Response:</strong> {rev.ownerReply}
                    </div>
                  ) : (
                    <div className="pt-2">
                      <button
                        onClick={() => showToast(`Automated AI reply generated and drafted for ${rev.authorName}`)}
                        className="px-3 py-1 bg-stone-800 hover:bg-stone-700 text-amber-300 text-[11px] rounded-lg border border-stone-700"
                      >
                        Draft AI Response ✨
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
