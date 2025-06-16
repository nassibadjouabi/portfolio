import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  User, Code, Layout, Database, Server, GitBranch, 
  Globe, BookOpen, Award, Cpu, UserCheck, Coffee,Palette,
  FileJson, Boxes, Braces, Puzzle, Layers, Workflow
} from 'lucide-react';
import { 
  FaReact, FaJs, FaNodeJs, FaVuejs, FaAngular, FaHtml5, 
  FaPython, FaJava, FaDocker, FaAws, FaBootstrap, FaCss3Alt
} from 'react-icons/fa';
import { 
  SiTypescript, SiExpress, SiGraphql, SiMongodb, 
  SiPostgresql, SiThreedotjs, SiTailwindcss, SiMui, SiNextdotjs
} from 'react-icons/si';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Skills data with icons and proficiency organized in categories
const skillCategories = {
  frontend: [
    { 
      name: 'HTML/CSS',
      icon: <FaHtml5 className="w-8 h-8 text-[#E34F26]" />,
      proficiency: 85,
      color: 'bg-[#E34F26]'
    },
    
    { 
      name: 'JavaScript',
      icon: <FaJs className="w-8 h-8 text-[#F7DF1E]" />,
      proficiency: 80,
      color: 'bg-[#F7DF1E]'
    },
    { 
      name: 'TypeScript',
      icon: <SiTypescript className="w-8 h-8 text-[#3178C6]" />,
      proficiency: 80,
      color: 'bg-[#3178C6]'
    },
    { 
      name: 'React',
      icon: <FaReact className="w-8 h-8 text-[#61DAFB]" />,
      proficiency: 80,
      color: 'bg-[#61DAFB]'
    },
  
    { 
      name: 'Vue',
      icon: <FaVuejs className="w-8 h-8 text-[#4FC08D]" />,
      proficiency: 70,
      color: 'bg-[#4FC08D]'
    },
   
   
    { 
      name: 'Tailwind',
      icon: <SiTailwindcss className="w-8 h-8 text-[#06B6D4]" />,
      proficiency: 92,
      color: 'bg-[#06B6D4]'
    },
   
  ],
  backend: [
    { 
      name: 'Node.js',
      icon: <FaNodeJs className="w-8 h-8 text-[#339933]" />,
      proficiency: 80,
      color: 'bg-[#339933]'
    },
    { 
      name: 'Express',
      icon: <SiExpress className="w-8 h-8 text-[#000000]" />,
      proficiency: 78,
      color: 'bg-[#000000]'
    },
    { 
      name: 'Python',
      icon: <FaPython className="w-8 h-8 text-[#3776AB]" />,
      proficiency: 80,
      color: 'bg-[#3776AB]'
    },
    { 
      name: 'Java',
      icon: <FaJava className="w-8 h-8 text-[#007396]" />,
      proficiency: (60),
      color: 'bg-[#007396]'
    },
   
    { 
      name: 'REST API',
      icon: <FileJson className="w-8 h-8 text-[#4285F4]" />,
      proficiency: 70,
      color: 'bg-[#4285F4]'
    },
  ],
  other: [
   
    { 
      name: 'C language ',
      icon: <SiMongodb className="w-8 h-8 text-[#47A248]" />,
      proficiency: 80,
      color: 'bg-[#47A248]'
    },
    { 
      name: 'MongoDB',
      icon: <SiMongodb className="w-8 h-8 text-[#47A248]" />,
      proficiency: 80,
      color: 'bg-[#47A248]'
    },
    { 
      name: 'PostgreSQL',
      icon: <SiPostgresql className="w-8 h-8 text-[#336791]" />,
      proficiency: 85,
      color: 'bg-[#336791]'
    },

     { 
      name: 'Assembly Language ',
      icon: <SiMongodb className="w-8 h-8 text-[#47A248]" />,
      proficiency: 60,
      color: 'bg-[#47A248]'
    },
    
  ]
};

// Fun facts data
const funFacts = [
  { 
    icon: <Coffee className="w-6 h-6 text-primary" />,
    title: '5,840+',
    description: 'Cups of coffee' 
  },
  { 
    icon: <Palette className="w-6 h-6 text-primary" />,
    title: '80+',
    description: 'Graphic design concepts' 
  },
  { 
    icon: <Cpu className="w-6 h-6 text-primary" />,
    title: '10+',
    description: 'Projects completed' 
  },
  { 
    icon: <UserCheck className="w-6 h-6 text-primary" />,
    title: '100+',
    description: 'Happy clients' 
  },
];

