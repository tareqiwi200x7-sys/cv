import React from 'react';
import { Phone } from 'lucide-react';
import { useAppContext } from '../context';

export const FloatingWhatsApp = () => {
  const { personalInfo } = useAppContext();
  const phoneOnlyDigits = personalInfo.phone.replace(/[^0-9]/g, '');

  return (
    <a 
      href={`https://wa.me/${phoneOnlyDigits}`} 
      target="_blank" 
      rel="noreferrer"
      className="fixed bottom-8 left-8 z-[5000] w-[60px] h-[60px] rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] flex items-center justify-center text-white shadow-[0_0_30px_rgba(37,211,102,0.5),0_8px_25px_rgba(0,0,0,0.3)] transition-all hover:scale-110 hover:shadow-[0_0_50px_rgba(37,211,102,0.7)] group animate-[wa-pulse_2s_ease-in-out_infinite]"
    >
      <Phone className="w-8 h-8" />
      <span className="absolute left-[70px] bg-[#0a1428]/95 border border-[#25d366]/30 rounded-lg px-3 py-1.5 text-[0.85rem] whitespace-nowrap opacity-0 transition-opacity pointer-events-none group-hover:opacity-100">
        تواصل الآن عبر واتساب
      </span>
    </a>
  );
};
