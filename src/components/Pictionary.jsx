import React, { useState } from 'react';
import { wordsPictionary } from '../data/wordsPictionary';

export default function Pictionary({ onBack }) {
  const [parola, setParola] = useState('');

  const estraiParola = () => {
    const random = wordsPictionary[Math.floor(Math.random() * wordsPictionary.length)];
    setParola(random);
  };

  // Determina la classe corretta in base agli spazi e alla lunghezza della parola
  const getWordClass = () => {
    if (!parola) return '';
    if (parola.includes(' ')) return 'multi-word';
    // Se è una parola singola ma ha più di 9 lettere (come FRECCIAROSSA), aggiunge anche "long-word"
    return parola.length > 9 ? 'single-word long-word' : 'single-word';
  };

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>🎨 Pictionary</h2>
      <p>Pesca una parola nel balloon verde e disegnala senza parlare o scrivere!</p>
      
      <div className="card-display" style={{ background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '25px', margin: '20px auto', maxWidth: '320px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}>
        {parola ? (
          <div style={{ textAlign: 'center' }}>
            {/* La classe ora viene generata dinamicamente dalla funzione getWordClass */}
            <h3 className={`main-word ${getWordClass()}`}>
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