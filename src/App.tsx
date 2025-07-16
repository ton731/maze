import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Maze } from './components/Maze';
import { Player } from './components/Player';
import { GameUI } from './components/GameUI';
import { useGameStore } from './store/gameStore';
import './App.css';

function App() {
  const { mazeSize } = useGameStore();

  return (
    <div className="App" style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Canvas
        camera={{ 
          position: [-1, 1, -1], 
          fov: 75,
          near: 0.1,
          far: 1000
        }}
        style={{ background: '#000' }}
      >
        <Maze size={mazeSize} />
        <Player />
      </Canvas>
      <GameUI />
    </div>
  );
}

export default App;
