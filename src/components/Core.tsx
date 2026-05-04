import React, { useState, useEffect } from 'react';
import { useCursor } from '../hooks';
import { useAppContext } from '../context';
import { motion, AnimatePresence } from 'motion/react';

const Loader = () => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#f0f0eb] z-[99999] flex flex-col items-center justify-center transition-all duration-600"
        >
          <div className="flex items-center gap-3 mb-8 animate-[pulse-opacity_1.5s_ease-in-out_infinite]">
             <div className="w-10 h-10 opacity-70">
              <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 0C50 0 65 35 100 50C100 50 65 65 50 100C50 100 35 65 0 50C0 50 35 35 50 0Z" fill="black"/>
              </svg>
            </div>
            <div className="text-4xl font-black text-black">محترف ويب</div>
          </div>
          <div className="w-[200px] h-[3px] bg-black/10 rounded-full overflow-hidden">
            <div className="h-full bg-black rounded-full animate-[load_2s_ease-in-out_forwards]"></div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const CustomCursor = () => {
  const { mousePosition, followerPosition, isHovering } = useCursor();
  
  return (
    <>
      <div 
        className="fixed w-3 h-3 bg-black rounded-full pointer-events-none z-[99998] transition-transform duration-100 mix-blend-difference"
        style={{ left: mousePosition.x - 6, top: mousePosition.y - 6 }}
      />
      <div 
        className={`fixed border-[1.5px] rounded-full pointer-events-none z-[99997] transition-all duration-150 mix-blend-difference ${isHovering ? 'w-[72px] h-[72px] border-black' : 'w-10 h-10 border-black/40'}`}
        style={{ left: followerPosition.x, top: followerPosition.y }}
      />
    </>
  );
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const { setIsAdminOpen } = useAppContext();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 right-0 left-0 z-50 flex items-center justify-between transition-all duration-500 ${scrolled ? 'pt-4 pb-4 px-8 md:px-16 bg-[#f0f0eb]/90 backdrop-blur-md border-b border-black/5' : 'pt-8 pb-4 px-8 md:px-16'}`}>
      <div 
        className="flex items-center gap-3 cursor-pointer"
        onClick={(e) => e.detail >= 3 && setIsAdminOpen(true)}
        title="انقر 3 مرات لفتح لوحة التحكم"
      >
        <div className="w-8 h-8 opacity-70">
          <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M50 0C50 0 65 35 100 50C100 50 65 65 50 100C50 100 35 65 0 50C0 50 35 35 50 0Z" fill="currentColor"/>
          </svg>
        </div>
        <div className="text-lg font-bold tracking-tight text-black flex items-center gap-2">
          <span>ملفي الشخصي</span>
        </div>
      </div>
      
      <div className="hidden md:flex bg-[#111111] rounded-full p-1.5 items-center shadow-lg gap-2">
        {['خبراتي', 'أعمالي', 'آراء العملاء'].map((text, i) => {
          const href = '#' + ['services', 'portfolio', 'testimonials'][i];
          return (
            <a key={text} href={href} className="text-white/80 hover:text-white px-4 py-2 text-sm font-medium transition-colors">
              {text}
            </a>
          );
        })}
      </div>

      <div className="hidden md:flex">
        <a href="#contact" className="border border-black/20 rounded-full px-6 py-3 text-sm font-semibold flex items-center gap-2 hover:bg-black/5 transition-colors">
          <span className="w-2 h-2 rounded-full bg-black"></span>
          تواصل معي
        </a>
      </div>
    </nav>
  );
};

const Hero = () => {
  const [showVideo, setShowVideo] = useState(false);
  const { personalInfo } = useAppContext();

  return (
    <section id="hero" className="min-h-[100svh] flex flex-col items-center justify-center relative overflow-hidden pt-36 pb-16 px-8 md:px-16">
      {/* Abstract Background Element (Frosted glass / light vibe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[80vw] h-[80vh] max-w-[1000px] bg-gradient-to-br from-[#d4d3c9] via-[#c2c0b4] to-[#a09e90] rounded-[40%_60%_70%_30%/40%_50%_60%_50%] rotate-12 opacity-40 blur-[80px] -z-10 mix-blend-multiply"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-1/2 w-[70vw] h-[70vh] max-w-[800px] bg-gradient-to-tl from-[#e3e2d8] to-transparent rounded-[30%_70%_70%_30%/30%_30%_70%_70%] opacity-60 blur-[60px] -z-10 mix-blend-overlay"></div>

      <div className="text-center w-full max-w-4xl mx-auto z-10 mb-12">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           animate={{ opacity: 1, scale: 1 }}
           transition={{ duration: 0.5 }}
           className="w-32 h-32 md:w-40 md:h-40 bg-[#dcdcd3] rounded-full mx-auto mb-8 border-4 border-white shadow-xl overflow-hidden flex items-center justify-center text-5xl"
        >
          {personalInfo.avatar.startsWith('http') || personalInfo.avatar.startsWith('data:image') ? (
            <img src={personalInfo.avatar} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            personalInfo.avatar
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 bg-black/5 border border-black/10 rounded-full text-sm font-bold uppercase tracking-widest text-[#555] mb-6"
        >
          {personalInfo.availabilityStatus && <span className="w-2 h-2 rounded-full bg-green-500 animate-[blink_1.5s_ease_infinite]"></span>}
          {personalInfo.availabilityStatus || 'متاح للعمل'}
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-[clamp(2.5rem,5vw,4.5rem)] font-black text-black leading-[1.2] tracking-tight mb-6 flex flex-col items-center gap-2"
        >
          <span className="flex items-center justify-center gap-3 flex-wrap">
            <span>مرحباً، أنا {personalInfo.name}</span>
            <span className="inline-block origin-bottom-right hover:animate-[wave_0.5s_ease-in-out_infinite]">👋</span>
          </span>
          <span className="text-[#666] text-[clamp(1.75rem,3.5vw,3rem)] mt-1">{personalInfo.role}</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-[#555] max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          {personalInfo.bio}
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4"
        >
          <a href="#portfolio" className="btn-primary">شاهد أعمالي</a>
          {personalInfo.resumeVideo && (
            <button onClick={() => setShowVideo(true)} className="btn-secondary flex items-center gap-2">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4Z"/></svg>
              فيديو تعريفي
            </button>
          )}
        </motion.div>
      </div>

      {showVideo && personalInfo.resumeVideo && (
        <div className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden relative shadow-2xl border border-white/10">
            <button onClick={() => setShowVideo(false)} className="absolute top-4 right-4 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors z-10">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6 6 18M6 6l12 12"/></svg>
            </button>
            <iframe 
              className="w-full h-full"
              src={personalInfo.resumeVideo} 
              title="فيديو تعريفي" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </section>
  );
};

export const AppLayout = () => {
  return (
    <>
      <Loader />
      <CustomCursor />
      <Navbar />
      <Hero />
    </>
  );
};
