import React from 'react';
import { useGameStore } from '../store/gameStore';

export const DifficultySelector: React.FC = () => {
  const { 
    difficulty, 
    mazeSize, 
    setDifficulty, 
    startGame 
  } = useGameStore();

  const handleDifficultyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newDifficulty = parseInt(event.target.value);
    setDifficulty(newDifficulty);
  };

  const handleStartGame = () => {
    startGame();
  };

  return (
    <div style={{
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      color: '#00ffff',
      padding: '40px',
      borderRadius: '15px',
      textAlign: 'center',
      fontFamily: 'monospace',
      minWidth: '400px',
      border: '2px solid #00ffff',
      boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)',
    }}>
      <h1 style={{ 
        margin: '0 0 30px 0', 
        color: '#ff00ff',
        fontSize: '28px',
        textShadow: '0 0 10px rgba(255, 0, 255, 0.5)'
      }}>
        Immersive Cyber-Maze
      </h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h3 style={{ 
          margin: '0 0 15px 0', 
          color: '#00ffff',
          fontSize: '18px'
        }}>
          選擇難度
        </h3>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          marginBottom: '10px'
        }}>
          <span style={{ fontSize: '14px' }}>簡單</span>
          <span style={{ 
            fontSize: '20px', 
            fontWeight: 'bold',
            color: '#ffff00',
            minWidth: '60px'
          }}>
            {difficulty}
          </span>
          <span style={{ fontSize: '14px' }}>困難</span>
        </div>
        
        <input
          type="range"
          min="1"
          max="50"
          value={difficulty}
          onChange={handleDifficultyChange}
          style={{
            width: '100%',
            height: '8px',
            borderRadius: '4px',
            background: 'linear-gradient(to right, #00ff00, #ffff00, #ff0000)',
            outline: 'none',
            cursor: 'pointer',
          }}
        />
        
        <div style={{ 
          marginTop: '15px',
          padding: '10px',
          backgroundColor: 'rgba(0, 255, 255, 0.1)',
          borderRadius: '8px',
          border: '1px solid rgba(0, 255, 255, 0.3)'
        }}>
          <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
            迷宮大小: <span style={{ color: '#ffff00' }}>{mazeSize} × {mazeSize}</span>
          </p>
          <p style={{ margin: '0', fontSize: '12px', color: '#888' }}>
            難度 {difficulty} 對應 {mazeSize}×{mazeSize} 迷宮
          </p>
        </div>
      </div>
      
      <button
        onClick={handleStartGame}
        style={{
          backgroundColor: '#00ff00',
          color: '#000',
          border: 'none',
          padding: '15px 30px',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          fontFamily: 'monospace',
          transition: 'all 0.3s ease',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.05)';
          e.currentTarget.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.3)';
        }}
      >
        🚀 開始遊戲
      </button>
      
      <div style={{ 
        marginTop: '20px',
        fontSize: '12px',
        color: '#888',
        lineHeight: '1.4'
      }}>
        <p style={{ margin: '0 0 8px 0' }}>
          💡 操作說明：
        </p>
        <p style={{ margin: '0 0 5px 0' }}>
          • 點擊開始後使用滑鼠控制視角
        </p>
        <p style={{ margin: '0 0 5px 0' }}>
          • WASD 鍵移動角色
        </p>
        <p style={{ margin: '0' }}>
          • 找到金色獎盃完成遊戲
        </p>
      </div>
    </div>
  );
}; 