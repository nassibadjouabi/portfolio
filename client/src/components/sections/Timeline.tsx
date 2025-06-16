import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, ArrowRight, Clock, Calendar, Building, Info , club } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Timeline data
const timelineData = [

  {
    id: 1,
    year: '2025 ',
    title: 'intern',
    company: 'Routimize ',
    description: 'Coming Next: SaaS Platform for Employee Transport Management, A platform to help companies manage and optimize employee commutes, improving efficiency and tracking in real time.',
    icon: <Briefcase className="w-5 h-5" />,
    type: 'work',
  },
   {
    id: 2,
    year: '2025',
    title: 'Digital Marketing manager ',
    company: 'Lilix consulting',
    description: 'create and manage visual content, design marketing materials, edit promotional videos, and develop social media strategies to promote services and engage the audience.',
    icon: <Briefcase className="w-5 h-5" />,
    type: 'work',
    skills: ['Adobe After Effect', ' Adobe Premiere Pro', 'Adobe Illustrateur ']
  },
  {
    id: 3,
    year: '2025',
    title: 'Bachelor  in computer science Engineering',
    company: 'USTHB',
    description: 'Graduated with honors. focused on programming, algorithms and software development',
    icon: <GraduationCap className="w-5 h-5" />,
    type: 'education',
    skills: ['Computer Science ', 'Web Development ', 'Design']
  },
 
  {
    id: 4,
    year: '2025',
    title: 'Intern',
    company: 'CERIST & Mustapha Bacha Hospital',
    description: 'Project: <strong>ECG Anomaly Detection Using AI</strong> –  , along with a user interface connected to a database for managing patient information and results.',
    icon: <Briefcase className="w-5 h-5" />,
    type: 'work',
    skills: ['React', 'tailwind Css ', 'JavaScript', 'express',  'REST APIs', 'PostGres SQL', 'Python']
  },
  {
    id: 5,
    year: '2025',
    title: 'registration and printing assistant',
    company: 'Cyber Usthb',
    description: 'Handled graphic design tasks including posters and business cards, managed various types of registrations, performed printing and scanning services, and drafted announcements, topics, and formal letters.',
    icon: <Briefcase className="w-5 h-5" />,
    type: 'work',
    skills: ['Adobe Acrobat', 'Overleaf' ,'Microsoft Excel ', 'Microsoft word ', 'Power point'  ]
  },
  {
    id: 6,
    year: '2024',
    title: 'Designer',
    company: 'ImprimerieBK',
    description: 'creating  graphic design materials.included the design of business cards, flyers, appointment cards, logos, and other printed marketing assets.',
    icon: <Briefcase className="w-5 h-5" />,
    type: 'work',
    skills: ['Adobe Illustrateur ', 'Adobe Photoshop', 'Canva']
  },
  {
    id: 7,
    year: '2023',
    title: 'active member : IT team - B2B',
    company: 'Open Minds Club',
    description: 'Contributed to website development during hackathons /for events , alongside handling external relations for the club ..',
    type: 'extra Activities',
        icon: <Briefcase className="w-5 h-5" />,

    skills: ['Soft skills ', 'Web Development', 'UI UX Design']
  }
];

// Type definitions for filtering
type TimelineFilter = 'all' | 'work' | 'education' | 'Extracurricular Activities';

