import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// In-memory persistent store for appointments during runtime
let appointments = [
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
    createdAt: new Date().toISOString()
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
    createdAt: new Date(Date.now() - 3600000).toISOString()
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
    createdAt: new Date(Date.now() - 7200000).toISOString()
  }
];

// Lazy Gemini API Client
let genAIClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!genAIClient && process.env.GEMINI_API_KEY) {
    genAIClient = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  }
  return genAIClient;
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    spa: 'Blossom Spa Ahmedabad',
    geminiAvailable: !!process.env.GEMINI_API_KEY,
    time: new Date().toISOString()
  });
});

// GET Appointments
app.get('/api/appointments', (req, res) => {
  res.json({ success: true, appointments });
});

// POST New Appointment
app.post('/api/appointments', (req, res) => {
  const newApt = {
    id: `APT-${Math.floor(1000 + Math.random() * 9000)}`,
    ...req.body,
    createdAt: new Date().toISOString(),
    status: req.body.status || 'confirmed',
    whatsappStatus: 'delivered'
  };
  appointments.unshift(newApt);
  res.json({ success: true, appointment: newApt });
});

// PATCH Appointment
app.patch('/api/appointments/:id', (req, res) => {
  const { id } = req.params;
  const index = appointments.findIndex((a) => a.id === id);
  if (index === -1) {
    return res.status(404).json({ error: 'Appointment not found' });
  }
  appointments[index] = { ...appointments[index], ...req.body };
  res.json({ success: true, appointment: appointments[index] });
});

