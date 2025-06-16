import { useRef, useState, useEffect, FormEvent } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle } from 'lucide-react';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would actually send the email
    setFormStatus('submitting');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success
      setFormStatus('success');
      setFormState({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Reset form status after some time
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    } catch (error) {
      setFormStatus('error');
      
      // Reset error status after some time
      setTimeout(() => {
        setFormStatus('idle');
      }, 3000);
    }
  };
  
  useEffect(() => {
    // Heading animation with adjusted trigger point
    gsap.fromTo(
      headingRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top bottom-=20', // Changed from bottom-=100 to make it trigger later
          end: 'top center',
          toggleActions: 'play none none reverse',
          once: false // Allow animation to reverse when scrolling back up
        }
      }
    );
    
    // Form animation with adjusted trigger point
    gsap.fromTo(
      formRef.current,
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: formRef.current,
          start: 'top bottom', // Adjusted to appear later
          end: 'top center-=50',
          toggleActions: 'play none none reverse',
          once: false // Allow animation to reverse when scrolling back up
        }
      }
    );
    
    // Info animation with adjusted trigger point
    gsap.fromTo(
      infoRef.current,
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        duration: 1,
        delay: 0.5,
        scrollTrigger: {
          trigger: infoRef.current,
          start: 'top bottom', // Adjusted to appear later
          end: 'top center-=50',
          toggleActions: 'play none none reverse',
          once: false // Allow animation to reverse when scrolling back up
        }
      }
    );
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="contact" ref={sectionRef} className="section-padding bg-background relative">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="container-custom relative">
        <h2 
          ref={headingRef}
          className="text-3xl md:text-4xl font-bold mb-12 text-center reveal"
        >
          Get In <span className="text-gradient">Touch</span>
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <form 
            ref={formRef}
            onSubmit={handleSubmit}
            className="bg-card p-5 md:p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold mb-6">Send Me a Message</h3>
            
            <div className="space-y-5">
              {/* Name field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-muted border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="John Doe"
                />
              </div>
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-muted border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="john@example.com"
                />
              </div>
              
              {/* Subject field */}
              <div>
                <label htmlFor="subject" className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-muted border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Project Inquiry"
                />
              </div>
              
              {/* Message field */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 bg-muted border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                  placeholder="I'd like to discuss a new project..."
                ></textarea>
              </div>
              
              {/* Status message */}
              {formStatus === 'success' && (
                <div className="flex items-center gap-2 text-green-500 bg-green-500/10 p-3 rounded-lg text-sm">
                  <CheckCircle className="w-5 h-5" />
                  <span>Message sent successfully! I'll get back to you soon.</span>
                </div>
              )}
              
              {formStatus === 'error' && (
                <div className="flex items-center gap-2 text-red-500 bg-red-500/10 p-3 rounded-lg text-sm">
                  <AlertCircle className="w-5 h-5" />
                  <span>Failed to send message. Please try again later.</span>
                </div>
              )}
              
              {/* Submit button */}
              <button
                type="submit"
                disabled={formStatus === 'submitting'}
                className="w-full py-3 px-4 bg-primary text-primary-foreground font-medium rounded-lg 
                          transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]
                          disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {formStatus === 'submitting' ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Send Message
                  </span>
                )}
              </button>
            </div>
          </form>
          
          {/* Contact Information */}
          <div ref={infoRef} className="flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
              <p className="text-muted-foreground mb-8">
                Feel free to reach out if you have any questions about my work or 
                if you're interested in collaborating on a project together.
              </p>
              
              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Email</h4>
                    <a href="mailto:alexander@example.com" className="text-muted-foreground hover:text-primary transition-colors">
                      nassibadjouabi2003@gmail.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Phone</h4>
                    <a href="tel:+11234567890" className="text-muted-foreground hover:text-primary transition-colors">
                      +(213)795387943
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-base font-medium">Location</h4>
                    <p className="text-muted-foreground">
                      Algiers, Algeria
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social Media Links */}
            <div className="mt-12">
              <h4 className="text-base font-medium mb-4">Connect with me</h4>
              <div className="flex space-x-4">
                <a 
                  href="https://www.linkedin.com/in/nassiba-djouabi-730348296/" 
                  
                  className="w-10 h-10 rounded-full bg-card hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>



<a 
  href="https://www.behance.net/nassibadjouabi" 
  className="w-10 h-10 rounded-full bg-card hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
  aria-label="Behance"
  target="_blank"
  rel="noopener noreferrer"
>
  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
    <path d="M22 9.5h-7v1.6h6.3c-.2 2.6-2 3.6-3.8 3.6-2.2 0-3.7-1.7-3.7-3.9s1.5-3.9 3.8-3.9c1.7 0 2.9.8 3.4 2.3zm-4.2-4.7h-3.3v1.5h3.3V4.8zM11.2 13.4c0-1.3-.9-2.1-2.3-2.3v-.1c1-.2 1.7-1 1.7-2 0-1.8-1.3-2.6-3.4-2.6H2v9.4h5.4c2.2 0 3.2-.9 3.2-2.4zm-5.4-4.6h1.4c.8 0 1.3.3 1.3 1 0 .7-.5 1.1-1.4 1.1H5.8V8.8zm0 3.5h1.6c1.1 0 1.6.4 1.6 1.2s-.5 1.2-1.6 1.2H5.8v-2.4z"/>
  </svg>
</a>






                <a 
                  href="https://github.com/nassibadjouabi" 
                   
                  className="w-10 h-10 rounded-full bg-card hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="GitHub"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"></path>
                  </svg>
                </a>
         
                <a 
                  href="https://www.instagram.com/_nina_wrld_/" 
                   
                  className="w-10 h-10 rounded-full bg-card hover:bg-primary/20 flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                  aria-label="Instagram"
                >
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
