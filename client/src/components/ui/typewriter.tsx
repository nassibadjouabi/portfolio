import { useState, useEffect, useRef } from 'react';

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
  className?: string;
  loop?: boolean;
  cursorClassName?: string;
}

const Typewriter: React.FC<TypewriterProps> = ({
  words,
  typingSpeed = 100,
  deletingSpeed = 70,
  delayBetweenWords = 1500,
  className = '',
  loop = true,
  cursorClassName = ''
}) => {
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTypingPaused, setIsTypingPaused] = useState(false);
  const currentWordRef = useRef<string>('');
  const currentFullWordRef = useRef<string>('');

  useEffect(() => {
    if (!words || words.length === 0) return;
    
    // Get the first word to start with
    currentFullWordRef.current = words[currentWordIndex];
    
    // Calculate typing speed based on action
    let typingInterval = isDeleting ? deletingSpeed : typingSpeed;
    
    // Adjust speed if we're about to pause
    if (!isDeleting && currentText === currentFullWordRef.current) {
      // Pause at full word before deleting
      typingInterval = delayBetweenWords;
    } else if (isDeleting && currentText === '') {
      // Pause after deleting before typing next word
      typingInterval = 500;
    }
    
    const timer = setTimeout(() => {
      // When paused, switch to the next/previous action
      if (isTypingPaused) {
        setIsTypingPaused(false);
        setIsDeleting(!isDeleting);
        
        // If we've deleted a word, move to the next one
        if (isDeleting && currentText === '') {
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
        return;
      }
      
      // Handle typing or deleting
      if (!isDeleting) {
        // Typing the word
        const nextText = currentFullWordRef.current.substring(0, currentText.length + 1);
        setCurrentText(nextText);
        
        // Check if we've completed the word
        if (nextText === currentFullWordRef.current) {
          if (loop || currentWordIndex < words.length - 1) {
            setIsTypingPaused(true);
          }
        }
      } else {
        // Deleting the word
        const nextText = currentFullWordRef.current.substring(0, currentText.length - 1);
        setCurrentText(nextText);
        
        // Check if we've deleted the whole word
        if (nextText === '') {
          setIsTypingPaused(true);
          currentFullWordRef.current = words[(currentWordIndex + 1) % words.length];
        }
      }
    }, typingInterval);
    
    return () => clearTimeout(timer);
  }, [
    currentText, 
    isDeleting, 
    currentWordIndex, 
    words, 
    typingSpeed, 
    deletingSpeed, 
    delayBetweenWords, 
    isTypingPaused,
    loop
  ]);
  
  return (
    <span className={`inline-block ${className}`}>
      {currentText}
      <span className={`animate-pulse ${cursorClassName}`}>|</span>
    </span>
  );
};

export default Typewriter;