// About tabs
const aboutTabs = [
  {
    id: 'about',
    label: 'About Me',
    icon: <User className="w-4 h-4" />,
    content: (
      <>
        <p className="text-muted-foreground mb-6 leading-relaxed">
          I'm a passionate full-stack developer and designer , crafting 
          digital experiences that combine cutting-edge technology with stunning visuals.
        </p>
        
        <p className="text-muted-foreground mb-8 leading-relaxed">
          My journey began with visual design, working on brand assets and print materials, before transitioning into web development — where I now specialize in building full-stack web applications using the MERN stack and bringing interfaces to life with clean, interactive design.


        </p>
      </>
    ),
  },
  {
    id: 'experience',
    label: 'Experience',
    icon: <BookOpen className="w-4 h-4" />,
    content: (
      
      <div className="space-y-6">




        <div className="space-y-6">
  <div className="relative pl-8 border-l border-primary/30">
    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
    <h4 className="text-lg font-medium">intern </h4>
        <p className="text-muted-foreground">Routimize</p>

    <p className="text-sm text-muted-foreground mb-1">Next Step</p>
    <p className="text-muted-foreground"> SaaS Platform for Employee Transport Management, A platform to help companies manage and optimize employee commutes, improving efficiency and tracking in real time.
 </p> </div>
</div>




        <div className="space-y-6">
  <div className="relative pl-8 border-l border-primary/30">
    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
    <h4 className="text-lg font-medium">Digital Marketing manager </h4>
        <p className="text-muted-foreground">Lilix consulting</p>

    <p className="text-sm text-muted-foreground mb-1">2025</p>
    <p className="text-muted-foreground"> create and manage visual content, design marketing materials, edit promotional videos, and develop social media strategies to promote services and engage the audience.
 </p> </div>
</div>

 <div className="space-y-6">
  <div className="relative pl-8 border-l border-primary/30">
    <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
    <h4 className="text-lg font-medium">Intern</h4>
        <p className="text-muted-foreground">CERIST & Mustapha Bacha Hospital</p>

    <p className="text-sm text-muted-foreground mb-1">2025</p>
    <p className="text-muted-foreground">
      Project: <strong>ECG Anomaly Detection Using AI</strong> –  , along with a user interface connected to a database for managing patient information and results.
 </p> </div>
</div>


        <div className="relative pl-8 border-l border-primary/30">
          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
          <h4 className="text-lg font-medium">registration and printing assistant</h4>
                <p className="text-muted-foreground">Cyber Usthb .</p>
          <p className="text-sm text-muted-foreground mb-1">2025</p>
      <p className="text-sm text-muted-foreground mb-1">Handled graphic design tasks including posters and business cards, managed various types of registrations, performed printing and scanning services, and drafted announcements, topics, and formal letters.
</p>        
        </div>
        
        <div className="relative pl-8 border-l border-primary/30">
          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-accent"></div>
          <h4 className="text-lg font-medium"> Designer</h4>
                    <p className="text-muted-foreground">ImprimerieBK </p>

          <p className="text-sm text-muted-foreground mb-1">2024</p>
                              <p className="text-muted-foreground"> creating  graphic design materials.included the design of business cards, flyers, appointment cards, logos, and other printed marketing assets. </p>


        </div>
        
        <div className="relative pl-8 border-l border-primary/30">
          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-secondary"></div>
          <h4 className="text-lg font-medium"> active member : IT team - B2B
</h4>
<p className="text-sm text-muted-foreground mb-1">Open Minds Club </p>
          <p className="text-sm text-muted-foreground mb-1">2023 - 2025</p>
          <p className="text-muted-foreground">Contributed to website development during hackathons /for events , alongside handling external relations for the club .</p>
        </div>
      </div>
    ),
  },
  {
    id: 'education',
    label: 'Education',
    icon: <Globe className="w-4 h-4" />,
    content: (
      
      <div className="space-y-6">
        <div className="relative pl-8 border-l border-primary/30">
          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-primary"></div>
          <h4 className="text-lg font-medium">Bachelor's in computer science Engineering</h4>
          <p className="text-sm text-muted-foreground mb-1">USTHB, 2021-2025</p>
          <p className="text-muted-foreground">Graduated with honors. focused on programming, algorithms and software development.</p>
        </div>
        
        <div className="relative pl-8 border-l border-primary/30">
          <div className="absolute left-[-8px] top-0 w-4 h-4 rounded-full bg-accent"></div>
          <h4 className="text-lg font-medium">Scientific Baccalaureate</h4>
          <p className="text-sm text-muted-foreground mb-1">Khaidar Ibrahim, 2021</p>
          <p className="text-muted-foreground">Holder of a scientific baccalaureate with honors, awarded with an average of ( 16.36 / 20).</p>
        </div>
      </div>
    ),
  },
];

