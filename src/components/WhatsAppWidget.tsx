import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Sparkles, Check, CheckCheck, Phone, ExternalLink, Calendar, MapPin, Clock } from 'lucide-react';
import { SPA_INFO, SPA_SERVICES } from '../data/spaData';
import { WhatsAppChatMessage } from '../types';

interface WhatsAppWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
  onOpenBooking: () => void;
  initialQuery?: string;
}

export const WhatsAppWidget: React.FC<WhatsAppWidgetProps> = ({
  isOpen,
  onClose,
  onToggle,
  onOpenBooking,
  initialQuery
}) => {
  const [messages, setMessages] = useState<WhatsAppChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'assistant',
      text: `Namaste! 🙏 Welcome to *Blossom Spa Ahmedabad*.\n\nI am your automated AI Concierge. I can help you with:\n• *Instant appointment booking*\n• *Turkish Hammam & Zakuzi details*\n• *Treatment prices & packages*\n• *Directions to our Thaltej sanctuary*\n\nHow may I help your wellness journey today?`,
      time: '10:00 AM',
      status: 'read'
    }
  ]);

  const [input, setInput] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (initialQuery && isOpen) {
      handleSendMessage(initialQuery);
    }
  }, [initialQuery]);

  const handleSendMessage = async (textToSend?: string) => {
    const text = (textToSend || input).trim();
    if (!text) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsg: WhatsAppChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      time: userTime,
      status: 'delivered'
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/whatsapp/ai-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          chatHistory: messages.slice(-6).map((m) => ({ sender: m.sender, text: m.text }))
        })
      });

      const data = await response.json();
      const replyText =
        data.reply ||
        `Thank you for contacting *Blossom Spa*. You can call us directly at 095741 56515 or visit us in Thaltej.`;

      const aiMsg: WhatsAppChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        status: 'read'
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Error fetching AI reply:', err);
      // Fallback
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-${Date.now()}`,
          sender: 'assistant',
          text: `🌿 Thank you! Our Blossom Spa reception team at 101 Bhagwat Bungalows Rd, Thaltej is ready to assist you. Call us anytime at *+91 95741 56515*.`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          status: 'read'
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const quickChips = [
    'Book Appointment Today',
    'Turkish Hammam Rates',
    'Couples Package',
    'Location in Thaltej',
    'Swedish vs Deep Tissue?'
  ];

  const formatTextWithWhatsAppStyle = (content: string) => {
    // Bold *text*
    const parts = content.split(/(\*[^*]+\*)/g);
    return parts.map((part, idx) => {
      if (part.startsWith('*') && part.endsWith('*')) {
        return <strong key={idx} className="font-semibold text-stone-900">{part.slice(1, -1)}</strong>;
      }
      return part;
    });
  };

  const getRealWhatsAppUrl = () => {
    const lastUserMessage = [...messages].reverse().find((m) => m.sender === 'user');
    const msg = lastUserMessage
      ? `Hello Blossom Spa, ${lastUserMessage.text}`
      : 'Hello Blossom Spa, I would like to book an appointment.';
    return `https://wa.me/${SPA_INFO.whatsappNumber}?text=${encodeURIComponent(msg)}`;
  };

  return (
    <>
      {/* Floating WhatsApp Trigger Button */}
      {!isOpen && (
        <button
          id="floating-whatsapp-btn"
          onClick={onToggle}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 flex items-center gap-3 group border-2 border-white"
          aria-label="Open WhatsApp AI Concierge"
        >
          <div className="relative">
            <MessageSquare className="w-7 h-7 fill-white" />
            <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
          </div>
          <div className="hidden md:flex flex-col text-left pr-1">
            <span className="text-[11px] font-medium leading-none text-emerald-100">
              Blossom Spa AI
            </span>
            <span className="text-xs font-bold leading-tight">
              Chat on WhatsApp
            </span>
          </div>
        </button>
      )}

      {/* Expanded WhatsApp Modal / Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[94vw] sm:w-[420px] h-[580px] max-h-[85vh] bg-[#ECE5DD] rounded-3xl shadow-2xl border border-stone-300 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* WhatsApp Header */}
          <div className="bg-[#075E54] text-white px-4 py-3 flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-amber-600 flex items-center justify-center font-serif font-bold text-white text-lg border border-amber-300">
                  B
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#075E54]" />
              </div>
              <div>
                <h4 className="text-sm font-bold tracking-wide flex items-center gap-1.5">
                  <span>Blossom Spa Thaltej</span>
                  <span className="bg-emerald-700/80 text-[10px] px-1.5 py-0.5 rounded text-emerald-100">
                    Official
                  </span>
                </h4>
                <p className="text-[11px] text-emerald-200 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>AI Automated Scheduling &amp; Support</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <a
                href={getRealWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                title="Continue on Real WhatsApp App"
                className="p-1.5 rounded-full hover:bg-[#128C7E] text-emerald-100 hover:text-white transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
              <button
                onClick={onClose}
                className="p-1.5 rounded-full hover:bg-[#128C7E] text-emerald-100 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Subheader info strip */}
          <div className="bg-[#128C7E]/10 border-b border-[#075E54]/20 px-3 py-1.5 flex items-center justify-between text-[11px] text-[#075E54]">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-emerald-700" />
              Open Today: 10 AM – 9 PM
            </span>
            <button
              onClick={() => {
                onClose();
                onOpenBooking();
              }}
              className="text-[11px] font-bold text-amber-900 bg-amber-200/80 hover:bg-amber-300 px-2 py-0.5 rounded transition-colors"
            >
              Book Form 📅
            </button>
          </div>

          {/* Chat Messages Body with WhatsApp background pattern simulation */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[radial-gradient(#d1d7db_1px,transparent_1px)] [background-size:16px_16px]">
            {/* Timestamp Notice */}
            <div className="text-center my-2">
              <span className="bg-[#E1F3FB] text-stone-600 text-[10px] font-medium px-3 py-1 rounded-md shadow-xs">
                Messages are protected with Blossom Spa AI encryption
              </span>
            </div>

            {messages.map((msg) => {
              const isMe = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex ${isMe ? 'justify-end' : 'justify-start'} animate-in fade-in`}
                >
                  <div
                    className={`relative max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-sm text-xs leading-relaxed ${
                      isMe
                        ? 'bg-[#DCF8C6] text-stone-900 rounded-tr-none'
                        : 'bg-white text-stone-800 rounded-tl-none border border-stone-200/60'
                    }`}
                  >
                    <div className="whitespace-pre-line font-sans">
                      {formatTextWithWhatsAppStyle(msg.text)}
                    </div>

                    <div className="flex items-center justify-end gap-1 text-[9px] text-stone-500 mt-1">
                      <span>{msg.time}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-sky-600" />}
                    </div>
                  </div>
                </div>
              );
            })}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl rounded-tl-none px-4 py-2.5 shadow-sm text-xs text-stone-500 flex items-center gap-1.5 border border-stone-200">
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.2s]" />
                  <span className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce [animation-delay:0.4s]" />
                  <span className="text-[10px] text-emerald-800 font-medium ml-1">
                    Blossom Spa AI is typing...
                  </span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action Suggestion Chips */}
          <div className="bg-white/80 backdrop-blur-xs px-3 py-2 border-t border-stone-200 flex gap-1.5 overflow-x-auto no-scrollbar">
            {quickChips.map((chip, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(chip)}
                className="whitespace-nowrap bg-stone-100 hover:bg-stone-200 text-stone-800 text-[11px] font-medium px-2.5 py-1 rounded-full border border-stone-300 transition-colors flex-shrink-0"
              >
                {chip}
              </button>
            ))}
          </div>

          {/* Message Input Bar */}
          <div className="bg-[#F0F2F5] p-2.5 border-t border-stone-200 flex items-center gap-2">
            <input
              type="text"
              placeholder="Ask about treatments, pricing, or request a booking slot..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
              className="flex-1 bg-white px-4 py-2.5 rounded-full text-xs text-stone-800 placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-[#128C7E] shadow-inner"
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={!input.trim()}
              className="p-2.5 rounded-full bg-[#128C7E] hover:bg-[#075E54] text-white disabled:opacity-40 disabled:hover:bg-[#128C7E] transition-colors shadow"
              aria-label="Send WhatsApp message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>

          {/* Footer note & Real WhatsApp Jump */}
          <div className="bg-stone-100 py-1.5 px-3 text-center border-t border-stone-200 flex items-center justify-between text-[10px] text-stone-500">
            <span>Powered by Gemini AI • Blossom Spa</span>
            <a
              href={getRealWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 font-bold hover:underline flex items-center gap-1"
            >
              <span>Switch to WhatsApp App</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        </div>
      )}
    </>
  );
};
