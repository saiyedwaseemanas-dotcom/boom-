import { SpaService, SpaRoom, GoogleReview, Therapist, Appointment } from '../types';

export const SPA_INFO = {
  name: 'Blossom Spa',
  tagline: 'Ahmedabad’s Premier Sanctuary of Tranquility & Rejuvenation',
  address: '101, Bhagwat Bungalows Rd, Thaltej, Ahmedabad, Gujarat 380059',
  city: 'Ahmedabad',
  locality: 'Thaltej',
  state: 'Gujarat',
  postalCode: '380059',
  country: 'India',
  phone: '+91 95741 56515',
  displayPhone: '095741 56515',
  whatsappNumber: '919574156515',
  email: 'blossomspa17@gmail.com',
  hours: 'Monday – Sunday: 10:00 AM – 9:00 PM',
  coordinates: {
    lat: 23.0589,
    lng: 72.5085,
  },
  googleRating: 4.9,
  totalGoogleReviews: 154,
  googleMapsUrl: 'https://maps.google.com/?q=Blossom+Spa+Thaltej+Ahmedabad',
  googleMapsEmbedUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.218544838383!2d72.50631131540954!3d23.058900084934158!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f5cf9f6c73%3A0x57420e33f0c5a62b!2sBlossom%20Spa!5e0!3m2!1sen!2sin!4v1711000000000!5m2!1sen!2sin'
};

export const SPA_SERVICES: SpaService[] = [
  {
    id: 'hammam-turkish',
    name: 'Hammam Signature Turkish Ritual',
    category: 'hammam',
    durationMinutes: 75,
    priceINR: 3499,
    tag: 'Signature Experience',
    popular: true,
    description: 'Inspired by ancient Ottoman bathing rituals. Experience warmed steam, traditional kessa glove deep exfoliation, and a restorative Turkish olive oil soap cloud massage on a heated marble platform.',
    benefits: ['Purifies and deep cleans pores', 'Improves blood circulation', 'Silky soft rejuvenated skin', 'Deep muscle relaxation'],
    image: '/images/IMG_3857.png'
  },
  {
    id: 'swedish-massage',
    name: 'Classic Swedish Massage',
    category: 'massage',
    durationMinutes: 60,
    priceINR: 2499,
    tag: 'Most Popular',
    popular: true,
    description: 'The world-revered relaxation therapy. Our certified therapists use long, flowing strokes, kneading, and circular motions with warm botanical oils to melt away daily stress and restore mental peace.',
    benefits: ['Relieves full-body tension', 'Stimulates lymphatic drainage', 'Improves sleep quality', 'Calms the nervous system'],
    image: '/images/IMG_3855.png'
  },
  {
    id: 'jacuzzi-hydrotherapy',
    name: 'Zakuzi Hydrotherapy & Jet Soak',
    category: 'hydrotherapy',
    durationMinutes: 45,
    priceINR: 2199,
    tag: 'Hydro Wellness',
    popular: false,
    description: 'Submerge into our private climate-controlled hydrotherapy tub. Multi-directional water jets target acupressure points along the spine, calves, and shoulders with soothing chromotherapy lighting.',
    benefits: ['Relieves joint and muscular stiffness', 'Lowers blood pressure', 'Boosts endorphins and mental clarity', 'Accelerates recovery'],
    image: '/images/IMG_3858.png'
  },
  {
    id: 'aroma-therapy',
    name: 'Holistic Aroma Therapy',
    category: 'massage',
    durationMinutes: 60,
    priceINR: 2699,
    tag: 'Sensory Healing',
    popular: true,
    description: 'Curated organic essential oil infusions—such as French lavender, eucalyptus, and wild bergamot—paired with gentle rhythmic strokes to harmonise body, mind, and spirit.',
    benefits: ['Eases anxiety and mental fatigue', 'Rebalances sensory receptors', 'Nourishes dry skin with vitamins', 'Deep aromatic serenity'],
    image: '/images/IMG_3861.png'
  },
  {
    id: 'maharaja-dry',
    name: 'Maharaja Royal Dry Massage',
    category: 'massage',
    durationMinutes: 60,
    priceINR: 2299,
    tag: 'Traditional & Oil-Free',
    popular: false,
    description: 'Performed without oils over comfortable linen robes. Combines passive yogic stretching, assisted spinal alignment, and targeted thumb pressure along bodily sen lines for immediate vigor.',
    benefits: ['Increases range of flexibility', 'Relieves postural spine strain', 'Ideal for busy professionals', 'No oil clean-up required'],
    image: '/images/IMG_3859.png'
  },
  {
    id: 'couples-retreat',
    name: 'Couples Romantic Sanctuary Retreat',
    category: 'couples',
    durationMinutes: 90,
    priceINR: 4999,
    tag: 'Couple Special',
    popular: true,
    description: 'A synchronised dual-therapist massage in our private VIP Couple Suite. Includes warm rose-water foot cleansing ritual, customized aromatherapy bodywork, and complimentary organic herbal tea.',
    benefits: ['Shared intimate bonding atmosphere', 'Dual therapist synchronization', 'Private VIP suite access', 'Complimentary herbal refreshers'],
    image: '/images/IMG_3850.png'
  },
  {
    id: 'body-scrub',
    name: 'Radiance Mineral Body Scrub',
    category: 'scrub',
    durationMinutes: 45,
    priceINR: 1999,
    tag: 'Exfoliation',
    popular: false,
    description: 'Polishes away dull and dry skin using natural Himalayan pink salts blended with virgin cold-pressed sweet almond oil and botanical essences, followed by a warm steam rinse.',
    benefits: ['Instantly unveils glowing skin', 'Removes dead cellular layers', 'Unclogs hair follicles', 'Leaves skin radiant and supple'],
    image: '/images/IMG_3848.png'
  },
  {
    id: 'deep-tissue',
    name: 'Therapeutic Deep Tissue Relief',
    category: 'massage',
    durationMinutes: 60,
    priceINR: 2899,
    tag: 'Intense Muscle Focus',
    popular: false,
    description: 'Targeted deep-pressure therapy specifically formulated to break down chronic muscular knots, athletic adhesions, and alleviate persistent neck and lower-back stiffness.',
    benefits: ['Releases chronic muscle tight spots', 'Improves posture alignment', 'Aids athletic muscle recovery', 'Long-lasting tension relief'],
    image: '/images/IMG_3862.png'
  }
];

