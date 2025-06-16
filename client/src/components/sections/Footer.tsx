import { Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-card/50 py-10 border-t border-border">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gradient mb-2">Nassiba.Djoaubi-dev</h2>
            <p className="text-sm text-muted-foreground">
              Web Developper - Designer 
            </p>
          </div>
          
          <div className="mt-6 md:mt-0">
            <nav className="flex flex-wrap justify-center gap-6 mb-4">
              <a href="#home" className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a>
              <a href="#about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About</a>
              <a href="#projects" className="text-sm text-muted-foreground hover:text-primary transition-colors">Projects</a>
              <a href="#timeline" className="text-sm text-muted-foreground hover:text-primary transition-colors">Timeline</a>
              <a href="#contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</a>
            </nav>
            
            <p className="text-center text-sm text-muted-foreground">
              &copy; {currentYear} Nassiba Djouabi . All rights reserved.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex items-center">
            <span className="text-sm text-muted-foreground inline-flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
