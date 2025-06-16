import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

// Helper to detect device performance capabilities
const detectDevicePerformance = (): 'low' | 'medium' | 'high' => {
  if (typeof window === 'undefined') return 'medium';
  
  // Check for mobile devices which typically have lower performance
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  // Check for screen size as another performance indicator
  const hasSmallScreen = window.innerWidth < 768;
  
  if (isMobile && hasSmallScreen) {
    return 'low';
  } else if (isMobile || hasSmallScreen) {
    return 'medium';
  } else {
    return 'high';
  }
};

export type GamePhase = "ready" | "playing" | "ended";
export type PerformanceLevel = "low" | "medium" | "high";

interface GameState {
  phase: GamePhase;
  performanceLevel: PerformanceLevel;
  difficulty: number; // 1 = easy, 2 = medium, 3 = hard
  
  // Actions
  start: () => void;
  restart: () => void;
  end: () => void;
  setDifficulty: (level: number) => void;
}

export const useGame = create<GameState>()(
  subscribeWithSelector((set) => ({
    phase: "ready",
    performanceLevel: detectDevicePerformance(), // Auto-detect device performance
    difficulty: 2, // Default to medium difficulty
    
    start: () => {
      set((state) => {
        // Only transition from ready to playing
        if (state.phase === "ready") {
          return { phase: "playing" };
        }
        return {};
      });
    },
    
    restart: () => {
      set(() => ({ phase: "ready" }));
    },
    
    end: () => {
      set((state) => {
        // Only transition from playing to ended
        if (state.phase === "playing") {
          return { phase: "ended" };
        }
        return {};
      });
    },
    
    setDifficulty: (level) => {
      // Ensure difficulty is between 1-3
      const validLevel = Math.max(1, Math.min(3, level));
      set({ difficulty: validLevel });
    }
  }))
);
