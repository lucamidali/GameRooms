import React, { useState } from 'react';
import Pictionary from './components/Pictionary';
import Mimo from './components/Mimo';
import Taboo from './components/Taboo';
import NomiCoseCitta from './components/NomiCoseCitta';
import ChiSono from './components/ChiSono';
import Dadi from './components/Dadi';
import GiraRuota from './components/GiraRuota';
import IndovinaBandiera from './components/IndovinaBandiera';
import './App.css';

const APP_VERSION = "V. 1.3.1";

export default function App() {
  const [currentGame, setCurrentGame] = useState(null);
  const [showShareModal, setShowShareModal] = useState(false); // Stato per il popup del QR

  const goBackToHome = () => setCurrentGame(null);

  // Prende l'URL corrente dell'applicazione (funziona sia in locale che una volta pubblicata)
  const currentUrl = window.location.href;
  // URL dell'API che genera l'immagine del QR Code
  const qrImageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}`;

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
      case 'chiSono':
        return <ChiSono onBack={goBackToHome} />;
      case 'dadi':
        return <Dadi onBack={goBackToHome} />;
      case 'giraRuota':
        return <GiraRuota onBack={goBackToHome} />;
      case 'indovinaBandiera':
        return <IndovinaBandiera onBack={goBackToHome} />;
      default:
        return (
          <div className="dashboard-wrapper" style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            minHeight: '85vh', 
            width: '100%',
            position: 'relative' // Serve per posizionare il bottone in alto assoluto
          }}>
            
            {/* BOTTONE CONDIVIDI IN ALTO A SINISTRA */}
            <button 
              onClick={() => setShowShareModal(true)}
              style={{
                position: 'absolute',
                top: '0px',
                left: '5px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                color: '#ffffff',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.1rem',
                cursor: 'pointer',
                zIndex: 10,
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                transition: 'background 0.2s'
              }}
              title="Condividi Gioco"
             animate-click="true">
              🔗
            </button>

            <div className="dashboard" style={{ flex: 1, paddingTop: '20px' }}>
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
                <button className="game-card" onClick={() => setCurrentGame('chiSono')}>
                  👑 Chi Sono?
                </button>
                <button className="game-card" onClick={() => setCurrentGame('dadi')}>
                  🎲 Lancio dei Dadi
                </button>
                <button className="game-card" onClick={() => setCurrentGame('giraRuota')}>
                  🎡 Gira la Ruota
                </button>
                <button className="game-card" onClick={() => setCurrentGame('indovinaBandiera')} >
                  🚩 Indovina la Bandiera
                </button>
              </div>
            </div>

            {/* CREDITS IN BASSO */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: '15px',
              paddingBottom: '5px',
              opacity: 0.4, 
              fontSize: '0.75rem',
              letterSpacing: '0.5px',
              color: '#94a3b8',
              width: '100%',
              lineHeight: '1.2'
            }}>
              <span style={{ fontWeight: '500' }}>Created by Mida</span>
              <span style={{ margin: '0', fontSize: '0.7rem' }}>{APP_VERSION}</span>
            </div>

            {/* MODALE POPUP PER IL QR CODE */}
            {showShareModal && (
              <div style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                backgroundColor: 'rgba(15, 23, 42, 0.85)', // Sfondo scuro semitrasparente coordinato
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 999,
                backdropFilter: 'blur(4px)' // Effetto sfocatura di sfondo moderno
              }}
              onClick={() => setShowShareModal(false)} // Chiude il popup cliccando fuori
              >
                <div style={{
                  background: '#ffffff',
                  borderRadius: '24px',
                  padding: '30px 20px',
                  width: '80%',
                  maxWidth: '300px',
                  textAlign: 'center',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative'
                }}
                onClick={(e) => e.stopPropagation()} // Impedisce la chiusura cliccando sulla card stessa
                >
                  <h3 style={{ color: '#0f172a', margin: '0 0 10px 0', fontSize: '1.2rem', fontWeight: 'bold' }}>
                    📱 Inquadra e Gioca!
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.85rem', margin: '0 0 20px 0' }}>
                    Fai scansionare questo QR per connettere altri telefoni alla stanza.
                  </p>
                  
                  {/* BOX CONTENITORE DEL QR */}
                  <div style={{
                    background: '#f8fafc',
                    padding: '15px',
                    borderRadius: '16px',
                    border: '1px solid #e2e8f0',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '200px',
                    height: '200px'
                  }}>
                    <img 
                      src={qrImageUrl} 
                      alt="QR Code per la condivisione" 
                      style={{ width: '100%', height: '100%' }}
                    />
                  </div>

                  {/* BOTTONE CHIUDI */}
                  <button 
                    onClick={() => setShowShareModal(false)}
                    style={{
                      marginTop: '20px',
                      background: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '12px',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      width: '100%',
                      boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)'
                    }}
                  >
                    Chiudi
                  </button>
                </div>
              </div>
            )}

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