import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { ExternalLink, Github, Code, ArrowRight, ChevronRight, Eye } from 'lucide-react';
import { cn } from '../../lib/utils';
import { SplitText } from '../../lib/splitText';
import AnimatedWrapper, { staggerContainer, fadeIn } from '../ui/animated-wrapper';
import image from '../attached_assets/image.png';
// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Project categories for filtering
const categories = ['All', 'Web Development', 'AI', ' Design'];

// Project data
const projects = [
  {
    id: 1,
    title: "ECG Anomaly Detection Using AI",
    description: "ECG Anomaly Detection Using AI –  , along with a user interface connected to a database for managing patient information and results.",
    image: "/images/image.png",
    categories: ['AI', 'Web Development'],
   
    github: "https://github.com/nassibadjouabi/projet-fin-de-cycle-licence",
    technologies: ['React', 'Tailwind Css', 'FastApi', 'node.JS','express.js',"postgresSql"]
  },
  {
    id: 2,
    title: "rock-paper-scissors Game",
    description: "fun challenge by Open minds Club.",
    image: "/images/pierre-feuille-ciseaux-ruzgar-duyan-5d.png",
    categories: ['Web Development'],
    link: "https://nassibadjouabi.github.io/mini-game/",
    github: "https://github.com/nassibadjouabi/mini-gamee",
    technologies: ['Javascript', 'Html', 'Css']
  },
  {
    id: 3,
    title: "My Portfolio",
    image: "/images/Capture d’écran 2025-06-16 093130.png",
    categories: ['Web Development'],
    link: "#",
    github: "#",
    technologies: ['three.js','react','tailwindcss','typescript']
  },
  {
    id: 4,
    title: "Omc platform ",
    description: "a platform for an event .",
    image: "/images/Capture d’écran 2025-06-16 012427.png",
    categories: [ 'Web Development'],
    link: "https://drive.google.com/drive/u/0/folders/1u7cmG7jSEKiYTiyrVQq4GxQDNKFO9opg",
    
    technologies: ['React', 'tailwindCss', 'JavaScript']
  },
  {
    id: 5,
    title: "Designs  & Marketing materiels",
    description: "Some Designs from my past work.",
    image: "/images/téléchargement.png",
    categories: [' Design'],
      link: "https://drive.google.com/drive/folders/1avbfN1bvheKshEnkXFrSUxrYaTsBq2ul",

    technologies: [' Adobe Illustrateur', 'Adobe Photoshop'  ]
  },
  
];