const Timeline = () => {
  const [activeFilter, setActiveFilter] = useState<TimelineFilter>('all');
  const [filteredItems, setFilteredItems] = useState(timelineData);
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  
  // Filter timeline items
  useEffect(() => {
    if (activeFilter === 'all') {
      setFilteredItems(timelineData);
    } else {
      setFilteredItems(timelineData.filter(item => item.type === activeFilter));
    }
    
    // Reset selected item when changing filters
    setSelectedItem(null);
  }, [activeFilter]);
  
  useEffect(() => {
    // Heading animation
    gsap.fromTo(
      headingRef.current,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Filter buttons animation
    const filterButtons = document.querySelectorAll('.filter-button');
    gsap.fromTo(
      filterButtons,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        delay: 0.3,
        scrollTrigger: {
          trigger: filterButtons[0],
          start: 'top bottom-=80',
          toggleActions: 'play none none none'
        }
      }
    );
    
    // Timeline items animation
    const timelineItems = timelineRef.current?.querySelectorAll('.timeline-item');
    if (timelineItems) {
      gsap.fromTo(
        timelineItems,
        { 
          y: 30, 
          opacity: 0,
          scale: 0.95
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top bottom-=50',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Line drawing animation with glowing effect
    const line = timelineRef.current?.querySelector('.timeline-line');
    if (line) {
      gsap.fromTo(
        line,
        { 
          height: '0%', 
          opacity: 0.5 
        },
        {
          height: '100%',
          opacity: 1,
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top bottom-=100',
            end: 'bottom bottom-=100',
            scrub: 0.5
          }
        }
      );
    }
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [filteredItems]); // Re-run animations when filtered items change
  
  // Helper function for timeline item classes
  const getItemColorClass = (type: string) => {
    switch(type) {
      case 'work':
        return 'from-primary/10 to-primary/5 border-primary/20';
      case 'education':
        return 'from-accent/10 to-accent/5 border-accent/20';
      case 'award':
        return 'from-secondary/10 to-secondary/5 border-secondary/20';
      default:
        return 'from-primary/10 to-primary/5 border-primary/20';
    }
  };
  
  // Helper function for badge colors
  const getBadgeClass = (type: string) => {
    switch(type) {
      case 'work':
        return 'bg-primary text-primary-foreground';
      case 'education':
        return 'bg-accent text-accent-foreground';
      case 'award':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-primary text-primary-foreground';
    }
  };
  
  // Helper function for icon colors
  const getIconClass = (type: string) => {
    switch(type) {
      case 'work':
        return 'text-primary';
      case 'education':
        return 'text-accent';
      case 'extra activities':
        return 'text-secondary';
      default:
        return 'text-primary';
    }
  };
  
  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };
  
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };
  
  const filterVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };
  
  const timelineItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };
  
  // Animation sequence for filter change
  const filterChangeAnimation = {
    opacity: [0, 1],
    y: [20, 0],
    scale: [0.9, 1],
    transition: { 
      duration: 0.5, 
      ease: "easeOut" 
    }
  };

  return (
    <section 
      id="timeline" 
      ref={sectionRef} 
      className="py-20 relative overflow-hidden bg-background"
    >
      {/* Background elements with animation */}
      <motion.div 
        className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full blur-3xl opacity-60"
        animate={{ 
          scale: [1, 1.05, 1], 
          opacity: [0.5, 0.7, 0.5] 
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      />
      
      <motion.div 
        className="absolute bottom-0 left-0 w-72 h-72 bg-accent/5 rounded-full blur-3xl opacity-60"
        animate={{ 
          scale: [1, 1.1, 1], 
          opacity: [0.5, 0.6, 0.5] 
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity,
          repeatType: "reverse",
          delay: 1
        }}
      />
      
      <div className="container-custom">
        {/* Section heading */}
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.h2 
            ref={headingRef}
            className="text-3xl md:text-4xl font-bold mb-3"
            variants={titleVariants}
          >
            My <span className="text-gradient">Journey</span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground max-w-lg mx-auto mb-8"
            variants={titleVariants}
          >
            A timeline of my professional experience, education, and achievements.
          </motion.p>
          
          {/* Filter buttons with improved animation */}
          <motion.div 
            className="flex flex-wrap justify-center gap-3 mb-12"
            variants={filterVariants}
          >
            <motion.button
              className={`filter-button flex items-center px-4 py-2 rounded-full border transition-all ${
                activeFilter === 'all' 
                  ? 'bg-card text-foreground border-primary/20 shadow-sm' 
                  : 'bg-background hover:bg-card/40 text-muted-foreground border-transparent'
              }`}
              onClick={() => setActiveFilter('all')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Clock className="w-4 h-4 mr-2" />
              All
            </motion.button>
            
            <motion.button
              className={`filter-button flex items-center px-4 py-2 rounded-full border transition-all ${
                activeFilter === 'work' 
                  ? 'bg-card text-foreground border-primary/20 shadow-sm' 
                  : 'bg-background hover:bg-card/40 text-muted-foreground border-transparent'
              }`}
              onClick={() => setActiveFilter('work')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Work
            </motion.button>
            
            <motion.button
              className={`filter-button flex items-center px-4 py-2 rounded-full border transition-all ${
                activeFilter === 'education' 
                  ? 'bg-card text-foreground border-primary/20 shadow-sm' 
                  : 'bg-background hover:bg-card/40 text-muted-foreground border-transparent'
              }`}
              onClick={() => setActiveFilter('education')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              Education
            </motion.button>
            
            <motion.button
              className={`filter-button flex items-center px-4 py-2 rounded-full border transition-all ${
                activeFilter === 'extra activities ' 
                  ? 'bg-card text-foreground border-primary/20 shadow-sm' 
                  : 'bg-background hover:bg-card/40 text-muted-foreground border-transparent'
              }`}
              onClick={() => setActiveFilter('extra Activities')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <extra Activities className="w-4 h-4 mr-2" />
              Extracurricular Activities
            </motion.button>
          </motion.div>
        </motion.div>
        
        {/* Modern Timeline with enhanced animations */}
        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          {/* Timeline connector with glow effect */}
          <motion.div 
            className="absolute left-4 sm:left-1/2 sm:-ml-0.5 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-secondary opacity-40 timeline-line"
            initial={{ height: "0%", opacity: 0.2 }}
            whileInView={{ 
              height: "100%", 
              opacity: 0.6,
              transition: { 
                duration: 1.5, 
                ease: "easeOut" 
              }
            }}
            viewport={{ once: true, margin: "-100px" }}
          />
          
          {/* Timeline items */}
          <motion.div 
            className="space-y-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
            key={activeFilter} // Re-render animation when filter changes
          >
            {filteredItems.map((item, index) => (
              <motion.div 
                key={item.id}
                className={`timeline-item relative flex flex-col sm:flex-row ${
                  index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                }`}
                variants={timelineItemVariants}
                whileHover={{ y: -5 }}
                custom={index}
              >
                {/* Animated date bubble */}
                <motion.div 
                  className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-card shadow-sm border-2 border-white/10`}
                  whileHover={{ 
                    scale: 1.2,
                    boxShadow: "0 0 15px rgba(255,255,255,0.2)" 
                  }}
                >
                  <span className="text-xs font-bold">{item.year}</span>
                </motion.div>
                
                {/* Content card with responsive improvements */}
                <div 
                  className={`
                    ml-12 sm:ml-0 w-full sm:w-5/12 
                    ${index % 2 === 0 ? 'sm:mr-auto sm:pr-8' : 'sm:ml-auto sm:pl-8'}
                  `}
                >
                  <motion.div 
                    className={`
                      p-5 rounded-xl bg-gradient-to-br ${getItemColorClass(item.type)}
                      border hover:shadow-md transition-all cursor-pointer
                      ${selectedItem === item.id ? 'shadow-lg border-primary/30' : ''}
                    `}
                    onClick={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
                    whileHover={{ 
                      scale: 1.03,
                      boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                      transition: { type: "spring", stiffness: 400, damping: 10 }
                    }}
                    animate={selectedItem === item.id ? { 
                      scale: 1.05,
                      boxShadow: "0 10px 40px rgba(0,0,0,0.16)"
                    } : {}}
                  >
                    {/* Card header with enhanced layout */}
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center">
                        <motion.span 
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full mr-3 ${getBadgeClass(item.type)}`}
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.7 }}
                        >
                          {item.icon}
                        </motion.span>
                        <div>
                          <h3 className="font-bold text-lg md:text-xl">{item.title}</h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Building className="w-3 h-3 mr-1" />
                            {item.company}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Expandable content with improved animations */}
                    <motion.div 
                      className="overflow-hidden"
                      animate={{ 
                        height: selectedItem === item.id ? "auto" : "4rem",
                        opacity: selectedItem === item.id ? 1 : 0.9
                      }}
                      transition={{ 
                        height: { duration: 0.3, ease: "easeInOut" },
                        opacity: { duration: 0.2 }
                      }}
                    >
                      <p className="text-muted-foreground text-sm mb-3">
                        {item.description}
                      </p>
                      
                      {/* Skills badges with staggered animations */}
                      <motion.div 
                        className="flex flex-wrap gap-2 mt-4"
                        animate={{ 
                          opacity: selectedItem === item.id ? 1 : 0,
                          y: selectedItem === item.id ? 0 : 10,
                          height: selectedItem === item.id ? "auto" : 0
                        }}
                        transition={{ staggerChildren: 0.05, duration: 0.2 }}
                      >
                        {item.skills?.map((skill, i) => (
                          <motion.span 
                            key={i} 
                            className="px-2 py-1 bg-background/40 text-xs rounded-full"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ 
                              opacity: selectedItem === item.id ? 1 : 0,
                              scale: selectedItem === item.id ? 1 : 0.8
                            }}
                            transition={{ delay: i * 0.05 }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {skill}
                          </motion.span>
                        ))}
                      </motion.div>
                      
                      {/* Show more/less indicator with animation */}
                      <motion.div 
                        className="flex items-center justify-end mt-2 text-xs text-muted-foreground"
                        animate={{ opacity: [0, 1] }}
                        transition={{ delay: 0.2 }}
                      >
                        <span>
                          {selectedItem === item.id ? 'Show less' : 'Show more'}
                        </span>
                        <motion.div
                          animate={{ rotate: selectedItem === item.id ? 90 : 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ArrowRight className="ml-1 w-3 h-3" />
                        </motion.div>
                      </motion.div>
                    </motion.div>
                    
                    {/* Type indicator with improved hover effects */}
                    <motion.div 
                      className="absolute top-2 right-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: selectedItem === item.id ? 1 : 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className={`
                        text-xs font-medium px-2 py-1 rounded-full
                        ${getBadgeClass(item.type)}
                      `}>
                        {item.type}
                      </span>
                    </motion.div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
