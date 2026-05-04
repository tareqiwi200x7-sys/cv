import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Project, Service, Testimonial, Message, PersonalInfo } from './types';
import { initialProjects, initialServices, initialTestimonials, initialMessages, initialPersonalInfo } from './data';
import { db, auth } from './firebase';
import { collection, onSnapshot, doc, getDoc, setDoc, query, orderBy } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface AppContextType {
  personalInfo: PersonalInfo;
  setPersonalInfo: React.Dispatch<React.SetStateAction<PersonalInfo>>;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
  services: Service[];
  setServices: React.Dispatch<React.SetStateAction<Service[]>>;
  testimonials: Testimonial[];
  setTestimonials: React.Dispatch<React.SetStateAction<Testimonial[]>>;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  isAdminOpen: boolean;
  setIsAdminOpen: React.Dispatch<React.SetStateAction<boolean>>;
  visits: number;
  setVisits: React.Dispatch<React.SetStateAction<number>>;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>(initialPersonalInfo);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [services, setServices] = useState<Service[]>(initialServices);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [visits, setVisits] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });

    const currentVisits = parseInt(localStorage.getItem('site_visits') || '0', 10);
    const newVisits = currentVisits + 1;
    localStorage.setItem('site_visits', newVisits.toString());
    setVisits(newVisits);

    // Fetch site config (PersonalInfo)
    const unsubPersonalInfo = onSnapshot(doc(db, 'settings', 'personalInfo'), (docSnap) => {
      if (docSnap.exists()) {
        setPersonalInfo(docSnap.data() as PersonalInfo);
      } else {
        // Bootstrap initial data if document doesn't exist
        setDoc(doc(db, 'settings', 'personalInfo'), initialPersonalInfo).catch(console.error);
      }
    }, (error) => console.error("Error fetching personal info", error));

    const unsubProjects = onSnapshot(collection(db, 'projects'), (snapshot) => {
      if (!snapshot.empty) {
        setProjects(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
      } else if (isAuthenticated) {
        // Initialize if empty and user is admin
        initialProjects.forEach(p => {
          setDoc(doc(db, 'projects', p.id), p).catch(console.error);
        });
      }
    }, (error) => console.error("Error fetching projects", error));

    const unsubServices = onSnapshot(collection(db, 'services'), (snapshot) => {
      if (!snapshot.empty) {
        setServices(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Service)));
      } else if (isAuthenticated) {
        initialServices.forEach(s => {
          setDoc(doc(db, 'services', s.id), s).catch(console.error);
        });
      }
    }, (error) => console.error("Error fetching services", error));

    const unsubTestimonials = onSnapshot(collection(db, 'testimonials'), (snapshot) => {
      if (!snapshot.empty) {
        setTestimonials(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Testimonial)));
      } else if (isAuthenticated) {
        initialTestimonials.forEach(t => {
          setDoc(doc(db, 'testimonials', t.id), t).catch(console.error);
        });
      }
    }, (error) => console.error("Error fetching testimonials", error));
    
    let unsubMessages = () => {};
    if (isAuthenticated) {
      unsubMessages = onSnapshot(collection(db, 'messages'), (snapshot) => {
        setMessages(snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Message)));
      }, (error) => console.error("Error fetching messages", error));
    }

    setIsLoading(false);

    return () => {
      unsubscribeAuth();
      unsubPersonalInfo();
      unsubProjects();
      unsubServices();
      unsubTestimonials();
      unsubMessages();
    };
  }, [isAuthenticated]);

  return (
    <AppContext.Provider value={{
      personalInfo, setPersonalInfo,
      projects, setProjects,
      services, setServices,
      testimonials, setTestimonials,
      messages, setMessages,
      isAdminOpen, setIsAdminOpen,
      visits, setVisits,
      isAuthenticated, isLoading
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