const Projects = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const filtersRef = useRef<HTMLDivElement>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  
  // Animation variants for Framer Motion
  const cardVariants: Variants = {
    hidden: { 
      y: 50, 
      opacity: 0,
      scale: 0.92,
      rotateX: 10,
      rotateY: 5,
      boxShadow: "0px 0px 0px rgba(0,0,0,0.1)"
    },
    visible: (i: number) => ({ 
      y: 0, 
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0px 10px 25px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        delay: i * 0.1,
        duration: 0.6,
        stiffness: 90,
        damping: 12
      }
    }),
    hover: { 
      y: -12,
      scale: 1.05,
      rotateY: 2,
      boxShadow: "0 20px 30px rgba(0, 0, 0, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: { 
      scale: 0.98,
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 10 
      }
    }
  };

  const categoryVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }),
    hover: { 
      scale: 1.05,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const buttonVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.6,
        type: "spring",
        stiffness: 200
      }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
    },
    tap: { scale: 0.98 }
  };

  const techBadgeVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.3 + i * 0.05,
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }),
    hover: { 
      scale: 1.15, 
      y: -4,
      boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };
  
  // Initialize GSAP animations
  useEffect(() => {
    // Create a timeline for section enter animations
    const projectsTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "top 20%",
        scrub: 1,
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate the background blobs
    projectsTimeline
      .to(".project-blob-1", { 
        scale: 1.2, 
        opacity: 0.7, 
        duration: 2, 
        ease: "power1.inOut" 
      }, 0)
      .to(".project-blob-2", { 
        scale: 1.3, 
        opacity: 0.6, 
        duration: 2.5, 
        ease: "power1.inOut" 
      }, 0.3)
      .to(".project-blob-3", { 
        scale: 1.1, 
        opacity: 0.5, 
        duration: 2, 
        ease: "power1.inOut" 
      }, 0.6);
      
    // Create enhanced staggered card hover effect with GSAP
    if (projectsRef.current) {
      const cards = projectsRef.current.querySelectorAll('.project-card');
      cards.forEach((card) => {
        // Image zoom effect timeline
        const imageElement = card.querySelector('.project-card-image');
        const titleElement = card.querySelector('.project-title-text');
        const descriptionElement = card.querySelector('.project-description');
        const techBadges = card.querySelectorAll('.tech-badge');
        
        const tl = gsap.timeline({ paused: true });
        
        // Card lift and shadow effect
        tl.to(card, { 
          y: -20, 
          scale: 1.03, 
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.18)",
          duration: 0.4, 
          ease: "power2.out" 
        }, 0);
        
        // Image zoom effect
        if (imageElement) {
          tl.to(imageElement, {
            scale: 1.15,
            duration: 0.6,
            ease: "power1.out"
          }, 0);
        }
        
        // Title effect
        if (titleElement) {
          tl.to(titleElement, {
            color: "var(--primary)",
            duration: 0.3,
            ease: "power1.inOut"
          }, 0.1);
        }
        
        // Add subtle animation to description
        if (descriptionElement) {
          tl.to(descriptionElement, {
            opacity: 0.9,
            duration: 0.3
          }, 0.1);
        }
        
        // Tech badges scale up slightly
        if (techBadges.length) {
          tl.to(techBadges, {
            y: -3,
            scale: 1.05,
            stagger: 0.03,
            duration: 0.4,
            ease: "back.out(1.5)"
          }, 0.1);
        }
        
        // Add mouse enter/leave events
        card.addEventListener('mouseenter', () => tl.play());
        card.addEventListener('mouseleave', () => tl.reverse());
      });
    }
    
    // Clean up scroll triggers
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredProjects]);
  
  // Filter projects when category changes
  useEffect(() => {
    if (activeCategory === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(
        projects.filter(project => project.categories.includes(activeCategory))
      );
    }
    
    // Animate category change with GSAP
    gsap.fromTo(
      projectsRef.current,
      { opacity: 0.5, y: 10 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.5, 
        ease: "power2.out" 
      }
    );
  }, [activeCategory]);
  
  return (
    <AnimatedWrapper variant="fadeIn" direction="up" duration={0.5}>
      <section id="projects" ref={sectionRef} className="py-16 bg-background relative">
        {/* Enhanced Animated background decorations with GSAP classes */}
        <motion.div 
          className="project-blob-1 absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.7, 0.3],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ 
            duration: 8,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div 
          className="project-blob-2 absolute bottom-0 left-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"
          animate={{ 
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.5, 0.2],
            x: [0, -20, 0],
            y: [0, 30, 0]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
        />
        
        {/* Additional floating shapes */}
        <motion.div 
          className="project-blob-3 absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-secondary/5 blur-2xl hidden md:block"
          animate={{ 
            scale: [1, 1.3, 1],
            opacity: [0.1, 0.3, 0.1],
            y: [0, -40, 0],
          }}
          transition={{ 
            duration: 12,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 1
          }}
        />
        <motion.div 
          className="absolute bottom-1/3 right-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-primary/5 to-secondary/5 blur-2xl hidden lg:block"
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.4, 0.2],
            x: [0, 30, 0],
          }}
          transition={{ 
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 3
          }}
        />
        
        <div className="container-custom">
          {/* Section heading with animations */}
          <AnimatedWrapper variant="staggerContainer" className="text-center mb-12">
            <motion.h2 
              ref={headingRef}
              className="text-3xl font-bold mb-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ 
                duration: 0.7, 
                type: "spring", 
                stiffness: 100 
              }}
            >
              My <span className="text-gradient">Projects</span>
            </motion.h2>
            
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Here are some of the projects I've worked on. Each project showcases different skills and technologies.
            </motion.p>
          </AnimatedWrapper>
          
          {/* Category Filters with animations */}
          <motion.div 
            ref={filtersRef}
            className="flex flex-wrap justify-center gap-2 mb-8 md:mb-12 px-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {categories.map((category, index) => (
              <motion.button
                key={index}
                className={cn(
                  "px-3 py-2 md:px-4 rounded-md text-xs md:text-sm relative overflow-hidden",
                  activeCategory === category
                    ? 'bg-primary text-white font-medium shadow-md' 
                    : 'bg-card text-foreground hover:bg-card/80'
                )}
                onClick={() => setActiveCategory(category)}
                custom={index}
                variants={categoryVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
              >
                {category}
                {activeCategory === category && (
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-white/80"
                    layoutId="activeFilterIndicator"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
          
          {/* Projects Grid with staggered animations */}
          <motion.div 
            ref={projectsRef} 
            className="grid-responsive-3 relative"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div 
                  key={project.id}
                  layout
                  initial="hidden"
                  whileInView="visible"
                  whileHover="hover"
                  whileTap="tap"
                  viewport={{ once: true, margin: "-50px" }}
                  custom={index}
                  variants={cardVariants}
                  exit={{ 
                    opacity: 0, 
                    y: 50, 
                    transition: { duration: 0.3 } 
                  }}
                  className="bg-card rounded-lg overflow-hidden shadow-md project-card"
                >
                  {/* Project Image with enhanced zoom effect */}
                  <div className="relative h-48 overflow-hidden group perspective-1000">
                    <motion.div 
                      className="w-full h-full transform-gpu transition-transform duration-700 ease-out project-card-image"
                      whileHover={{ scale: 1.2 }}
                    >
                      <img 
                        src={project.image} 
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                    
                    {/* Shine effect on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 pointer-events-none"
                      initial={{ opacity: 0, left: "-100%" }}
                      whileHover={{ 
                        opacity: 1, 
                        left: "100%",
                        transition: { duration: 1.2, ease: "easeOut" }
                      }}
                    />
                    
                    {/* Category indicator with animation */}
                    <motion.div 
                      className="absolute bottom-3 left-3"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <span className="bg-primary/90 text-white text-xs py-1 px-2 rounded shadow-md">
                        {project.categories[0]}
                      </span>
                    </motion.div>
                  </div>
                  
                  {/* Project Info with animated elements */}
                  <div className="p-5 relative">
                    {/* Subtle background gradient animation */}
                    <motion.div 
                      className="absolute inset-0 bg-gradient-to-tr from-primary/5 to-transparent opacity-0 pointer-events-none rounded-b-lg"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.8 }}
                    />
                    
                    <motion.h3 
                      className="text-xl font-bold mb-2 relative project-title"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.3, 
                        type: "spring", 
                        stiffness: 100 
                      }}
                      onViewportEnter={(entry) => {
                        if (entry?.target) {
                          // Add GSAP character animation using our custom SplitText
                          const titleElement = entry.target as HTMLElement;
                          const splitTitle = new SplitText(titleElement);
                          const chars = splitTitle.getChars();
                          
                          if (chars.length) {
                            gsap.from(chars, {
                              opacity: 0,
                              y: 15,
                              rotationX: -90,
                              stagger: 0.03,
                              duration: 0.8,
                              ease: "back.out",
                              onComplete: () => {
                                // Clean up split text after animation completes
                                splitTitle.revert();
                              }
                            });
                          }
                        }
                      }}
                    >
                      <motion.span 
                        className="inline-block project-title-text"
                        whileHover={{ 
                          x: 5, 
                          color: "var(--primary)",
                          transition: { type: "spring", stiffness: 300 }
                        }}
                      >
                        {project.title}
                      </motion.span>
                    </motion.h3>
                    
                    <motion.p 
                      className="text-muted-foreground text-sm mb-4 project-description"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.4, 
                        type: "spring", 
                        stiffness: 100 
                      }}
                      onViewportEnter={(entry) => {
                        if (entry?.target) {
                          // Add GSAP reveal animation with a masked slide effect
                          const descElement = entry.target as HTMLElement;
                          
                          // Create mask reveal effect
                          gsap.set(descElement, { 
                            autoAlpha: 1,
                            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)" 
                          });
                          
                          gsap.to(descElement, {
                            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                            duration: 0.9,
                            ease: "power3.inOut"
                          });
                          
                          // Text color flicker effect
                          gsap.fromTo(
                            descElement, 
                            { color: "rgba(var(--primary-rgb), 0.9)" },
                            { 
                              color: "currentColor", 
                              duration: 1.2,
                              delay: 0.2,
                              ease: "power2.out" 
                            }
                          );
                        }
                      }}
                    >
                      {project.description}
                    </motion.p>
                    
                    {/* Tech stack with badge animations */}
                    <motion.div 
                      className="flex flex-wrap gap-2 mb-4"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: 0.5,
                        type: "spring", 
                        stiffness: 100 
                      }}
                    >
                      {project.technologies.map((tech, i) => (
                        <motion.span 
                          key={i}
                          className="bg-primary/10 text-primary text-xs font-medium px-2.5 py-1 rounded-full relative overflow-hidden group shadow-sm border border-primary/5 tech-badge"
                          custom={i}
                          variants={techBadgeVariants}
                          initial="hidden"
                          animate="visible"
                          whileHover={{
                            scale: 1.1, 
                            y: -2,
                            backgroundColor: "rgba(var(--primary-rgb), 0.2)",
                            transition: { duration: 0.2, type: "spring" }
                          }}
                        >
                          {/* Background flash animation on hover */}
                          <motion.span 
                            className="absolute inset-0 bg-primary/10 opacity-0 pointer-events-none" 
                            initial={{ opacity: 0, x: "-100%" }}
                            whileHover={{ opacity: 1, x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                          
                          <span className="relative z-10">{tech}</span>
                        </motion.span>
                      ))}
                    </motion.div>
                    
                    {/* Enhanced Action buttons with hover animations */}
                    <motion.div 
                      className="flex gap-3 items-center justify-between mt-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 100 }}
                    >
                      <motion.a 
                        href={project.link}
                        className="flex items-center gap-2 bg-primary/10 hover:bg-primary/20 text-primary font-medium rounded-full px-4 py-2 transition-colors duration-300 overflow-hidden group relative flex-1"
                        whileHover={{ 
                          scale: 1.03, 
                          boxShadow: "0 5px 15px rgba(var(--primary-rgb), 0.2)"
                        }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {/* Animated background gradient */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/15 to-primary/5 opacity-0"
                          initial={{ x: "-100%" }}
                          whileHover={{ 
                            opacity: 1, 
                            x: "100%",
                            transition: { duration: 1, ease: "easeInOut" }
                          }}
                        />
                        
                        <Eye className="w-4 h-4" />
                        <span className="text-sm relative z-10">View Project</span>
                        
                        <motion.div
                          className="ml-auto relative z-10"
                          animate={{ x: [0, 3, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            duration: 1.5,
                            repeatDelay: 1 
                          }}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </motion.a>
                      
                      <motion.a 
                        href={project.github}
                        className="flex items-center justify-center gap-2 bg-card hover:bg-card/80 text-foreground rounded-full px-4 py-2 transition-colors duration-300 overflow-hidden relative"
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)"
                        }}
                        whileTap={{ scale: 0.97 }}
                        aria-label="View code on GitHub"
                      >
                        {/* Rotating glow effect on hover */}
                        <motion.div 
                          className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-transparent to-primary/10 opacity-0"
                          initial={{ opacity: 0, rotate: 0 }}
                          whileHover={{ opacity: 1, rotate: 180 }}
                          transition={{ duration: 0.8 }}
                        />
                        
                        <motion.div
                          className="relative z-10"
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                        >
                          <Github className="w-4 h-4" />
                        </motion.div>
                        
                        <span className="text-sm relative z-10 hidden sm:inline-block">Code</span>
                      </motion.a>
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          
          {/* Enhanced "More Projects" button with modern animations */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: 0.2
            }}
          >
            <motion.a 
              href="https://github.com/nassibadjouabi"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 rounded-full text-foreground border border-primary/20 shadow-md relative overflow-hidden group"
              whileHover={{ 
                scale: 1.03, 
                boxShadow: "0 10px 25px -5px rgba(var(--primary-rgb), 0.3)"
              }}
              whileTap={{ scale: 0.98 }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 15 
              }}
            >
              {/* Moving gradient overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0"
                initial={{ x: "-100%" }}
                whileHover={{ 
                  opacity: 1, 
                  x: "100%",
                  transition: { duration: 1.5, ease: "easeInOut", repeat: Infinity }
                }}
              />
              
              {/* Particle effects on hover */}
              <motion.div className="absolute inset-0 overflow-hidden pointer-events-none">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-primary/30"
                    initial={{ 
                      opacity: 0,
                      x: "50%", 
                      y: "50%",
                      scale: 0 
                    }}
                    whileHover={{ 
                      opacity: [0, 1, 0],
                      x: `${50 + (Math.random() * 50 - 25)}%`,
                      y: `${50 + (Math.random() * 50 - 25)}%`,
                      scale: [0, 1.5, 0],
                      transition: { 
                        duration: 1.5 + Math.random(),
                        ease: "easeOut",
                        repeat: Infinity,
                        repeatType: "loop",
                        delay: i * 0.2
                      }
                    }}
                  />
                ))}
              </motion.div>
              
              {/* Animated icon */}
              <motion.div
                className="relative z-10 flex items-center justify-center bg-primary/10 w-9 h-9 rounded-full"
                animate={{ rotate: [0, 45, 0] }}
                transition={{ 
                  repeat: Infinity, 
                  repeatType: "loop", 
                  duration: 8, 
                  repeatDelay: 1 
                }}
                whileHover={{
                  backgroundColor: "rgba(var(--primary-rgb), 0.2)",
                  scale: 1.1,
                  transition: { duration: 0.3 }
                }}
              >
                <Code className="w-5 h-5 text-primary" />
              </motion.div>
              
              {/* Text with hover effect */}
              <motion.span 
                className="font-medium relative z-10"
                whileHover={{ 
                  x: 2,
                  transition: { duration: 0.2 }
                }}
              >
                View All Projects on GitHub
              </motion.span>
              
              {/* Right arrow with animation */}
              <motion.div
                className="relative z-10 opacity-0 -ml-2 group-hover:opacity-100 group-hover:ml-0"
                initial={{ x: -5 }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-5 h-5 text-primary" />
              </motion.div>
            </motion.a>
          </motion.div>
        </div>
      </section>
    </AnimatedWrapper>
  );
};

export default Projects;