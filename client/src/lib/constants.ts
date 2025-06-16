// Application constants

// Social media links
export const SOCIAL_LINKS = {
  GITHUB: "https://github.com",
  LINKEDIN: "https://linkedin.com",
  TWITTER: "https://twitter.com",
  INSTAGRAM: "https://instagram.com"
};

// Navigation
export const NAV_LINKS = [
  { title: 'Home', href: '#home', id: 'home' },
  { title: 'About', href: '#about', id: 'about' },
  { title: 'Projects', href: '#projects', id: 'projects' },
  { title: 'Timeline', href: '#timeline', id: 'timeline' },
  { title: 'Contact', href: '#contact', id: 'contact' }
];

// Project categories
export const PROJECT_CATEGORIES = [
  'All', 
  'Web Development', 
  '3D / WebGL', 
  'UI/UX Design', 
  'Mobile Apps'
];

// Skills with proficiency percentages
export const SKILLS = [
  { 
    name: 'Frontend Development',
    proficiency: 95,
    description: 'React, Vue, Angular, JavaScript/TypeScript, HTML/CSS'
  },
  { 
    name: 'Backend Development',
    proficiency: 85,
    description: 'Node.js, Express, Python, Java, GraphQL'
  },
  { 
    name: '3D & Animation',
    proficiency: 90,
    description: 'Three.js, GSAP, WebGL, CSS Animations'
  },
  { 
    name: 'Database Design',
    proficiency: 80,
    description: 'MongoDB, PostgreSQL, MySQL, Firebase'
  },
  { 
    name: 'DevOps & CI/CD',
    proficiency: 75,
    description: 'Docker, Kubernetes, GitHub Actions, AWS'
  }
];

// Contact information
export const CONTACT_INFO = {
  EMAIL: 'alexander@example.com',
  PHONE: '+1 (123) 456-7890',
  LOCATION: 'San Francisco, California'
};

// Three.js configuration
export const THREE_CONFIG = {
  CAMERA: {
    FOV: 50,
    NEAR: 0.1,
    FAR: 2000,
    POSITION: [0, 0, 5]
  },
  LIGHTS: {
    AMBIENT_INTENSITY: 0.4,
    DIRECTIONAL_INTENSITY: 0.8,
    DIRECTIONAL_POSITION: [10, 10, 5]
  },
  PARTICLE_COUNT: 500
};
