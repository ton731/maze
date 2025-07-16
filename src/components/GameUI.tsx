import React from 'react';
import { useGameStore } from '../store/gameStore';

// 格式化時間顯示
const formatTime = (milliseconds: number): string => {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const ms = Math.floor((milliseconds % 1000) / 10);
  
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${ms.toString().padStart(2, '0')}`;
};

export const GameUI: React.FC = () => {
  const { 
    isPlaying, 
    gameTime, 
    showFootprints, 
    showMinimap,
    toggleFootprints, 
    toggleMinimap 
  } = useGameStore();

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1000,
    }}>
      {/* 計時器 */}
      {isPlaying && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#00ffff',
          padding: '10px 15px',
          borderRadius: '5px',
          fontFamily: 'monospace',
          fontSize: '18px',
          fontWeight: 'bold',
          pointerEvents: 'none',
        }}>
          時間: {formatTime(gameTime)}
        </div>
      )}

      {/* 控制按鈕 */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        pointerEvents: 'auto',
      }}>
        {/* 足跡系統按鈕 */}
        <button
          onClick={toggleFootprints}
          style={{
            backgroundColor: showFootprints ? '#00ff00' : 'rgba(0, 0, 0, 0.7)',
            color: showFootprints ? '#000' : '#fff',
            border: '2px solid #00ffff',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'monospace',
            transition: 'all 0.3s ease',
          }}
          title="切換足跡系統"
        >
          👣 足跡
        </button>

        {/* 小地圖按鈕 */}
        <button
          onClick={toggleMinimap}
          style={{
            backgroundColor: showMinimap ? '#00ff00' : 'rgba(0, 0, 0, 0.7)',
            color: showMinimap ? '#000' : '#fff',
            border: '2px solid #00ffff',
            borderRadius: '5px',
            padding: '10px',
            cursor: 'pointer',
            fontSize: '14px',
            fontFamily: 'monospace',
            transition: 'all 0.3s ease',
          }}
          title="切換小地圖"
        >
          🗺️ 地圖
        </button>
      </div>

      {/* 開始提示 */}
      {!isPlaying && (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          color: '#00ffff',
          padding: '30px',
          borderRadius: '10px',
          textAlign: 'center',
          fontFamily: 'monospace',
          fontSize: '16px',
          pointerEvents: 'none',
        }}>
          <h2 style={{ margin: '0 0 20px 0', color: '#ff00ff' }}>
            Immersive Cyber-Maze
          </h2>
          <p style={{ margin: '0 0 15px 0' }}>
            點擊畫面開始遊戲
          </p>
          <p style={{ margin: '0 0 15px 0', fontSize: '14px' }}>
            使用 WASD 鍵移動，滑鼠控制視角
          </p>
          <p style={{ margin: '0', fontSize: '12px', color: '#888' }}>
            找到金色獎盃即可通關
          </p>
        </div>
      )}

      {/* 小地圖 */}
      {showMinimap && isPlaying && (
        <div style={{
          position: 'absolute',
          top: '100px',
          right: '20px',
          width: '150px',
          height: '150px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          border: '2px solid #00ffff',
          borderRadius: '5px',
          pointerEvents: 'none',
        }}>
          <div style={{
            position: 'absolute',
            top: '5px',
            left: '5px',
            right: '5px',
            bottom: '5px',
            backgroundColor: '#1a1a1a',
            borderRadius: '3px',
          }}>
            {/* 簡化的小地圖顯示 */}
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '10px',
              height: '10px',
              backgroundColor: '#00ffff',
              borderRadius: '50%',
            }} />
          </div>
        </div>
      )}
    </div>
  );
}; 