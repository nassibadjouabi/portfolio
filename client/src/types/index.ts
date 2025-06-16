// Types for the application

// Project type
export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  categories: string[];
  link: string;
  github: string;
  technologies: string[];
}

// Skill type
export interface Skill {
  name: string;
  icon?: React.ReactNode;
  proficiency: number;
  description: string;
}

// Timeline item type
export interface TimelineItem {
  id: number;
  year: string;
  title: string;
  company: string;
  description: string;
  icon?: React.ReactNode;
  type: 'work' | 'education' | 'award';
}

// Form data type
export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// Three.js specific types
export interface ThreeDimensionalObject {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}

// Mouse position type
export interface MousePosition {
  x: number;
  y: number;
}

// Theme types
export type Theme = 'light' | 'dark';

// Navigation link type
export interface NavLink {
  title: string;
  href: string;
  id: string;
  icon?: React.ReactNode;
}
