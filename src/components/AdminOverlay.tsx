import React, { useState, useEffect } from 'react';
import { useAppContext } from '../context';
import { motion, AnimatePresence } from 'motion/react';
import { TrendingUp } from 'lucide-react';

export const AdminOverlay = () => {
  const { 
    isAdminOpen, setIsAdminOpen, 
    projects, services, testimonials, messages, personalInfo, visits, setVisits,
    setProjects, setServices, setTestimonials, setPersonalInfo
  } = useAppContext();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ user: '', pass: '' });
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const [projForm, setProjForm] = useState({ id: '', title: '', cat: 'ecommerce', desc: '', problem: '', solution: '', result: '', video: '', color: '', emoji: '' });
  const [svcForm, setSvcForm] = useState({ id: '', title: '', desc: '', icon: '', features: '' });
  const [testForm, setTestForm] = useState({ id: '', name: '', title: '', text: '', rating: 5, avatar: '' });
  const [infoForm, setInfoForm] = useState({ ...personalInfo });

  useEffect(() => {
    setInfoForm({ ...personalInfo });
  }, [personalInfo]);

  const handleLogin = () => {
    if (loginForm.user === 'admin' && loginForm.pass === 'admin123') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setLoginForm({ user: '', pass: '' });
    setActiveTab('overview');
  };

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-[99000] bg-bg-primary overflow-y-auto w-full h-full">
      {!isAuthenticated ? (
        <div className="min-h-screen flex items-center justify-center p-4">
          <div className="glass-card p-12 w-full max-w-[420px] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
            <div className="text-[1.8rem] font-black gradient-text text-center mb-2">⚡ لوحة التحكم</div>
            <div className="text-center text-text-muted text-sm mb-8">أدخل بيانات تسجيل الدخول</div>
            
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2 text-text-secondary">اسم المستخدم</label>
              <input type="text" className="form-input" placeholder="admin" value={loginForm.user} onChange={e => setLoginForm({...loginForm, user: e.target.value})} />
            </div>
            
            <div className="mb-6">
              <label className="block text-sm font-semibold mb-2 text-text-secondary">كلمة المرور</label>
              <input type="password" className="form-input" placeholder="••••••••" value={loginForm.pass} onChange={e => setLoginForm({...loginForm, pass: e.target.value})} />
            </div>
            
            {loginError && <div className="text-red-500 text-sm mb-4">بيانات خاطئة. حاول مجدداً.</div>}
            
            <button onClick={handleLogin} className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-transform hover:-translate-y-1">
              🔐 تسجيل الدخول
            </button>
            
            <div className="mt-6 text-center">
              <button onClick={() => setIsAdminOpen(false)} className="text-text-muted text-sm hover:text-white transition-colors bg-transparent border-none">← العودة للموقع</button>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex flex-col">
          <header className="sticky top-0 bg-[#020817]/95 backdrop-blur-xl border-b border-border-subtle p-4 md:px-8 flex items-center justify-between z-10 flex-wrap gap-4">
            <div className="text-xl font-black gradient-text">⚡ لوحة التحكم</div>
            <div className="flex gap-2 flex-wrap">
              {[
                { id: 'overview', label: '📊 نظرة عامة' },
                { id: 'profile', label: '👤 بياناتي' },
                { id: 'projects', label: '🎨 المشاريع' },
                { id: 'services', label: '⚙️ الخدمات' },
                { id: 'testimonials', label: '⭐ التقييمات' },
                { id: 'messages', label: '📩 الرسائل' },
              ].map(tab => (
                <button 
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${activeTab === tab.id ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white' : 'bg-bg-card border border-border-subtle text-text-secondary hover:bg-blue-500/10'}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-4">
              <button onClick={() => setIsAdminOpen(false)} className="text-text-muted text-sm hover:text-white transition-colors bg-transparent border-none">← الموقع</button>
              <button onClick={handleLogout} className="px-4 py-2 rounded-lg bg-red-500/10 border border-red-500/30 text-red-500 font-semibold text-sm">تسجيل الخروج</button>
            </div>
          </header>
          
          <main className="flex-1 p-6 md:p-8">
            <AnimatePresence mode="wait">
              {activeTab === 'overview' && (
                <motion.div key="overview" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6 text-black">📊 نظرة عامة</h2>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 text-black">
                    {[
                      { label: 'الزيارات', count: visits, reset: true },
                      { label: 'المشاريع', count: projects.length },
                      { label: 'الخدمات', count: services.length },
                      { label: 'التقييمات', count: testimonials.length },
                      { label: 'الرسائل الواردة', count: messages.length },
                    ].map((stat, i) => (
                      <div key={i} className="glass-card p-6 text-center border border-black/10 relative">
                        <div className="text-3xl font-black">{stat.count}</div>
                        <div className="text-sm text-[#555] mt-1">{stat.label}</div>
                        {stat.reset && (
                          <button 
                            onClick={() => {
                              localStorage.setItem('site_visits', '0');
                              setVisits(0);
                            }}
                            className="absolute top-2 right-2 text-xs bg-red-50 text-red-500 px-2 py-1 rounded hover:bg-red-100"
                          >
                            تصفير
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="glass-card p-12 text-center text-[#555] border border-black/10 flex flex-col items-center">
                    <TrendingUp className="w-12 h-12 text-black mb-4" />
                    مرحباً بك في لوحة التحكم الخاصة بك. يمكنك إدارة محتوى الموقع بالكامل من هنا.
                  </div>
                </motion.div>
              )}
              {activeTab === 'profile' && (
                <motion.div key="profile" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6 text-black">👤 بياناتي الشخصية</h2>
                  <div className="glass-card p-6 border border-black/10 max-w-3xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-black">
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 font-bold text-[#555]">الصورة الشخصية (رمز تعبيري، رابط، أو رفع صورة)</label>
                        <div className="flex gap-2">
                          <input type="text" className="form-input flex-1" value={infoForm.avatar} onChange={e => setInfoForm({...infoForm, avatar: e.target.value})} placeholder="👨‍💻 أو https://..." />
                          <label className="bg-black text-white px-4 py-2 rounded-lg cursor-pointer flex items-center justify-center font-bold hover:bg-gray-800 transition-colors whitespace-nowrap">
                            رفع صورة
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  const reader = new FileReader();
                                  reader.onloadend = () => {
                                    setInfoForm({...infoForm, avatar: reader.result as string});
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }} 
                            />
                          </label>
                        </div>
                        {infoForm.avatar.length > 100 && <p className="text-xs text-green-600 mt-1">تم رفع الصورة ومحفوظة الآن كبيانات (Base64)</p>}
                      </div>
                      <div>
                        <label className="block text-sm mb-1 font-bold text-[#555]">الاسم</label>
                        <input type="text" className="form-input" value={infoForm.name} onChange={e => setInfoForm({...infoForm, name: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 font-bold text-[#555]">المسمى الوظيفي</label>
                        <input type="text" className="form-input" value={infoForm.role} onChange={e => setInfoForm({...infoForm, role: e.target.value})} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 font-bold text-[#555]">نبذة عني</label>
                        <textarea className="form-textarea h-24" value={infoForm.bio} onChange={e => setInfoForm({...infoForm, bio: e.target.value})} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 font-bold text-[#555]">رابط الفيديو التعريفي (يوتيوب تضمين)</label>
                        <input type="text" className="form-input" value={infoForm.resumeVideo} onChange={e => setInfoForm({...infoForm, resumeVideo: e.target.value})} placeholder="https://www.youtube.com/embed/..." />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 font-bold text-[#555]">رقم الواتساب / الهاتف</label>
                        <input type="text" className="form-input" dir="ltr" value={infoForm.phone} onChange={e => setInfoForm({...infoForm, phone: e.target.value})} />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 font-bold text-[#555]">البريد الإلكتروني</label>
                        <input type="text" className="form-input" dir="ltr" value={infoForm.email} onChange={e => setInfoForm({...infoForm, email: e.target.value})} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 font-bold text-[#555]">أوقات العمل</label>
                        <input type="text" className="form-input" value={infoForm.workingHours} onChange={e => setInfoForm({...infoForm, workingHours: e.target.value})} />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm mb-1 font-bold text-[#555]">حالة التوفر (مثال: متاح للعمل)</label>
                        <input type="text" className="form-input" value={infoForm.availabilityStatus} onChange={e => setInfoForm({...infoForm, availabilityStatus: e.target.value})} />
                      </div>
                      
                      <div className="md:col-span-2 mt-4">
                        <h3 className="font-bold text-lg border-b border-black/10 pb-2 mb-4">إحصائيات الموقع (تظهر في قسم الأرقام)</h3>
                      </div>
                      <div>
                        <label className="block text-sm mb-1 font-bold text-[#555]">المشاريع المكتملة</label>
                        <input type="text" className="form-input" value={infoForm.stats.projects} onChange={e => setInfoForm({...infoForm, stats: {...infoForm.stats, projects: e.target.value}})} />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 font-bold text-[#555]">العملاء السعداء</label>
                        <input type="text" className="form-input" value={infoForm.stats.clients} onChange={e => setInfoForm({...infoForm, stats: {...infoForm.stats, clients: e.target.value}})} />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 font-bold text-[#555]">نسبة الرضا</label>
                        <input type="text" className="form-input" value={infoForm.stats.satisfaction} onChange={e => setInfoForm({...infoForm, stats: {...infoForm.stats, satisfaction: e.target.value}})} />
                      </div>
                      <div>
                        <label className="block text-sm mb-1 font-bold text-[#555]">سنوات الخبرة</label>
                        <input type="text" className="form-input" value={infoForm.stats.experience} onChange={e => setInfoForm({...infoForm, stats: {...infoForm.stats, experience: e.target.value}})} />
                      </div>

                      <div className="md:col-span-2 mt-4">
                        <button 
                          onClick={() => {
                            setPersonalInfo(infoForm);
                            alert('تم حفظ البيانات بنجاح ✅');
                          }} 
                          className="w-full py-3 bg-black rounded-lg font-bold text-white shadow-xl hover:-translate-y-1 transition-all"
                        >
                          💾 حفظ البيانات
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'projects' && (
                <motion.div key="projects" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6 text-black">🎨 إدارة المشاريع</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
                    <div className="glass-card p-6 border border-black/10">
                      <h3 className="text-lg font-bold mb-4 border-b border-black/10 pb-4 text-black">{projForm.id ? '✏️ تعديل المشروع' : '➕ إضافة مشروع جديد'}</h3>
                      <div className="space-y-4 text-black">
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">عنوان المشروع</label><input type="text" className="form-input" value={projForm.title} onChange={e => setProjForm({...projForm, title: e.target.value})} placeholder="اسم المشروع" /></div>
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">التقنية المستخدمة (فئة)</label>
                          <select className="form-select" value={projForm.cat} onChange={e => setProjForm({...projForm, cat: e.target.value})}>
                            <option value="ecommerce">متاجر إلكترونية</option><option value="corporate">تطبيقات أعمال</option><option value="landing">تصميم واجهات</option><option value="app">تطبيقات ويب</option>
                          </select>
                        </div>
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">وصف المشروع</label><textarea className="form-textarea" value={projForm.desc} onChange={e => setProjForm({...projForm, desc: e.target.value})} placeholder="نظرة عامة..." /></div>
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">التحدي</label><input type="text" className="form-input" value={projForm.problem} onChange={e => setProjForm({...projForm, problem: e.target.value})} placeholder="المشكلة الأساسية" /></div>
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">دورك والمساهمة</label><input type="text" className="form-input" value={projForm.solution} onChange={e => setProjForm({...projForm, solution: e.target.value})} placeholder="ماذا قدمت؟" /></div>
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">الأثر / النتيجة</label><input type="text" className="form-input" value={projForm.result} onChange={e => setProjForm({...projForm, result: e.target.value})} placeholder="النتائج" /></div>
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">رابط يوتيوب (للعرض)</label><input type="text" className="form-input" value={projForm.video} onChange={e => setProjForm({...projForm, video: e.target.value})} placeholder="https://youtube.com/..." /></div>
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">لون الخلفية (افتراضي: رمادي)</label><input type="text" className="form-input" value={projForm.color} onChange={e => setProjForm({...projForm, color: e.target.value})} placeholder="#e4e5dd" /></div>
                        <div><label className="block text-sm mb-1 font-bold text-[#555]">رمز تعبيري</label><input type="text" className="form-input" value={projForm.emoji} onChange={e => setProjForm({...projForm, emoji: e.target.value})} placeholder="💻" /></div>
                        <button onClick={() => {
                          if (!projForm.title) return alert('أدخل عنوان المشروع');
                          const p: any = { ...projForm, id: projForm.id ? Number(projForm.id) : Date.now() };
                          if (projForm.id) setProjects(projects.map(x => x.id === p.id ? p : x));
                          else setProjects([...projects, p]);
                          setProjForm({ id: '', title: '', cat: 'ecommerce', desc: '', problem: '', solution: '', result: '', video: '', color: '', emoji: '' });
                        }} className="w-full py-3 bg-black rounded-lg font-bold text-white shadow-xl mt-4 hover:-translate-y-1 transition-all">💾 حفظ المشروع</button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">📋 قائمة المشاريع</h3>
                      <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2">
                        {projects.length === 0 ? <p className="text-text-muted text-center p-8">لا توجد مشاريع</p> : projects.map((p: any) => (
                          <div key={p.id} className="glass-card p-4 flex items-center justify-between gap-4">
                            <div><div className="font-semibold">{p.emoji} {p.title}</div><div className="text-sm text-text-muted">{p.cat}</div></div>
                            <div className="flex gap-2 shrink-0">
                              <button onClick={() => setProjForm({ ...p, id: String(p.id) })} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-accent-blue text-sm hover:bg-blue-500/20">✏️ تعديل</button>
                              <button onClick={() => { if(confirm('هل أنت متأكد؟')) setProjects(projects.filter(x => x.id !== p.id)); }} className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm hover:bg-red-500/20">🗑 حذف</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'services' && (
                <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">⚙️ إدارة الخدمات</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-bold mb-4 border-b border-border-subtle pb-4">{svcForm.id ? '✏️ تعديل الخدمة' : '➕ إضافة خدمة جديدة'}</h3>
                      <div className="space-y-4">
                        <div><label className="block text-sm mb-1 text-text-secondary">عنوان الخدمة</label><input type="text" className="form-input" value={svcForm.title} onChange={e => setSvcForm({...svcForm, title: e.target.value})} placeholder="اسم الخدمة" /></div>
                        <div><label className="block text-sm mb-1 text-text-secondary">وصف الخدمة</label><textarea className="form-textarea" value={svcForm.desc} onChange={e => setSvcForm({...svcForm, desc: e.target.value})} placeholder="وصف الخدمة وفوائدها..." /></div>
                        <div><label className="block text-sm mb-1 text-text-secondary">رمز الخدمة</label><input type="text" className="form-input" value={svcForm.icon} onChange={e => setSvcForm({...svcForm, icon: e.target.value})} placeholder="🎨" /></div>
                        <div><label className="block text-sm mb-1 text-text-secondary">المميزات (مفصولة بفاصلة)</label><textarea className="form-textarea" value={svcForm.features} onChange={e => setSvcForm({...svcForm, features: e.target.value})} placeholder="تصميم عصري, سرعة عالية, تحسين SEO" /></div>
                        <button onClick={() => {
                          if (!svcForm.title) return alert('أدخل عنوان الخدمة');
                          const feats = typeof svcForm.features === 'string' ? svcForm.features.split(',').map((f: string) => f.trim()).filter(Boolean) : svcForm.features;
                          const s: any = { ...svcForm, features: feats, id: svcForm.id ? Number(svcForm.id) : Date.now() };
                          if (svcForm.id) setServices(services.map(x => x.id === s.id ? s : x));
                          else setServices([...services, s]);
                          setSvcForm({ id: '', title: '', desc: '', icon: '', features: '' });
                        }} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-2">💾 حفظ الخدمة</button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">📋 قائمة الخدمات</h3>
                      <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2">
                        {services.length === 0 ? <p className="text-text-muted text-center p-8">لا توجد خدمات</p> : services.map((s: any) => (
                          <div key={s.id} className="glass-card p-4 flex items-center justify-between gap-4">
                            <div><div className="font-semibold">{s.icon} {s.title}</div><div className="text-sm text-text-muted">{s.desc.slice(0,50)}...</div></div>
                            <div className="flex gap-2 shrink-0">
                              <button onClick={() => setSvcForm({ ...s, id: String(s.id), features: Array.isArray(s.features) ? s.features.join('، ') : s.features })} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-accent-blue text-sm hover:bg-blue-500/20">✏️ تعديل</button>
                              <button onClick={() => { if(confirm('هل أنت متأكد؟')) setServices(services.filter(x => x.id !== s.id)); }} className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm hover:bg-red-500/20">🗑 حذف</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'testimonials' && (
                <motion.div key="testimonials" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">⭐ إدارة التقييمات</h2>
                  <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.5fr] gap-8 items-start">
                    <div className="glass-card p-6">
                      <h3 className="text-lg font-bold mb-4 border-b border-border-subtle pb-4">{testForm.id ? '✏️ تعديل التقييم' : '➕ إضافة تقييم جديد'}</h3>
                      <div className="space-y-4">
                        <div><label className="block text-sm mb-1 text-text-secondary">اسم العميل</label><input type="text" className="form-input" value={testForm.name} onChange={e => setTestForm({...testForm, name: e.target.value})} placeholder="محمد أحمد" /></div>
                        <div><label className="block text-sm mb-1 text-text-secondary">المسمى الوظيفي</label><input type="text" className="form-input" value={testForm.title} onChange={e => setTestForm({...testForm, title: e.target.value})} placeholder="مدير متجر" /></div>
                        <div><label className="block text-sm mb-1 text-text-secondary">نص التقييم</label><textarea className="form-textarea" value={testForm.text} onChange={e => setTestForm({...testForm, text: e.target.value})} placeholder="رأي العميل..." /></div>
                        <div><label className="block text-sm mb-1 text-text-secondary">التقييم (1-5)</label>
                          <select className="form-select" value={testForm.rating} onChange={e => setTestForm({...testForm, rating: Number(e.target.value)})}>
                            <option value={5}>⭐⭐⭐⭐⭐ (5)</option><option value={4}>⭐⭐⭐⭐ (4)</option><option value={3}>⭐⭐⭐ (3)</option>
                          </select>
                        </div>
                        <div><label className="block text-sm mb-1 text-text-secondary">حرف الصورة الرمزية</label><input type="text" className="form-input" maxLength={2} value={testForm.avatar} onChange={e => setTestForm({...testForm, avatar: e.target.value})} placeholder="م" /></div>
                        <button onClick={() => {
                          if (!testForm.name || !testForm.text) return alert('أدخل اسم العميل ونص التقييم');
                          const t: any = { ...testForm, id: testForm.id ? Number(testForm.id) : Date.now() };
                          if (testForm.id) setTestimonials(testimonials.map(x => x.id === t.id ? t : x));
                          else setTestimonials([...testimonials, t]);
                          setTestForm({ id: '', name: '', title: '', text: '', rating: 5, avatar: '' });
                        }} className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] mt-2">💾 حفظ التقييم</button>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-lg font-bold mb-4">📋 قائمة التقييمات</h3>
                      <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2">
                        {testimonials.length === 0 ? <p className="text-text-muted text-center p-8">لا توجد تقييمات</p> : testimonials.map((t: any) => (
                          <div key={t.id} className="glass-card p-4 flex items-center justify-between gap-4">
                            <div><div className="font-semibold">{t.avatar} {t.name}</div><div className="text-sm text-text-muted">{t.title}</div></div>
                            <div className="flex gap-2 shrink-0">
                              <button onClick={() => setTestForm({ ...t, id: String(t.id) })} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/30 rounded-lg text-accent-blue text-sm hover:bg-blue-500/20">✏️ تعديل</button>
                              <button onClick={() => { if(confirm('هل أنت متأكد؟')) setTestimonials(testimonials.filter(x => x.id !== t.id)); }} className="px-3 py-1.5 bg-red-500/10 border border-red-500/30 rounded-lg text-red-500 text-sm hover:bg-red-500/20">🗑 حذف</button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {activeTab === 'messages' && (
                <motion.div key="messages" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <h2 className="text-2xl font-bold mb-6">📩 الرسائل الواردة</h2>
                  <div className="flex flex-col gap-4 max-h-[80vh] overflow-y-auto pr-2">
                    {messages.length === 0 ? <div className="glass-card p-12 text-center text-text-muted">📭 لا توجد رسائل بعد</div> : [...messages].reverse().map((m: any) => (
                      <div key={m.id} className="glass-card p-6 transition-colors hover:border-border-glow">
                        <div className="flex items-center justify-between mb-3 border-b border-border-subtle pb-3">
                          <span className="font-bold flex items-center gap-2">👤 {m.name}</span>
                          <span className="text-text-muted text-sm">{m.date}</span>
                        </div>
                        <div className="inline-block px-3 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-xs text-accent-blue mb-4">
                          {m.service}
                        </div>
                        <div className="text-text-secondary text-base leading-relaxed mb-4">
                          {m.message || 'لا توجد رسالة مرفقة'}
                        </div>
                        <div className="flex gap-4">
                          <a href={`tel:${m.phone}`} className="flex items-center gap-2 text-sm text-accent-blue hover:underline bg-blue-500/5 px-3 py-1.5 rounded-lg border border-border-subtle">📞 {m.phone}</a>
                          <a href={`https://wa.me/${m.phone.replace(/[^0-9+]/g, '')}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm text-[#25d366] hover:underline bg-[#25d366]/10 px-3 py-1.5 rounded-lg border border-[#25d366]/20">💬 واتساب</a>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      )}
    </div>
  );
};
