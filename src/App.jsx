import React, { useState } from 'react';
import Pictionary from './components/Pictionary';
import Mimo from './components/Mimo';
import Taboo from './components/Taboo';
import NomiCoseCitta from './components/NomiCoseCitta';
import Dadi from './components/Dadi';
import './App.css';

function App() {
  // Stato per capire quale gioco è attivo (null = pagina iniziale)
  const [currentGame, setCurrentGame] = useState(null);

  // Funzione per tornare alla home
  const goBackToHome = () => setCurrentGame(null);

  // Rendering condizionale del gioco selezionato
  const renderGame = () => {
    switch (currentGame) {
      case 'pictionary':
        return <Pictionary onBack={goBackToHome} />;
      case 'mimo':
        return <Mimo onBack={goBackToHome} />;
      case 'taboo':
        return <Taboo onBack={goBackToHome} />;
      case 'nomiCoseCitta':
        return <NomiCoseCitta onBack={goBackToHome} />;
      case 'dadi':
        return <Dadi onBack={goBackToHome} />;
      default:
        return (
          <div className="dashboard">
            <h1>🎲 Game Rooms 🎲</h1>
            <p>Seleziona un gioco per iniziare con i ragazzi:</p>
            
            <div className="game-grid">
              <button className="game-card" onClick={() => setCurrentGame('pictionary')}>
                🎨 Pictionary
              </button>
              <button className="game-card" onClick={() => setCurrentGame('mimo')}>
                🎭 Mimo
              </button>
              <button className="game-card" onClick={() => setCurrentGame('taboo')}>
                🚫 Taboo
              </button>
              <button className="game-card" onClick={() => setCurrentGame('nomiCoseCitta')}>
                ✏️ Nomi, Cose, Città
              </button>
              <button className="game-card" onClick={() => setCurrentGame('dadi')}>
                🎲 Lancio dei Dadi
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app-container">
      {renderGame()}
    </div>
  );
}

export default App;