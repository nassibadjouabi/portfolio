import { create } from "zustand";

// Helper function to check if device is likely mobile based on user agent
// This is needed since useDeviceDetect hook can't be used outside React components
const isMobileDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

// Helper for device-adapted volume levels
const getDeviceAdjustedVolume = (baseVolume: number): number => {
  // Lower volume on mobile devices to avoid distortion on small speakers
  return isMobileDevice() ? Math.min(baseVolume * 0.7, 1.0) : baseVolume;
};

interface AudioState {
  backgroundMusic: HTMLAudioElement | null;
  hitSound: HTMLAudioElement | null;
  successSound: HTMLAudioElement | null;
  isMuted: boolean;
  isBackgroundMusicPlaying: boolean;
  
  // Setter functions
  setBackgroundMusic: (music: HTMLAudioElement) => void;
  setHitSound: (sound: HTMLAudioElement) => void;
  setSuccessSound: (sound: HTMLAudioElement) => void;
  
  // Control functions
  toggleMute: () => void;
  playBackgroundMusic: () => void;
  stopBackgroundMusic: () => void;
  playHit: () => void;
  playSuccess: () => void;
}

export const useAudio = create<AudioState>((set, get) => ({
  backgroundMusic: null,
  hitSound: null,
  successSound: null,
  isMuted: true, // Start muted by default
  isBackgroundMusicPlaying: false,
  
  setBackgroundMusic: (music) => {
    // Configure background music with device-specific settings
    if (music) {
      music.loop = true;
      music.volume = getDeviceAdjustedVolume(0.2); // Background music quieter than effects
      music.preload = 'auto';
      
      // Lower quality on mobile for better performance
      if (isMobileDevice()) {
        try {
          // Use low quality audio if possible
          if ('mozAudioContext' in window || 'webkitAudioContext' in window) {
            music.preservesPitch = false;
          }
        } catch (e) {
          // Ignore if not supported
        }
      }
    }
    set({ backgroundMusic: music });
  },
  setHitSound: (sound) => set({ hitSound: sound }),
  setSuccessSound: (sound) => set({ successSound: sound }),
  
  playBackgroundMusic: () => {
    const { backgroundMusic, isMuted, isBackgroundMusicPlaying } = get();
    
    // Only play if we have music, aren't muted, and aren't already playing
    if (backgroundMusic && !isMuted && !isBackgroundMusicPlaying) {
      backgroundMusic.currentTime = 0;
      backgroundMusic.volume = getDeviceAdjustedVolume(0.2);
      
      // Play the audio
      backgroundMusic.play()
        .then(() => {
          set({ isBackgroundMusicPlaying: true });
          console.log("Background music started");
        })
        .catch(error => {
          console.log("Background music play prevented:", error);
          set({ isBackgroundMusicPlaying: false });
        });
    }
  },
  
  stopBackgroundMusic: () => {
    const { backgroundMusic, isBackgroundMusicPlaying } = get();
    
    if (backgroundMusic && isBackgroundMusicPlaying) {
      // Fade out nicely
      const fadeOutInterval = setInterval(() => {
        if (backgroundMusic.volume > 0.05) {
          backgroundMusic.volume -= 0.05;
        } else {
          clearInterval(fadeOutInterval);
          backgroundMusic.pause();
          backgroundMusic.currentTime = 0;
          set({ isBackgroundMusicPlaying: false });
          console.log("Background music stopped");
        }
      }, 100);
    }
  },
  
  toggleMute: () => {
    const { isMuted } = get();
    const newMutedState = !isMuted;
    
    // Just update the muted state
    set({ isMuted: newMutedState });
    
    // Log the change
    console.log(`Sound ${newMutedState ? 'muted' : 'unmuted'}`);
  },
  
  playHit: () => {
    const { hitSound, isMuted } = get();
    if (hitSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Hit sound skipped (muted)");
        return;
      }
      
      // Performance optimization: limit number of simultaneous sounds on mobile
      if (isMobileDevice() && document.querySelectorAll('audio[data-type="hit-sound"]').length > 3) {
        console.log("Too many hit sounds playing, skipping to avoid performance issues");
        return;
      }
      
      // Clone the sound to allow overlapping playback
      const soundClone = hitSound.cloneNode() as HTMLAudioElement;
      soundClone.volume = getDeviceAdjustedVolume(0.3); // Use our device-aware volume
      soundClone.setAttribute('data-type', 'hit-sound'); // Mark for tracking
      
      // Auto-cleanup for performance
      soundClone.addEventListener('ended', () => {
        soundClone.remove(); // Remove from DOM when done playing
      }, { once: true });
      
      soundClone.play().catch(error => {
        console.log("Hit sound play prevented:", error);
      });
    }
  },
  
  playSuccess: () => {
    const { successSound, isMuted } = get();
    if (successSound) {
      // If sound is muted, don't play anything
      if (isMuted) {
        console.log("Success sound skipped (muted)");
        return;
      }
      
      // Reset and play with device-specific volume adjustments
      successSound.currentTime = 0;
      successSound.volume = getDeviceAdjustedVolume(0.5); // Higher volume for success sound
      
      // Use a lower quality playback mode on mobile to improve performance
      if (isMobileDevice()) {
        try {
          // Try to use lower quality audio context settings if available
          if ('mozAudioContext' in window || 'webkitAudioContext' in window) {
            successSound.preservesPitch = false;
          }
        } catch (e) {
          // Ignore if not supported
        }
      }
      
      successSound.play().catch(error => {
        console.log("Success sound play prevented:", error);
      });
    }
  }
}));
