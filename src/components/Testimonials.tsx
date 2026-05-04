import React from 'react';
import { useAppContext } from '../context';
import { motion } from 'motion/react';

export const TestimonialsSection = () => {
  const { testimonials } = useAppContext();

  return (
    <section id="testimonials" className="py-28 px-8 md:px-16 relative bg-[#f9f9f9]">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="mb-20 text-center">
          <div className="section-tag inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e4e5dd]"></span>
            التقييمات
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black leading-tight text-black">ماذا قالوا عنّي؟</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.1, duration: 0.5 }}
              className="bg-white rounded-[2rem] p-10 relative transition-all duration-500 hover:-translate-y-2 hover:shadow-xl border border-black/5"
            >
              <div className="flex gap-1 text-black mb-6 text-xl">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <span key={j}>★</span>
                ))}
              </div>
              <p className="text-[#333] text-lg font-medium leading-[1.8] mb-8 font-serif">"{t.text}"</p>
              <div className="flex items-center gap-4 border-t border-black/5 pt-6">
                <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center font-bold text-white text-lg shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="font-bold text-black">{t.name}</div>
                  <div className="text-[#666] text-sm uppercase tracking-wider font-semibold">{t.title}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
