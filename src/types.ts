export interface PersonalInfo {
  name: string;
  role: string;
  bio: string;
  avatar: string;
  resumeVideo: string;
  email: string;
  phone: string;
  workingHours: string;
  availabilityStatus: string;
  stats: {
    projects: string;
    clients: string;
    satisfaction: string;
    experience: string;
  };
}

export interface Project {
  id: number;
  title: string;
  cat: string;
  desc: string;
  problem: string;
  solution: string;
  result: string;
  video: string;
  color: string;
  emoji: string;
}

export interface Service {
  id: number;
  title: string;
  desc: string;
  icon: string;
  features: string[];
}

export interface Testimonial {
  id: number;
  name: string;
  title: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface Message {
  id: number;
  name: string;
  phone: string;
  service: string;
  message: string;
  date: string;
}
