import { ReactNode } from 'react';
import TextReveal from './text-reveal';
import ScrollReveal from './scroll-reveal';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  description?: string | ReactNode;
  centered?: boolean;
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  descriptionClassName?: string;
  animated?: boolean;
  color?: 'default' | 'primary' | 'gradient';
  decorative?: boolean;
  highlightWords?: string[];
}

const SectionHeader = ({
  title,
  subtitle,
  description,
  centered = false,
  className = '',
  titleClassName = '',
  subtitleClassName = '',
  descriptionClassName = '',
  animated = true,
  color = 'default',
  decorative = true,
  highlightWords = []
}: SectionHeaderProps) => {
  
  // Process title to highlight specific words
  const processedTitle = highlightWords.length > 0 
    ? title.split(' ').map((word, index) => 
        highlightWords.includes(word) 
          ? <span key={index} className="text-primary">{word} </span> 
          : `${word} `
      )
    : title;
  
  // Determine title color class
  const titleColorClass = color === 'primary' 
    ? 'text-primary' 
    : color === 'gradient' 
      ? 'text-gradient' 
      : '';
  
  return (
    <div className={`section-header ${centered ? 'text-center' : ''} mb-8 lg:mb-12 ${className}`}>
      {/* Subtitle */}
      {subtitle && (
        animated ? (
          <TextReveal
            type="chars"
            from="bottom"
            className={`text-sm md:text-base font-medium uppercase tracking-wider text-primary/80 mb-2 ${subtitleClassName}`}
            delay={0.1}
            stagger={0.02}
          >
            {subtitle}
          </TextReveal>
        ) : (
          <div className={`text-sm md:text-base font-medium uppercase tracking-wider text-primary/80 mb-2 ${subtitleClassName}`}>
            {subtitle}
          </div>
        )
      )}
      
      {/* Title */}
      <div className={`relative ${decorative ? 'pl-0 md:pl-4' : ''}`}>
        {/* Decorative line */}
        {decorative && (
          <ScrollReveal delay={0.4} direction="right" duration={0.7}>
            <div className="hidden md:block absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary/80 to-primary/20 rounded-full"></div>
          </ScrollReveal>
        )}
        
        {animated ? (
          <TextReveal
            type="words"
            className={`h2-responsive ${titleColorClass} ${titleClassName}`}
            stagger={0.05}
            from="bottom"
            delay={0.2}
          >
            {processedTitle}
          </TextReveal>
        ) : (
          <h2 className={`h2-responsive ${titleColorClass} ${titleClassName}`}>
            {processedTitle}
          </h2>
        )}
      </div>
      
      {/* Description */}
      {description && (
        animated ? (
          <ScrollReveal 
            delay={0.4} 
            className={`mt-4 text-muted-foreground max-w-prose ${centered ? 'mx-auto' : ''} ${descriptionClassName}`}
          >
            {typeof description === 'string' ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </ScrollReveal>
        ) : (
          <div className={`mt-4 text-muted-foreground max-w-prose ${centered ? 'mx-auto' : ''} ${descriptionClassName}`}>
            {typeof description === 'string' ? (
              <p>{description}</p>
            ) : (
              description
            )}
          </div>
        )
      )}
    </div>
  );
};

export default SectionHeader;