const About = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [activeSkillTab, setActiveSkillTab] = useState('frontend');
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Safety check for all refs
    if (!headingRef.current || !textRef.current || !skillsRef.current) return;
    
    // Clean up previous animations
    ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Text content animation
    gsap.fromTo(
      textRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        delay: 0.2,
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Image animation (if exists)
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.3,
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Skills animations (staggered)
    const skillItems = skillsRef.current.querySelectorAll('.skill-item');
    if (skillItems && skillItems.length > 0) {
      gsap.fromTo(
        skillItems,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: skillsRef.current,
            start: 'top bottom-=100',
            toggleActions: 'play none none none'
          }
        }
      );
      
      // Animate progress circle strokes
      const progressCircles = skillsRef.current.querySelectorAll('.progress-fill');
      if (progressCircles && progressCircles.length > 0) {
        progressCircles.forEach((circle) => {
          const percentage = circle.getAttribute('data-percentage');
          if (percentage) {
            gsap.fromTo(
              circle,
              { strokeDashoffset: 2 * Math.PI * 40 }, // Start with full circle (no progress)
              {
                strokeDashoffset: 2 * Math.PI * 40 * (1 - parseInt(percentage) / 100),
                duration: 1.5,
                ease: 'power2.out',
                delay: 0.5,
              }
            );
          }
        });
      }
    }
    
    // Fun facts animation
    const funFactItems = document.querySelectorAll('.fun-fact-item');
    if (funFactItems && funFactItems.length > 0) {
      gsap.fromTo(
        funFactItems,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          scrollTrigger: {
            trigger: funFactItems[0],
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [activeTab, activeSkillTab]); // Re-run when tabs change

  return (
    <section id="about" ref={sectionRef} className="section-padding relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 rounded-full bg-primary/5 filter blur-3xl"></div>
      <div className="absolute bottom-20 right-0 w-80 h-80 rounded-full bg-accent/5 filter blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-primary/5 opacity-20"></div>
      
      <div className="container-custom relative z-10">
        {/* Section heading with animated underline */}
        <div className="text-center mb-16">
          <h2 
            ref={headingRef}
            className="text-3xl md:text-5xl font-bold mb-4 inline-block reveal relative group"
          >
            About <span className="text-gradient">Me</span>
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-secondary transform scale-x-0 origin-left transition-transform duration-700 group-hover:scale-x-100"></span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Passionate about creating exceptional digital experiences with modern technologies</p>
        </div>
        
        {/* Profile section with image and tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          {/* Profile picture - left column */}
          <div className="lg:col-span-4 flex justify-center" ref={imageRef}>
            <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] group">
              {/* Main image with animation */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-primary/20 to-secondary/20 shadow-xl">
                <img 
                  src="/images/ChatGPT Image Jun 16, 2025, 02_10_32 AM.png" 
                
                  className="w-full h-full object-contain object-center"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -inset-1 rounded-3xl border border-primary/20 -z-10"></div>
              <div className="absolute -inset-3 rounded-3xl border border-primary/10 -z-20"></div>
              
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-tr from-primary/20 via-transparent to-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
              
           
              {/* Available badge */}
              <div className="absolute -left-5 bottom-10 bg-card shadow-lg py-2 px-4 rounded-full border border-primary/20 font-medium text-accent flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-accent"></span>
                </span>
                <span>Available for hire</span>
              </div>
            </div>
          </div>
          
          {/* Content tabs - right column */}
          <div className="lg:col-span-8" ref={textRef}>
            {/* Tab navigation */}
            <div className="flex flex-wrap border-b border-muted mb-8">
              {aboutTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors relative
                    ${activeTab === tab.id 
                      ? 'text-primary border-b-2 border-primary -mb-px' 
                      : 'text-muted-foreground hover:text-foreground'
                    }`
                  }
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
            
            {/* Tab content */}
            <div className="min-h-[300px]">
              {aboutTabs.map((tab) => (
                <div 
                  key={tab.id} 
                  className={`transition-opacity duration-300 space-y-4 
                    ${activeTab === tab.id ? 'block opacity-100' : 'hidden opacity-0'}`
                  }
                >
                  {tab.content}
                </div>
              ))}
              
              {/* Common elements displayed for all tabs */}
              <div className="mt-10">
                <h4 className="text-xl font-medium mb-4 flex items-center gap-2">
                  <Code className="w-5 h-5 text-primary" />
                  Technologies I work with
                </h4>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">JavaScript</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">TypeScript</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">React</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">Node.js</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">Python</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">MongoDB</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">PostgreSQL</span>
                                    <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">Adobe Photoshop</span>
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors cursor-default">Adobe Illustrateur</span>
                           



                </div>
                
                <a 
                  href="#contact" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-primary/20 group"
                >
                  Let's Work Together
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 transform group-hover:translate-x-1"
                  >
                    <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        
        {/* Skills section with circular progress bars */}
        <div ref={skillsRef} className="mb-16">
          <h3 className="text-2xl md:text-3xl font-bold mb-10 text-center">
            My <span className="text-gradient">Skills</span>
          </h3>
          
          {/* Skills category tabs */}
          <div className="flex justify-center mb-12">
            <div className="inline-flex bg-card/50 backdrop-blur-sm rounded-full p-1 border border-primary/10">
              {['frontend', 'backend', 'other'].map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveSkillTab(category)}
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    activeSkillTab === category 
                      ? 'bg-primary text-primary-foreground shadow-md' 
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {/* Skills circular progress bars */}
          <div className="relative min-h-[500px]">
            {Object.entries(skillCategories).map(([category, skills]) => (
              <div 
                key={category}
                className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-8 gap-y-12 skill-tab-content ${
                  activeSkillTab === category ? 'active' : 'inactive'
                } skill-item`}
                style={{
                  position: 'absolute', 
                  width: '100%',
                  visibility: activeSkillTab === category ? 'visible' : 'hidden'
                }}>
                {skills.map((skill, index) => (
                  <div 
                    key={index}
                    className="flex flex-col items-center group"
                  >
                    {/* Circular progress indicator */}
                    <div className="relative w-24 h-24 mb-4 skill-circle hover:cursor-pointer">
                      {/* Background circle */}
                      <div className="absolute inset-0 rounded-full bg-muted/40 backdrop-blur-sm"></div>
                      
                      {/* Shadow for depth */}
                      <div className="absolute inset-1 rounded-full shadow-inner"></div>
                      
                      {/* Progress circle with color */}
                      <svg className="absolute inset-0 transform -rotate-90" viewBox="0 0 100 100">
                        <circle
                          className="text-muted"
                          strokeWidth="8"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                        />
                        <circle
                          className={`progress-fill ${skill.color}`}
                          strokeWidth="8"
                          strokeLinecap="round"
                          stroke="currentColor"
                          fill="transparent"
                          r="40"
                          cx="50"
                          cy="50"
                          strokeDasharray={`${2 * Math.PI * 40}`}
                          strokeDashoffset={`${2 * Math.PI * 40 * (1 - skill.proficiency / 100)}`}
                          data-percentage={skill.proficiency}
                        />
                      </svg>
                      
                      {/* Overlay glow effect for depth */}
                      <div className={`absolute inset-0 rounded-full opacity-20 ${skill.color} blur-sm transform scale-110`}></div>
                      
                      {/* Percentage in middle (shows by default) */}
                      <div className="absolute inset-0 flex items-center justify-center text-lg font-bold group-hover:opacity-0 transition-all duration-200 ease-in-out z-10">
                        {skill.proficiency}%
                      </div>
                      
                      {/* Icon on hover (replaces percentage) */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 ease-in-out transform scale-75 group-hover:scale-125 z-20 group-hover:bg-black/20 rounded-full">
                        {skill.icon}
                      </div>
                      
                      {/* Pulse animation on hover */}
                      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 bg-white/10 transition-all duration-500 ease-in-out group-hover:scale-110 animate-pulse"></div>
                    </div>
                    
                    {/* Skill name with subtle animation */}
                    <span className="text-sm font-medium group-hover:text-primary transition-colors duration-300">{skill.name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
        
        {/* Fun facts section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {funFacts.map((fact, index) => (
            <div 
              key={index} 
              className="fun-fact-item bg-card/30 backdrop-blur-sm p-6 rounded-xl text-center border border-primary/5 hover:border-primary/20 transition-all duration-300 group"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4 group-hover:bg-primary/20 transition-colors">
                {fact.icon}
              </div>
              <h4 className="text-2xl font-bold mb-1 group-hover:text-primary transition-colors">{fact.title}</h4>
              <p className="text-sm text-muted-foreground">{fact.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;