import React, { useState } from 'react';
import { useAppContext } from '../context';
import { motion } from 'motion/react';
import { Mail, Phone, Clock, CheckCircle, Twitter, Instagram, Linkedin } from 'lucide-react';

export const ContactSection = () => {
  const { setMessages, personalInfo } = useAppContext();
  const [form, setForm] = useState({ name: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      alert('من فضلك أدخل الاسم ورقم الواتساب');
      return;
    }
    
    setMessages(prev => [...prev, {
      id: Date.now(),
      name: form.name,
      phone: form.phone,
      service: form.service || 'غير محدد',
      message: form.message,
      date: new Date().toISOString().split('T')[0]
    }]);
    
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-28 px-8 md:px-16 bg-[#e4e5dd]">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-16 items-start">
        <motion.div 
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="section-tag inline-flex items-center gap-2 px-6 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            <span className="w-2 h-2 rounded-full bg-[#e4e5dd]"></span>
            تواصل معي
          </div>
          <h2 className="text-[clamp(2.5rem,4vw,3.5rem)] font-black leading-tight text-black mb-4">جاهز لبدء مشروعك؟</h2>
          <p className="text-lg text-[#555] mb-8">تواصل معي الآن وسأرد خلال ساعة واحدة لنبدأ رحلة نجاحك</p>
          
          <div className="flex flex-col gap-6 mb-8">
            <div className="bg-white/60 p-6 rounded-[2rem] flex items-start gap-4 transition-all duration-300 hover:bg-white border border-black/5">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm border-b pb-1 font-bold mb-1 border-black/10">البريد الإلكتروني</div>
                <div className="font-semibold text-black">{personalInfo.email}</div>
              </div>
            </div>
            
            <div className="bg-white/60 p-6 rounded-[2rem] flex items-start gap-4 transition-all duration-300 hover:bg-white border border-black/5">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm border-b pb-1 font-bold mb-1 border-black/10">رقم الهاتف</div>
                <div className="font-semibold text-black" dir="ltr">{personalInfo.phone}</div>
              </div>
            </div>
            
            <div className="bg-white/60 p-6 rounded-[2rem] flex items-start gap-4 transition-all duration-300 hover:bg-white border border-black/5">
              <div className="w-12 h-12 rounded-full bg-black flex items-center justify-center text-white shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-sm border-b pb-1 font-bold mb-1 border-black/10">أوقات العمل</div>
                <div className="font-semibold text-black">{personalInfo.workingHours}</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-[2.5rem] p-10 border border-black/5 shadow-xl"
        >
          {submitted ? (
            <div className="text-center py-16 text-black">
              <CheckCircle className="w-16 h-16 mx-auto mb-6 text-green-500" />
              <h3 className="text-2xl font-black mb-2">تم إرسال رسالتك بنجاح! ✅</h3>
              <p className="text-[#555]">سأتواصل معك خلال ساعة واحدة</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="text-[1.8rem] font-black text-black">📋 أخبرني عن مشروعك</div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-[#555]">الاسم الكامل</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="الاسم" 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-[#555]">رقم الواتساب</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="+966 5X XXX XXXX" 
                  dir="ltr" 
                  value={form.phone} 
                  onChange={e => setForm({...form, phone: e.target.value})} 
                />
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-[#555]">نوع الخدمة المطلوبة</label>
                <select 
                  className="form-select text-black" 
                  value={form.service} 
                  onChange={e => setForm({...form, service: e.target.value})}
                >
                  <option value="">اختر الخدمة...</option>
                  <option>تصميم موقع احترافي</option>
                  <option>متجر إلكتروني</option>
                  <option>صفحة هبوط تسويقية</option>
                  <option>تطوير تطبيق ويب</option>
                  <option>تحسين موقع قائم</option>
                  <option>استشارة تسويقية</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-bold mb-2 text-[#555]">تفاصيل المشروع</label>
                <textarea 
                  className="form-textarea min-h-[120px]" 
                  placeholder="أهدافك والنتائج التي تتوقعها..." 
                  value={form.message} 
                  onChange={e => setForm({...form, message: e.target.value})} 
                />
              </div>
              
              <button type="submit" className="w-full py-4 bg-black rounded-full font-bold text-white mt-4 shadow-lg transition-transform hover:-translate-y-1">
                🚀 أرسل طلبك الآن
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export const Footer = () => {
  const { setIsAdminOpen, personalInfo } = useAppContext();
  
  return (
    <footer className="bg-black py-16 px-8 md:px-16 text-center relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="text-3xl font-black text-white mb-6">{personalInfo.name} | {personalInfo.role.split(' ')[0]}</div>
        
        <div className="flex flex-wrap justify-center gap-8 mb-10 text-sm font-semibold uppercase tracking-wider">
          <a href="#services" className="text-[#888] hover:text-white transition-colors">خبراتي</a>
          <a href="#portfolio" className="text-[#888] hover:text-white transition-colors">أعمالي</a>
          <a href="#testimonials" className="text-[#888] hover:text-white transition-colors">آراء العملاء</a>
          <a href="#contact" className="text-[#888] hover:text-white transition-colors">تواصل معي</a>
        </div>
        
        <div className="flex justify-center gap-4 mb-10">
          {[
            { icon: <Twitter className="w-5 h-5" /> },
            { icon: <Instagram className="w-5 h-5" /> },
            { icon: <Linkedin className="w-5 h-5" /> },
            { icon: <Phone className="w-5 h-5" />, href: `https://wa.me/${personalInfo.phone.replace(/[^0-9]/g, '')}` }
          ].map((social, i) => (
            <a key={i} href={social.href || '#'} className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white transition-all hover:bg-white hover:text-black">
              {social.icon}
            </a>
          ))}
        </div>
        
        <p className="text-[#666] text-sm">© 2025 {personalInfo.name} — جميع الحقوق محفوظة</p>
      </div>
    </footer>
  );
};
