export type ServiceCategory = 'massage' | 'hammam' | 'hydrotherapy' | 'scrub' | 'couples';

export interface SpaService {
  id: string;
  name: string;
  category: ServiceCategory;
  durationMinutes: number;
  priceINR: number;
  tag: string;
  description: string;
  benefits: string[];
  image: string;
  popular?: boolean;
}

export interface SpaRoom {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  features: string[];
  image: string;
  capacity: number;
  status: 'available' | 'in_session' | 'cleaning' | 'reserved';
  currentTherapist?: string;
}

export interface Appointment {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  serviceId: string;
  serviceName: string;
  durationMinutes: number;
  priceINR: number;
  roomId: string;
  roomName: string;
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "11:30 AM"
  status: 'confirmed' | 'pending' | 'in_progress' | 'completed' | 'cancelled';
  pressurePreference?: 'soft' | 'medium' | 'deep';
  therapistGenderPreference?: 'female' | 'male' | 'no_preference';
  assignedTherapist?: string;
  notes?: string;
  whatsappNotification: boolean;
  whatsappStatus: 'sent' | 'delivered' | 'read' | 'failed' | 'pending';
  createdAt: string;
}

export interface GoogleReview {
  id: string;
  authorName: string;
  authorPhoto?: string;
  rating: number;
  timeAgo: string;
  text: string;
  treatmentMentioned: string;
  verifiedGuest: boolean;
  helpfulCount: number;
  ownerReply?: string;
}

export interface Therapist {
  id: string;
  name: string;
  role: string;
  experienceYears: number;
  specialties: string[];
  status: 'available' | 'in_session' | 'off_duty';
  photo?: string;
  assignedRoomId?: string;
}

export interface WhatsAppChatMessage {
  id: string;
  sender: 'user' | 'assistant' | 'system';
  text: string;
  time: string;
  status?: 'sent' | 'delivered' | 'read';
  actionData?: {
    type: 'booking_suggestion' | 'booking_confirmed' | 'location_shared' | 'price_list';
    payload?: any;
  };
}
