import { create } from 'zustand';

interface GameState {
  // 遊戲狀態
  isPlaying: boolean;
  gameTime: number;
  startTime: number | null;
  
  // 迷宮設置
  mazeSize: number;
  
  // UI狀態
  showFootprints: boolean;
  showMinimap: boolean;
  
  // 動作
  startGame: () => void;
  endGame: () => void;
  updateGameTime: () => void;
  toggleFootprints: () => void;
  toggleMinimap: () => void;
  setMazeSize: (size: number) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  // 初始狀態
  isPlaying: false,
  gameTime: 0,
  startTime: null,
  mazeSize: 3,
  showFootprints: false,
  showMinimap: false,
  
  // 動作
  startGame: () => set({ 
    isPlaying: true, 
    startTime: Date.now(),
    gameTime: 0 
  }),
  
  endGame: () => set({ 
    isPlaying: false, 
    startTime: null 
  }),
  
  updateGameTime: () => {
    const { startTime } = get();
    if (startTime) {
      set({ gameTime: Date.now() - startTime });
    }
  },
  
  toggleFootprints: () => set(state => ({ 
    showFootprints: !state.showFootprints 
  })),
  
  toggleMinimap: () => set(state => ({ 
    showMinimap: !state.showMinimap 
  })),
  
  setMazeSize: (size: number) => set({ mazeSize: size }),
})); 