import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

export const Player: React.FC = () => {
  const { isPlaying, endGame, mazeSize } = useGameStore();
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  
  // 移動速度
  const moveSpeed = 0.1;
  
  // 玩家位置（從迷宮左上角開始）
  const playerPosition = useRef(new THREE.Vector3(-mazeSize / 2 + 0.5, 1, -mazeSize / 2 + 0.5));
  
  // 當迷宮大小改變時重置玩家位置
  useEffect(() => {
    playerPosition.current.set(-mazeSize / 2 + 0.5, 1, -mazeSize / 2 + 0.5);
    camera.position.copy(playerPosition.current);
  }, [mazeSize, camera]);

  // 處理鍵盤輸入
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      setKeys(prev => new Set(prev).add(event.code));
    };
    
    const handleKeyUp = (event: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(event.code);
        return newKeys;
      });
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // 更新移動
  useFrame(() => {
    if (!isPlaying || !controlsRef.current?.isLocked) return;
    
    // 重置方向
    const direction = new THREE.Vector3();
    
    // 根據按鍵更新方向
    if (keys.has('KeyW')) {
      direction.z -= 1;
    }
    if (keys.has('KeyS')) {
      direction.z += 1;
    }
    if (keys.has('KeyA')) {
      direction.x -= 1;
    }
    if (keys.has('KeyD')) {
      direction.x += 1;
    }
    
    // 標準化方向向量
    if (direction.length() > 0) {
      direction.normalize();
    }
    
    // 應用移動
    const moveX = direction.x * moveSpeed;
    const moveZ = direction.z * moveSpeed;
    
    // 更新位置
    playerPosition.current.x += moveX;
    playerPosition.current.z += moveZ;
    
    // 邊界檢查（防止走出迷宮）
    const halfSize = mazeSize / 2;
    
    playerPosition.current.x = Math.max(-halfSize + 0.5, Math.min(halfSize - 0.5, playerPosition.current.x));
    playerPosition.current.z = Math.max(-halfSize + 0.5, Math.min(halfSize - 0.5, playerPosition.current.z));
    
    // 更新相機位置
    camera.position.copy(playerPosition.current);
    
    // 檢查是否到達終點（獎盃位置）
    const trophyX = halfSize - 0.5;
    const trophyZ = halfSize - 0.5;
    const distanceToTrophy = playerPosition.current.distanceTo(new THREE.Vector3(trophyX, 1, trophyZ));
    
    if (distanceToTrophy < 0.5) {
      endGame();
      alert(`恭喜通關！\n完成時間: ${formatTime(useGameStore.getState().gameTime)}\n迷宮大小: ${mazeSize}×${mazeSize}`);
    }
  });

  // 格式化時間顯示
  const formatTime = (milliseconds: number): string => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const ms = Math.floor((milliseconds % 1000) / 10);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
  };

  return (
    <PointerLockControls
      ref={controlsRef}
      onLock={() => {
        // 鎖定指針時開始遊戲
        if (!isPlaying) {
          useGameStore.getState().startGame();
        }
      }}
    />
  );
}; 