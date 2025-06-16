// Custom split text utility for GSAP-like functionality
export class SplitText {
  private element: HTMLElement | null;
  private words: HTMLElement[];
  private chars: HTMLElement[];
  private originalHTML: string;

  constructor(element: HTMLElement | string) {
    if (typeof element === 'string') {
      this.element = document.querySelector(element) as HTMLElement;
    } else {
      this.element = element;
    }
    
    this.originalHTML = this.element?.innerHTML || '';
    this.words = [];
    this.chars = [];
    this.split();
  }

  private split() {
    if (!this.element) return;
    
    // Clear any previous splitting
    this.revert();
    
    // Save original for revert
    this.originalHTML = this.element.innerHTML;
    
    // Split into words
    const text = this.element.textContent || '';
    const words = text.split(' ');
    
    // Clear the element
    this.element.innerHTML = '';
    
    // Create word and character spans
    words.forEach((word, wordIndex) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'split-word';
      wordSpan.style.display = 'inline-block';
      wordSpan.style.position = 'relative';
      
      if (wordIndex > 0) {
        // Add space before all words except the first
        const space = document.createElement('span');
        space.innerHTML = ' ';
        space.className = 'split-space';
        space.style.display = 'inline-block';
        this.element?.appendChild(space);
      }
      
      // Split word into characters
      const chars = word.split('');
      chars.forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.className = 'split-char';
        charSpan.innerHTML = char;
        charSpan.style.display = 'inline-block';
        charSpan.style.position = 'relative';
        
        wordSpan.appendChild(charSpan);
        this.chars.push(charSpan);
      });
      
      this.element?.appendChild(wordSpan);
      this.words.push(wordSpan);
    });
  }

  public revert() {
    if (this.element && this.originalHTML) {
      this.element.innerHTML = this.originalHTML;
      this.words = [];
      this.chars = [];
    }
  }

  public getChars() {
    return this.chars;
  }

  public getWords() {
    return this.words;
  }
}