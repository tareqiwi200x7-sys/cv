import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Project, Service, Testimonial, Message, PersonalInfo } from './types';
import { initialProjects, initialServices, initialTestimonials, initialMessages, initialPersonalInfo } from './data';

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

  useEffect(() => {
    // Increment specific visit counter on load
    const currentVisits = parseInt(localStorage.getItem('site_visits') || '0', 10);
    const newVisits = currentVisits + 1;
    localStorage.setItem('site_visits', newVisits.toString());
    setVisits(newVisits);
  }, []);

  return (
    <AppContext.Provider value={{
      personalInfo, setPersonalInfo,
      projects, setProjects,
      services, setServices,
      testimonials, setTestimonials,
      messages, setMessages,
      isAdminOpen, setIsAdminOpen,
      visits, setVisits
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
