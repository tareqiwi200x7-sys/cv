import React, { useState } from 'react';
import { useAppContext } from '../context';
import { motion, AnimatePresence } from 'motion/react';
import { X, PlayCircle } from 'lucide-react';
import { Project } from '../types';

export const PortfolioSection = () => {
  const { projects } = useAppContext();
  const [filter, setFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = filter === 'all' ? projects : projects.filter((p: Project) => p.cat === filter);

  return (
    <section id="portfolio" className="py-28 px-8 md:px-16 relative">
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 text-center">
          <div className="section-tag inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e4e5dd]"></span>
            أعمالي
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black leading-tight text-black mb-4">معرض المشاريع</h2>
          <p className="text-lg text-[#555] max-w-2xl mx-auto leading-relaxed">أعمال سابقة تبرز مهاراتي في البرمجة والتصميم وإيجاد الحلول التقنية.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'ecommerce', label: 'متاجر إلكترونية' },
            { id: 'corporate', label: 'مواقع شركات' },
            { id: 'landing', label: 'صفحات هبوط' },
            { id: 'app', label: 'تطبيقات ويب' },
          ].map(f => (
            <button 
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 border ${filter === f.id ? 'bg-black border-black text-white shadow-lg' : 'bg-white/50 border-black/10 text-[#555] hover:bg-white hover:border-black/20'}`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((p: Project) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                onClick={() => setSelectedProject(p)}
                className="rounded-2xl overflow-hidden relative aspect-[4/3] cursor-pointer group border border-border-subtle bg-gradient-to-br from-[#0f1729] to-[#1a2545]"
              >
                <div className="w-full h-full flex items-center justify-center text-5xl relative z-0 transition-transform duration-500 group-hover:scale-110" style={{ background: p.color }}>
                  {p.emoji}
                </div>
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 to-purple-600/90 flex flex-col items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-400 pt-8">
                  <h3 className="text-xl font-bold text-white text-center px-4">{p.title}</h3>
                  <p className="text-white/80 text-sm text-center px-6">{p.desc.slice(0, 60)}...</p>
                  <button className="px-6 py-2 bg-white text-accent-blue rounded-full font-bold text-sm mt-2 transform transition-transform hover:scale-105 inline-flex items-center gap-2">
                    <PlayCircle className="w-4 h-4" />
                    عرض المشروع
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9000] flex items-center justify-center p-4 md:p-8"
          >
            <div className="absolute inset-0 bg-[#e4e5dd]/80 backdrop-blur-sm" onClick={() => setSelectedProject(null)}></div>
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white border border-black/10 rounded-[2.5rem] w-full max-w-4xl max-h-[90vh] overflow-y-auto relative z-10 p-8 md:p-12 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="absolute top-6 left-6 w-12 h-12 rounded-full bg-[#f0f0eb] border border-black/5 flex items-center justify-center text-black hover:bg-red-500 hover:text-white hover:border-red-500 transition-all"
              >
                <X className="w-6 h-6" />
              </button>

              {selectedProject.video && (
                <div className="w-full aspect-video rounded-3xl overflow-hidden mb-10 border border-black/5 shadow-lg bg-black">
                  <iframe src={selectedProject.video} className="w-full h-full border-none" allowFullScreen></iframe>
                </div>
              )}

              <h2 className="text-4xl font-black text-black mb-4">{selectedProject.emoji} {selectedProject.title}</h2>
              <p className="text-lg text-[#555] leading-relaxed mb-10">{selectedProject.desc}</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#f9f9f9] rounded-[2rem] p-8 border border-black/5 mb-10">
                <div>
                  <h4 className="text-black font-black mb-3 flex items-center gap-2 text-lg">💡 تحدي</h4>
                  <p className="text-base text-[#555] leading-relaxed">{selectedProject.problem}</p>
                </div>
                <div>
                  <h4 className="text-black font-black mb-3 flex items-center gap-2 text-lg">🚀 حل تقني</h4>
                  <p className="text-base text-[#555] leading-relaxed">{selectedProject.solution}</p>
                </div>
                <div>
                  <h4 className="text-black font-black mb-3 flex items-center gap-2 text-lg">✅ نتيجة</h4>
                  <p className="text-base text-[#555] leading-relaxed">{selectedProject.result}</p>
                </div>
              </div>

              <div className="text-center">
                <a href="#contact" onClick={() => setSelectedProject(null)} className="btn-primary inline-flex">تواصل معي لبناء مشروعك</a>
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
