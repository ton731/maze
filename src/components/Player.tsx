import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import { useGameStore } from '../store/gameStore';
import * as THREE from 'three';

export const Player: React.FC = () => {
  const { isPlaying, endGame } = useGameStore();
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  
  // 移動速度
  const moveSpeed = 0.1;
  
  // 玩家位置（從迷宮左上角開始）
  const playerPosition = useRef(new THREE.Vector3(-1, 1, -1));
  
  // 設置初始位置
  useEffect(() => {
    camera.position.copy(playerPosition.current);
  }, [camera]);

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
    
    // 簡單的邊界檢查（防止走出迷宮）
    const mazeSize = 3;
    const halfSize = mazeSize / 2;
    
    playerPosition.current.x = Math.max(-halfSize, Math.min(halfSize - 0.5, playerPosition.current.x));
    playerPosition.current.z = Math.max(-halfSize, Math.min(halfSize - 0.5, playerPosition.current.z));
    
    // 更新相機位置
    camera.position.copy(playerPosition.current);
    
    // 檢查是否到達終點（獎盃位置）
    const trophyX = halfSize - 0.5;
    const trophyZ = halfSize - 0.5;
    const distanceToTrophy = playerPosition.current.distanceTo(new THREE.Vector3(trophyX, 1, trophyZ));
    
    if (distanceToTrophy < 0.5) {
      endGame();
      alert('恭喜通關！');
    }
  });

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