import React, { useState, useEffect, useRef } from 'react';
import { useAppContext } from '../context';
import { motion, useInView } from 'motion/react';
import { CheckCircle, Phone, Clock, Mail } from 'lucide-react';
import { Project } from '../types';

export const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const { personalInfo } = useAppContext();
  
  return (
    <section id="stats" className="py-20 px-8 md:px-16" ref={ref}>
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-[1400px] mx-auto glass-card p-10 relative overflow-hidden"
      >
        <div className="text-center relative z-10">
          <span className="text-4xl md:text-5xl font-black text-black block mb-2">{personalInfo.stats.projects}</span>
          <div className="text-[#555] font-semibold text-sm uppercase tracking-widest">مشروع مكتمل</div>
        </div>
        <div className="text-center relative z-10">
          <span className="text-4xl md:text-5xl font-black text-black block mb-2">{personalInfo.stats.clients}</span>
          <div className="text-[#555] font-semibold text-sm uppercase tracking-widest">عميل سعيد</div>
        </div>
        <div className="text-center relative z-10">
          <span className="text-4xl md:text-5xl font-black text-black block mb-2">{personalInfo.stats.satisfaction}</span>
          <div className="text-[#555] font-semibold text-sm uppercase tracking-widest">نسبة رضا</div>
        </div>
        <div className="text-center relative z-10">
          <span className="text-4xl md:text-5xl font-black text-black block mb-2">{personalInfo.stats.experience}</span>
          <div className="text-[#555] font-semibold text-sm uppercase tracking-widest">سنوات خبرة</div>
        </div>
      </motion.div>
    </section>
  );
};

export const ServicesSection = () => {
  const { services } = useAppContext();
  
  return (
    <section id="services" className="py-28 px-8 md:px-16 relative">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-20 text-center">
          <div className="section-tag inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e4e5dd]"></span>
            شهادات ومهارات
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black leading-tight text-black">ما الذي يميزني؟</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              key={s.id}
              className="glass-card p-10 transition-all duration-500 group hover:-translate-y-2 hover:bg-white/60 flex flex-col"
            >
              <div className="w-16 h-16 rounded-2xl bg-black flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500">
                {s.icon}
              </div>
              <h3 className="text-2xl font-black text-black mb-4">{s.title}</h3>
              <p className="text-[#555] leading-relaxed mb-8 flex-1">{s.desc}</p>
              <div className="flex flex-col gap-3">
                {s.features.map((f, j) => (
                  <div key={j} className="flex items-center gap-3 text-[0.9rem] text-[#333] font-medium">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="shrink-0">
                       <path d="M20 6L9 17l-5-5"/>
                    </svg>
                    {f}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
