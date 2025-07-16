import React, { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import { generateMaze, getRandomCyberpunkColor } from '../utils/mazeGenerator';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

interface MazeProps {
  size: number;
}

interface WallData {
  position: [number, number, number];
  args: [number, number, number];
  color: string;
  key: string;
}

export const Maze: React.FC<MazeProps> = ({ size }) => {
  const { isPlaying, updateGameTime } = useGameStore();

  // 生成迷宮和牆壁數據（包含固定顏色）
  const { maze, walls, floors } = useMemo(() => {
    const maze = generateMaze(size, size);
    const walls: WallData[] = [];
    const floors: { position: [number, number, number]; key: string }[] = [];
    const wallHeight = 2;
    const wallThickness = 0.1;

    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        const cell = maze.cells[y][x];
        const cellX = x - size / 2;
        const cellZ = y - size / 2;

        // 北牆
        if (cell.walls.north) {
          walls.push({
            position: [cellX, wallHeight / 2, cellZ - 0.5],
            args: [1, wallHeight, wallThickness],
            color: getRandomCyberpunkColor(),
            key: `north-${x}-${y}`
          });
        }

        // 南牆
        if (cell.walls.south) {
          walls.push({
            position: [cellX, wallHeight / 2, cellZ + 0.5],
            args: [1, wallHeight, wallThickness],
            color: getRandomCyberpunkColor(),
            key: `south-${x}-${y}`
          });
        }

        // 東牆
        if (cell.walls.east) {
          walls.push({
            position: [cellX + 0.5, wallHeight / 2, cellZ],
            args: [wallThickness, wallHeight, 1],
            color: getRandomCyberpunkColor(),
            key: `east-${x}-${y}`
          });
        }

        // 西牆
        if (cell.walls.west) {
          walls.push({
            position: [cellX - 0.5, wallHeight / 2, cellZ],
            args: [wallThickness, wallHeight, 1],
            color: getRandomCyberpunkColor(),
            key: `west-${x}-${y}`
          });
        }

        // 地面
        floors.push({
          position: [cellX, 0, cellZ],
          key: `floor-${x}-${y}`
        });
      }
    }

    return { maze, walls, floors };
  }, [size]);

  // 更新遊戲時間
  useFrame(() => {
    if (isPlaying) {
      updateGameTime();
    }
  });

  // 渲染牆壁
  const renderWalls = () => {
    return walls.map(wall => (
      <Box
        key={wall.key}
        position={wall.position}
        args={wall.args}
      >
        <meshStandardMaterial color={wall.color} />
      </Box>
    ));
  };

  // 渲染地面
  const renderFloor = () => {
    return floors.map(floor => (
      <Box
        key={floor.key}
        position={floor.position}
        args={[1, 0.1, 1]}
      >
        <meshStandardMaterial color="#1a1a1a" />
      </Box>
    ));
  };

  // 渲染終點獎盃
  const renderTrophy = () => {
    const trophyX = size / 2 - 0.5;
    const trophyZ = size / 2 - 0.5;
    
    return (
      <group position={[trophyX, 1, trophyZ]}>
        {/* 獎盃底座 */}
        <Box position={[0, 0, 0]} args={[0.3, 0.1, 0.3]}>
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </Box>
        {/* 獎盃杯身 */}
        <Box position={[0, 0.3, 0]} args={[0.2, 0.4, 0.2]}>
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </Box>
        {/* 獎盃把手 */}
        <Box position={[0, 0.5, 0]} args={[0.1, 0.2, 0.1]}>
          <meshStandardMaterial color="#ffd700" metalness={0.8} roughness={0.2} />
        </Box>
      </group>
    );
  };

  return (
    <group>
      {/* 環境光 */}
      <ambientLight intensity={0.4} />
      {/* 方向光 */}
      <directionalLight position={[10, 10, 5]} intensity={1} />
      
      {/* 渲染迷宮元素 */}
      {renderWalls()}
      {renderFloor()}
      {renderTrophy()}
    </group>
  );
}; 