export const SPA_ROOMS: SpaRoom[] = [
  {
    id: 'turkish-hammam',
    name: 'Turkish Hammam Room',
    badge: 'Traditional Steam Suite',
    tagline: 'Ancient Middle-Eastern purification architecture',
    description: 'Our pride and joy: an authentic Turkish hammam featuring hand-laid mosaic tiles, warm cascading steam generator, and a genuine heated marble göbek taşı platform for traditional soap scrub rituals.',
    features: ['Continuous Warm Steam', 'Heated Central Marble Platform', 'Traditional Copper Tas Bowls', 'Authentic Kessa Exfoliation Setup'],
    image: '/images/IMG_3849.png',
    capacity: 2,
    status: 'available',
    currentTherapist: 'Priya Sharma'
  },
  {
    id: 'zakuzi-suite',
    name: 'Zakuzi Hydro Suite',
    badge: 'Hydrotherapy Chamber',
    tagline: 'Deep thermal water jets and soothing chromotherapy',
    description: 'State-of-the-art hydrotherapy tub room with high-pressure massage jets, independent water heating, mood ambient lights, and private ensuite shower facilities.',
    features: ['Temperature Controlled Tub', 'Multi-zone Pulsating Jets', 'Chromotherapy Lighting', 'Private En-Suite Changing'],
    image: '/images/IMG_3858.png',
    capacity: 2,
    status: 'in_session',
    currentTherapist: 'Ananya Roy'
  },
  {
    id: 'oil-suite',
    name: 'Signature Oil Massage Suite',
    badge: 'Swedish & Aromatherapy',
    tagline: 'Warm amber tones, heated massage table and soothing soundscape',
    description: 'Designed specifically for deep relaxation oil therapies with dimmable warm sconce lighting, imported ergonomic massage table, aroma diffusers, and warm towel warmers.',
    features: ['Heated Massage Couch', 'Ultrasonic Aroma Diffuser', 'Customized Acoustic Music System', 'Organic Botanical Oil Bar'],
    image: '/images/oil-room/IMG_4257.jpg',
    capacity: 1,
    status: 'available',
    currentTherapist: 'Kavita Patel'
  },
  {
    id: 'maharaja-room',
    name: 'Maharaja Royal Dry Suite',
    badge: 'Royal Heritage Decor',
    tagline: 'Spacious traditional tatami and bolster setup for dry pressure work',
    description: 'Featuring rich royal decor inspired by classic Indian palaces, firm cushioned ground mats, and supportive body bolsters optimal for Thai stretching and pressure point dry massage.',
    features: ['Authentic Regal Ambiance', 'Specialized Firm Floor Matting', 'Linen Robe Service', 'Organic Green Tea Lounge'],
    image: '/images/dry-room/IMG_4248.jpg',
    capacity: 1,
    status: 'cleaning'
  },
  {
    id: 'vip-couples',
    name: 'VIP Couple Sanctuary',
    badge: 'Private Couple Suite',
    tagline: 'Expansive private suite with dual massage stations and floral foot soak',
    description: 'Ahmedabad’s most romantic spa sanctuary. Two side-by-side premium treatment tables, private seating area, fragrant rose petal foot basins, and tranquil mood lighting.',
    features: ['Side-by-side Dual Tables', 'Rose Petal Foot Soak Station', 'Private Changing & Shower', 'Couples Refreshment Lounge'],
    image: '/images/IMG_3850.png',
    capacity: 2,
    status: 'available',
    currentTherapist: 'Meera Sen'
  }
];

