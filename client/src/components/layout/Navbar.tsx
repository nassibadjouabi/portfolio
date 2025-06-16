import { useState, useEffect } from 'react';
import { useScrollProgress } from '../../hooks/useScrollProgress';
import { cn } from '../../lib/utils';
import { Menu, X, Home, User, Briefcase, Clock, Mail, Lightbulb } from 'lucide-react';

const navLinks = [
  { title: 'Home', href: '#home', icon: <Home className="w-4 h-4 mr-2" /> },
  { title: 'About', href: '#about', icon: <User className="w-4 h-4 mr-2" /> },
  { title: 'Skills', href: '#skills', icon: <Lightbulb className="w-4 h-4 mr-2" /> },
  { title: 'Projects', href: '#projects', icon: <Briefcase className="w-4 h-4 mr-2" /> },
  { title: 'Timeline', href: '#timeline', icon: <Clock className="w-4 h-4 mr-2" /> },
  { title: 'Contact', href: '#contact', icon: <Mail className="w-4 h-4 mr-2" /> },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const progress = useScrollProgress();
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Determine active section based on scroll position
      const sections = navLinks.map(link => link.href.substring(1));
      const currentPos = window.scrollY + 100;
      
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (currentPos >= offsetTop && currentPos < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300", 
      isScrolled ? "bg-background/90 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
    )}>
      <div className="container-custom">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            className="flex items-center hover:scale-105 transition-transform duration-300"
          >
            <span className="text-xl font-bold text-gradient">Nassiba.Djouabi-dev</span>
          </a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className={cn(
                  "relative px-3 py-2 rounded-md text-sm font-medium transition-colors", 
                  activeSection === link.href.substring(1) 
                    ? "text-primary"
                    : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.title}
                {activeSection === link.href.substring(1) && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />
                )}
              </a>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="flex items-center">
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-muted/50 hover:bg-muted transition-colors hover:scale-110 active:scale-95 transition-transform"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
        
        {/* Progress bar */}
        <div 
          className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300"
          style={{ 
            width: `${progress}%`,
            boxShadow: isScrolled ? "0 0 8px rgba(79, 70, 229, 0.6)" : "none"
          }}
        />
      </div>
      
      {/* Mobile menu */}
      <div className={cn(
        "fixed inset-0 bg-background/95 backdrop-blur-md transition-transform duration-300 z-40 md:hidden",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
          {navLinks.map((link, index) => (
            <a
              key={link.title}
              href={link.href}
              className={cn(
                "flex items-center text-xl font-medium px-5 py-3 transition-all hover:scale-105 active:scale-95",
                activeSection === link.href.substring(1) 
                  ? "text-primary" 
                  : "hover:text-primary"
              )}
              onClick={() => setMobileMenuOpen(false)}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)"
              }}
            >
              {link.icon}
              {link.title}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;