// WhatsApp AI Customer Support & Appointment Scheduling Endpoint
app.post('/api/whatsapp/ai-reply', async (req, res) => {
  const { message, chatHistory = [], customerName } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'Message is required' });
  }

  const spaContext = `
You are the Official AI WhatsApp Concierge for "Blossom Spa", located in Thaltej, Ahmedabad, Gujarat, India.
Your mission is to provide warm, courteous, luxurious customer support, answer questions about therapies, pricing, rooms, hygiene, and seamlessly guide guests to book appointments.

KEY SPA FACTS (Strictly Accurate):
- Business Name: Blossom Spa Ahmedabad
- Address: 101, Bhagwat Bungalows Rd, Thaltej, Ahmedabad, Gujarat 380059
- Phone: +91 95741 56515 (or 095741 56515)
- WhatsApp Number: +91 95741 56515
- Operating Hours: Monday to Sunday, 10:00 AM to 9:00 PM
- Google Rating: 4.9 Stars (150+ reviews on Google & Justdial)
- Facilities:
  1. Authentic Turkish Hammam Room (heated marble göbek taşı platform, eucalyptus steam, kessa scrub)
  2. Zakuzi (Jacuzzi) Hydrotherapy Suite (deep pulsating jets, chromotherapy)
  3. Signature Oil Massage Suite (heated couches, aromatherapy, organic botanical oils)
  4. Maharaja Royal Dry Suite (traditional oil-free pressure points & Thai stretching)
  5. VIP Couple Sanctuary (side-by-side tables, rose petal foot soak)

POPULAR TREATMENTS & PRICES (in INR):
- Hammam Signature Turkish Ritual: ₹3,499 (75 min)
- Classic Swedish Massage: ₹2,499 (60 min)
- Zakuzi Hydrotherapy: ₹2,199 (45 min)
- Holistic Aroma Therapy: ₹2,699 (60 min)
- Maharaja Royal Dry Massage: ₹2,299 (60 min)
- Couples Romantic Sanctuary Retreat: ₹4,999 (90 min)
- Radiance Mineral Body Scrub: ₹1,999 (45 min)
- Therapeutic Deep Tissue Relief: ₹2,899 (60 min)

WHATSAPP TONE & FORMAT RULES:
- Style: Warm, gracious, respectful, soothing hospitality (hospitality tone suitable for Ahmedabad/India luxury wellness).
- Formatting: Use standard WhatsApp formatting: *bold* for treatment names or prices, bullet points with • or 🌿, and natural spacing.
- Length: Keep responses conversational, concise, and easy to read on mobile (under 120 words unless asked for detailed descriptions).
- Booking Intent: If the guest expresses an interest in booking or inquires about availability, politely ask for their preferred treatment, date, and preferred time slot (e.g., between 10:00 AM and 9:00 PM).
- End with a welcoming sign-off: "🌿 Blossom Spa, Thaltej • +91 95741 56515"
`;

  try {
    const ai = getGeminiClient();

    if (ai) {
      // Build conversation context
      const formattedHistory = chatHistory
        .map((h: any) => `${h.sender === 'user' ? 'Customer' : 'Blossom AI'}: ${h.text}`)
        .join('\n');

      const prompt = `${spaContext}\n\nChat History:\n${formattedHistory}\n\nCustomer (${customerName || 'Guest'}): "${message}"\n\nGenerate the Blossom Spa WhatsApp response:`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt
      });

      const replyText = response.text || "Namaste! Thank you for reaching Blossom Spa Ahmedabad. How may I assist your wellness journey today?";

      // Check if the reply includes booking assistance
      const isBookingRelated = /book|slot|time|date|reserve|appointment/i.test(message);

      return res.json({
        success: true,
        reply: replyText.trim(),
        suggestedActions: isBookingRelated ? ['Select Service', 'Pick Time Slot', 'Confirm Details'] : ['View Pricing', 'Turkish Hammam Info', 'Get Directions to Thaltej']
      });
    }
  } catch (error: any) {
    console.error('Gemini API Error in WhatsApp route:', error?.message || error);
  }

  // High-quality intelligent fallback if GEMINI_API_KEY is not configured or in offline mode
  const lower = message.toLowerCase();
  let fallbackReply = '';
  let actions = ['Book Appointment', 'Services & Prices', 'Location & Directions'];

  if (lower.includes('hammam') || lower.includes('turkish') || lower.includes('steam')) {
    fallbackReply = `*Hammam Signature Turkish Ritual* 🌿\n\nOur authentic Turkish Hammam features a traditional heated marble platform (*göbek taşı*), eucalyptus steam, and a restorative olive soap scrub with a kessa glove.\n\n⏱ *Duration:* 75 minutes\n💰 *Price:* ₹3,499\n\nWould you like me to reserve a session for you today in our Thaltej sanctuary?`;
    actions = ['Book Hammam Now', 'Check Available Slots', 'Couples Hammam'];
  } else if (lower.includes('price') || lower.includes('cost') || lower.includes('rate') || lower.includes('menu')) {
    fallbackReply = `Here are our most requested treatments at *Blossom Spa*:\n\n• *Swedish Massage:* ₹2,499 (60m)\n• *Turkish Hammam Ritual:* ₹3,499 (75m)\n• *Aroma Therapy:* ₹2,699 (60m)\n• *Zakuzi Hydro Soak:* ₹2,199 (45m)\n• *Couples Retreat:* ₹4,999 (90m)\n• *Maharaja Dry Massage:* ₹2,299 (60m)\n\nWhich treatment feels right for your body today?`;
    actions = ['Book a Treatment', 'Couples Package', 'Speak to Reception'];
  } else if (lower.includes('address') || lower.includes('location') || lower.includes('where') || lower.includes('thaltej') || lower.includes('direction')) {
    fallbackReply = `📍 *Blossom Spa Location:*\n101, Bhagwat Bungalows Rd, Thaltej, Ahmedabad, Gujarat 380059\n(Near SG Highway, convenient private parking available).\n\n🕒 *Hours:* Open daily 10:00 AM – 9:00 PM\n📞 *Call:* 095741 56515\n\nWould you like to schedule an arrival time?`;
    actions = ['Open Google Maps', 'Book Slot Today', 'Call Directly'];
  } else if (lower.includes('couple') || lower.includes('anniversary') || lower.includes('two')) {
    fallbackReply = `*Couples Romantic Sanctuary Retreat* 🕯️\n\nExperience pure relaxation with your partner in our exclusive VIP Couple Suite! Includes:\n• Side-by-side synchronized full-body massage\n• Rose petal foot cleanse ritual\n• Herbal aromatherapy oils\n\n⏱ *Duration:* 90 min | 💰 ₹4,999 for two\n\nWould you like morning, afternoon, or evening timing?`;
    actions = ['Book Couples Suite', 'Evening 6 PM Slot', 'Ask a Question'];
  } else if (lower.includes('book') || lower.includes('appointment') || lower.includes('timing') || lower.includes('slot') || lower.includes('today')) {
    fallbackReply = `🌿 *Appointment Scheduling - Blossom Spa*\n\nWe would be delighted to reserve your session! We are open today from *10:00 AM to 9:00 PM*.\n\nPlease let us know:\n1. Preferred Service\n2. Date & Preferred Time Slot\n3. Any therapist preference (Male/Female)\n\nOr click below to complete your instant confirmation!`;
    actions = ['Open Booking Form', 'Select 4:00 PM Slot', 'Select 6:00 PM Slot'];
  } else {
    fallbackReply = `Namaste! 🙏 Welcome to *Blossom Spa Ahmedabad* (Thaltej).\n\nI am your automated WhatsApp spa assistant. I can help you with:\n• *Instant appointment scheduling*\n• *Hammam & Jacuzzi suite details*\n• *Pricing & treatment benefits*\n• *Location & parking in Thaltej*\n\nHow may I pamper you today?`;
  }

  res.json({
    success: true,
    reply: fallbackReply,
    suggestedActions: actions
  });
});

// Simulation of sending automated WhatsApp notification
app.post('/api/whatsapp/send-simulation', (req, res) => {
  const { customerPhone, customerName, type, details } = req.body;
  res.json({
    success: true,
    messageId: `WA-MSG-${Date.now()}`,
    status: 'delivered',
    sentTo: customerPhone,
    recipient: customerName,
    type: type || 'appointment_confirmation',
    deliveredAt: new Date().toISOString(),
    preview: `🌿 *Blossom Spa Ahmedabad* | Hello ${customerName}, your appointment for ${details?.serviceName || 'Spa Treatment'} on ${details?.date || 'today'} at ${details?.timeSlot || '11:00 AM'} is confirmed! Address: 101 Bhagwat Bungalows Rd, Thaltej. Call 095741 56515.`
  });
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Blossom Spa Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