export const GOOGLE_REVIEWS: GoogleReview[] = [
  {
    id: 'rev-1',
    authorName: 'Hardik Patel',
    rating: 5,
    timeAgo: '2 weeks ago',
    text: 'Best luxury spa experience in Ahmedabad! The Hammam Turkish ritual is unlike anything else in the city. The heated marble and steam scrub made me feel like a new person. Extremely hygienic rooms, respectful staff, and easy parking in Thaltej. 10/10 recommend!',
    treatmentMentioned: 'Hammam Signature Turkish Ritual',
    verifiedGuest: true,
    helpfulCount: 24,
    ownerReply: 'Thank you so much Hardik! We are thrilled you enjoyed the authentic Hammam experience on our heated marble. Looking forward to welcoming you back soon at Blossom Spa!'
  },
  {
    id: 'rev-2',
    authorName: 'Ritu & Sameer Desai',
    rating: 5,
    timeAgo: '1 month ago',
    text: 'Booked the Couples Sanctuary for our wedding anniversary. From the WhatsApp scheduling with their quick assistant to the warm welcome, everything was seamless. The therapists were certified experts and respected our privacy completely. Outstanding ambience.',
    treatmentMentioned: 'Couples Romantic Sanctuary Retreat',
    verifiedGuest: true,
    helpfulCount: 38,
    ownerReply: 'Happy Anniversary Ritu and Sameer! It was our pleasure to host your special celebration in the VIP Couple Suite.'
  },
  {
    id: 'rev-3',
    authorName: 'Dr. Chirag Mehta',
    rating: 5,
    timeAgo: '3 weeks ago',
    text: 'As a surgeon with chronic shoulder tension, I needed real deep tissue work, not just superficial oil rubbing. Therapist Kavita knew exact trigger points. The Zakuzi hydro soak afterwards was therapeutic bliss. Very clean, quiet and professional.',
    treatmentMentioned: 'Therapeutic Deep Tissue Relief',
    verifiedGuest: true,
    helpfulCount: 19
  },
  {
    id: 'rev-4',
    authorName: 'Sneha Shah',
    rating: 5,
    timeAgo: '2 months ago',
    text: 'Such a peaceful oasis tucked away in Thaltej near Bhagwat Bungalows. The Swedish massage was incredibly soothing, gentle relaxing music, and lovely natural lemongrass essential oils. Booking via WhatsApp was super fast.',
    treatmentMentioned: 'Classic Swedish Massage',
    verifiedGuest: true,
    helpfulCount: 15,
    ownerReply: 'Thank you Sneha! Lemongrass and lavender are our client favorites. See you again next time you need to unwind!'
  },
  {
    id: 'rev-5',
    authorName: 'Aakash Verma',
    rating: 5,
    timeAgo: 'a month ago',
    text: 'Tried the Maharaja Dry massage because I had to head straight to an evening meeting and didn’t want oil in my hair. The yogic stretches and pressure techniques completely reset my posture. Exceptional value in Ahmedabad.',
    treatmentMentioned: 'Maharaja Royal Dry Massage',
    verifiedGuest: true,
    helpfulCount: 11
  },
  {
    id: 'rev-6',
    authorName: 'Bhavna Joshi',
    rating: 5,
    timeAgo: '3 months ago',
    text: 'The best body scrub and aromatherapy session I have had. Soft lighting, fragrant atmosphere, clean towels, and wonderful hospitality. You can tell the management really cares about customer comfort.',
    treatmentMentioned: 'Radiance Mineral Body Scrub',
    verifiedGuest: true,
    helpfulCount: 22
  }
];

