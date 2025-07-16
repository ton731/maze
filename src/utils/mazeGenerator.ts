export interface Cell {
  x: number;
  y: number;
  walls: {
    north: boolean;
    south: boolean;
    east: boolean;
    west: boolean;
  };
  visited: boolean;
}

type WallDirection = 'north' | 'south' | 'east' | 'west';

interface Direction {
  dx: number;
  dy: number;
  wall: WallDirection;
  opposite: WallDirection;
}

export interface Maze {
  cells: Cell[][];
  width: number;
  height: number;
}

// 遞迴回溯法生成迷宮
export function generateMaze(width: number, height: number): Maze {
  // 初始化迷宮
  const cells: Cell[][] = [];
  for (let y = 0; y < height; y++) {
    cells[y] = [];
    for (let x = 0; x < width; x++) {
      cells[y][x] = {
        x,
        y,
        walls: {
          north: true,
          south: true,
          east: true,
          west: true,
        },
        visited: false,
      };
    }
  }

  // 遞迴回溯法
  function carvePath(x: number, y: number) {
    cells[y][x].visited = true;

    // 定義四個方向：北、南、東、西
    const directions: Direction[] = [
      { dx: 0, dy: -1, wall: 'north', opposite: 'south' },
      { dx: 0, dy: 1, wall: 'south', opposite: 'north' },
      { dx: 1, dy: 0, wall: 'east', opposite: 'west' },
      { dx: -1, dy: 0, wall: 'west', opposite: 'east' },
    ];

    // 隨機打亂方向
    const shuffledDirections = directions.sort(() => Math.random() - 0.5);

    for (const dir of shuffledDirections) {
      const newX = x + dir.dx;
      const newY = y + dir.dy;

      // 檢查邊界和是否已訪問
      if (
        newX >= 0 && newX < width &&
        newY >= 0 && newY < height &&
        !cells[newY][newX].visited
      ) {
        // 移除當前格子和相鄰格子之間的牆
        cells[y][x].walls[dir.wall] = false;
        cells[newY][newX].walls[dir.opposite] = false;

        // 繼續遞迴
        carvePath(newX, newY);
      }
    }
  }

  // 從左上角開始生成
  carvePath(0, 0);

  return {
    cells,
    width,
    height,
  };
}

// 賽博龐克調色盤
export const cyberpunkColors = [
  '#ff00ff', // 亮洋紅
  '#00ffff', // 霓虹藍
  '#00ff00', // 電光綠
  '#ff00aa', // 亮紫色
  '#ffff00', // 亮黃色
  '#ff8800', // 橙色
  '#8800ff', // 紫色
  '#00ff88', // 青綠色
];

// 獲取隨機賽博龐克顏色
export function getRandomCyberpunkColor(): string {
  return cyberpunkColors[Math.floor(Math.random() * cyberpunkColors.length)];
} 