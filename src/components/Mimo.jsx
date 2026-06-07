import React, { useState } from 'react';
import { wordsMimo } from '../data/wordsMimo';

export default function Mimo({ onBack }) {
  const [parola, setParola] = useState('');

  const estraiParola = () => {
    const random = wordsMimo[Math.floor(Math.random() * wordsMimo.length)];
    setParola(random);
  };

  // Funzione per calcolare dinamicamente il font in base alla lunghezza del testo
  const ottieniDimensioneFont = (testo) => {
    if (!testo) return 'min(2.2rem, 8.5vw)';
    
    // Se contiene spazi (es. frasi o più parole), usiamo il valore predefinito gestito dal CSS
    if (testo.includes(' ')) return '1.8rem';
    
    const lunghezza = testo.length;
    
    // Se la parola è molto lunga (es. METROPOLITANA, 13 lettere), stringiamo il font
    if (lunghezza > 12) return 'min(1.45rem, 6vw)';
    if (lunghezza > 9) return 'min(1.75rem, 7vw)';
    
    // Dimensione standard per parole corte
    return 'min(2.2rem, 8.5vw)';
  };

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>🎭 Mimo</h2>
      <p>Pesca una parola e mimala senza parlare o emettere suoni!</p>
      
      <div className="card-display" style={{ 
        background: '#ffffff', 
        border: '1px solid #f1f5f9', 
        borderRadius: '16px', 
        padding: '25px', 
        margin: '20px auto', 
        maxWidth: '320px', 
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
        boxSizing: 'border-box', // Evita che il padding alteri la larghezza massima
        overflow: 'hidden'       // Mantiene il layout pulito in caso di overflow imprevisti
      }}>
        {parola ? (
          <div style={{ textAlign: 'center' }}>
            <h3 
              className={`main-word ${parola.includes(' ') ? 'multi-word' : 'single-word'}`} 
              style={{ 
                fontSize: ottieniDimensioneFont(parola), // <-- Applica il font dinamico calcolato
                whiteSpace: 'nowrap',                  // Forza la parola singola a non andare a capo
                transition: 'font-size 0.15s ease'     // Rende il cambio dimensione fluido
              }}
            >
              {parola}
            </h3>
          </div>
        ) : (
          <h3 style={{ color: '#4b5563', fontSize: '1.4rem', fontWeight: 'bold', margin: '20px 0', textAlign: 'center' }}>
            Clicca per pescare!
          </h3>
        )}
      </div>
      
      <button className="btn-action" onClick={estraiParola}>Estrai Parola</button>
    </div>
  );
}