export const THERAPISTS: Therapist[] = [
  {
    id: 'th-1',
    name: 'Priya Sharma',
    role: 'Master Hammam & Bodywork Specialist',
    experienceYears: 8,
    specialties: ['Turkish Hammam', 'Swedish Massage', 'Aromatherapy'],
    status: 'available',
    assignedRoomId: 'turkish-hammam'
  },
  {
    id: 'th-2',
    name: 'Kavita Patel',
    role: 'Senior Deep Tissue & Trigger Point Therapist',
    experienceYears: 6,
    specialties: ['Deep Tissue', 'Sports Recovery', 'Swedish'],
    status: 'available',
    assignedRoomId: 'oil-suite'
  },
  {
    id: 'th-3',
    name: 'Ananya Roy',
    role: 'Hydrotherapy & Holistic Wellness Specialist',
    experienceYears: 7,
    specialties: ['Zakuzi Hydro Jet', 'Body Scrubs', 'Balinese Massage'],
    status: 'in_session',
    assignedRoomId: 'zakuzi-suite'
  },
  {
    id: 'th-4',
    name: 'Meera Sen',
    role: 'Couples & Aromatherapy Master Therapist',
    experienceYears: 9,
    specialties: ['Couples Therapy', 'Rose Petal Baths', 'Aromatherapy'],
    status: 'available',
    assignedRoomId: 'vip-couples'
  },
  {
    id: 'th-5',
    name: 'Rahul Joshi',
    role: 'Traditional Dry Massage & Alignment Specialist',
    experienceYears: 8,
    specialties: ['Maharaja Dry', 'Thai Stretching', 'Acupressure'],
    status: 'available',
    assignedRoomId: 'maharaja-room'
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 'APT-1082',
    customerName: 'Vikram Trivedi',
    customerPhone: '+91 98250 11420',
    customerEmail: 'vikram.trivedi@example.com',
    serviceId: 'hammam-turkish',
    serviceName: 'Hammam Signature Turkish Ritual',
    durationMinutes: 75,
    priceINR: 3499,
    roomId: 'turkish-hammam',
    roomName: 'Turkish Hammam Room',
    date: '2026-09-20',
    timeSlot: '04:00 PM',
    status: 'confirmed',
    pressurePreference: 'medium',
    therapistGenderPreference: 'no_preference',
    assignedTherapist: 'Priya Sharma',
    notes: 'First time visiting. Interested in steam scrub.',
    whatsappNotification: true,
    whatsappStatus: 'delivered',
    createdAt: '2026-09-20T08:15:00Z'
  },
  {
    id: 'APT-1083',
    customerName: 'Pooja & Rohan Mehra',
    customerPhone: '+91 98980 44219',
    customerEmail: 'rohan.mehra@example.com',
    serviceId: 'couples-retreat',
    serviceName: 'Couples Romantic Sanctuary Retreat',
    durationMinutes: 90,
    priceINR: 4999,
    roomId: 'vip-couples',
    roomName: 'VIP Couple Sanctuary',
    date: '2026-09-20',
    timeSlot: '05:30 PM',
    status: 'confirmed',
    pressurePreference: 'medium',
    therapistGenderPreference: 'no_preference',
    assignedTherapist: 'Meera Sen',
    notes: 'Anniversary celebration. Rose petals requested.',
    whatsappNotification: true,
    whatsappStatus: 'read',
    createdAt: '2026-09-20T07:45:00Z'
  },
  {
    id: 'APT-1084',
    customerName: 'Aditi Shah',
    customerPhone: '+91 94260 88310',
    customerEmail: 'aditi.shah@example.com',
    serviceId: 'swedish-massage',
    serviceName: 'Classic Swedish Massage',
    durationMinutes: 60,
    priceINR: 2499,
    roomId: 'oil-suite',
    roomName: 'Signature Oil Massage Suite',
    date: '2026-09-20',
    timeSlot: '06:00 PM',
    status: 'confirmed',
    pressurePreference: 'soft',
    therapistGenderPreference: 'female',
    assignedTherapist: 'Kavita Patel',
    notes: 'Prefer lavender aroma oil.',
    whatsappNotification: true,
    whatsappStatus: 'sent',
    createdAt: '2026-09-20T08:30:00Z'
  },
  {
    id: 'APT-1085',
    customerName: 'Sanjay Rawal',
    customerPhone: '+91 98240 55190',
    serviceId: 'jacuzzi-hydrotherapy',
    serviceName: 'Zakuzi Hydrotherapy & Jet Soak',
    durationMinutes: 45,
    priceINR: 2199,
    roomId: 'zakuzi-suite',
    roomName: 'Zakuzi Hydro Suite',
    date: '2026-09-20',
    timeSlot: '03:15 PM',
    status: 'in_progress',
    pressurePreference: 'medium',
    assignedTherapist: 'Ananya Roy',
    notes: 'Warm water soak for muscle cramps.',
    whatsappNotification: true,
    whatsappStatus: 'delivered',
    createdAt: '2026-09-20T06:20:00Z'
  },
  {
    id: 'APT-1081',
    customerName: 'Manish Dave',
    customerPhone: '+91 97230 19280',
    serviceId: 'maharaja-dry',
    serviceName: 'Maharaja Royal Dry Massage',
    durationMinutes: 60,
    priceINR: 2299,
    roomId: 'maharaja-room',
    roomName: 'Maharaja Royal Dry Suite',
    date: '2026-09-20',
    timeSlot: '01:30 PM',
    status: 'completed',
    pressurePreference: 'deep',
    assignedTherapist: 'Rahul Joshi',
    notes: 'Regular client.',
    whatsappNotification: true,
    whatsappStatus: 'read',
    createdAt: '2026-09-19T18:00:00Z'
  }
];

export const TIME_SLOTS = [
  '10:30 AM',
  '11:45 AM',
  '01:00 PM',
  '02:15 PM',
  '03:30 PM',
  '04:45 PM',
  '06:00 PM',
  '07:15 PM',
  '08:00 PM'
];
