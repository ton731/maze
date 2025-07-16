import { create } from 'zustand';

interface GameState {
  // 遊戲狀態
  isPlaying: boolean;
  gameTime: number;
  startTime: number | null;
  
  // 迷宮設置
  difficulty: number; // 1-50的連續值
  mazeSize: number; // 根據難度計算的迷宮大小
  
  // UI狀態
  showFootprints: boolean;
  showMinimap: boolean;
  showDifficultySelector: boolean; // 是否顯示難度選擇器
  
  // 動作
  startGame: () => void;
  endGame: () => void;
  updateGameTime: () => void;
  toggleFootprints: () => void;
  toggleMinimap: () => void;
  setDifficulty: (difficulty: number) => void;
  openDifficultySelector: () => void;
  closeDifficultySelector: () => void;
  
  // 計算迷宮大小
  getMazeSize: () => number;
}

// 根據難度計算迷宮大小
const calculateMazeSize = (difficulty: number): number => {
  // 難度1-50對應迷宮大小5-51
  // 使用線性映射：difficulty 1 -> size 5, difficulty 50 -> size 51
  const minSize = 5;
  const maxSize = 51;
  const minDifficulty = 1;
  const maxDifficulty = 50;
  
  const size = Math.round(
    minSize + (difficulty - minDifficulty) * (maxSize - minSize) / (maxDifficulty - minDifficulty)
  );
  
  // 確保大小是奇數（迷宮生成算法需要）
  return size % 2 === 0 ? size + 1 : size;
};

export const useGameStore = create<GameState>((set, get) => ({
  // 初始狀態
  isPlaying: false,
  gameTime: 0,
  startTime: null,
  difficulty: 10, // 預設難度10
  mazeSize: calculateMazeSize(10),
  showFootprints: false,
  showMinimap: false,
  showDifficultySelector: true, // 預設顯示難度選擇器
  
  // 動作
  startGame: () => set({ 
    isPlaying: true, 
    startTime: Date.now(),
    gameTime: 0,
    showDifficultySelector: false
  }),
  
  endGame: () => set({ 
    isPlaying: false, 
    startTime: null,
    showDifficultySelector: true
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
  
  setDifficulty: (difficulty: number) => {
    const clampedDifficulty = Math.max(1, Math.min(50, difficulty));
    const mazeSize = calculateMazeSize(clampedDifficulty);
    set({ 
      difficulty: clampedDifficulty,
      mazeSize: mazeSize
    });
  },
  
  openDifficultySelector: () => set({ showDifficultySelector: true }),
  closeDifficultySelector: () => set({ showDifficultySelector: false }),
  
  getMazeSize: () => {
    const { difficulty } = get();
    return calculateMazeSize(difficulty);
  },
})); 