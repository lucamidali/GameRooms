import React, { useState } from 'react';
import { wordsMimo } from '../data/wordsMimo';

export default function Mimo({ onBack }) {
  const [parola, setParola] = useState('');

  const estraiParola = () => {
    const random = wordsMimo[Math.floor(Math.random() * wordsMimo.length)];
    setParola(random);
  };

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>🎭 Mimo</h2>
      <p>Pesca una parola nel balloon verde e mimala senza parlare o emettere suoni!</p>
      
      <div className="card-display" style={{ background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '25px', margin: '20px auto', maxWidth: '320px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        {parola ? (
          <div style={{ textAlign: 'center' }}>
            {/* Stesso controllo: se ci sono spazi usa multi-word e riduce leggermente il font per stare comodo su due righe */}
            <h3 className={`main-word ${parola.includes(' ') ? 'multi-word' : 'single-word'}`} style={{ fontSize: parola.includes(' ') ? '1.8rem' : 'min(2.2rem, 8.5vw)' }}>
              {parola}
            </h3>
          </div>
        ) : (
          <h3 style={{ color: '#4b5563', fontSize: '1.4rem', fontWeight: 'bold', margin: '20px 0' }}>
            Clicca per pescare!
          </h3>
        )}
      </div>
      
      <button className="btn-action" onClick={estraiParola}>Estrai Parola</button>
    </div>
  );
}