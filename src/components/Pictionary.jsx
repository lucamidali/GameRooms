import React, { useState } from 'react';
import { wordsPictionary } from '../data/wordsPictionary'; // <-- Importiamo le parole

export default function Pictionary({ onBack }) {
  const [parola, setParola] = useState('');

  const estraiParola = () => {
    const random = wordsPictionary[Math.floor(Math.random() * wordsPictionary.length)];
    setParola(random);
  };

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>🎨 Pictionary</h2>
      <p>Pesca una parola e disegnala senza parlare o scrivere!</p>
      
      <div className="card-display">
        {parola ? <h3>{parola}</h3> : <h3>Clicca per pescare!</h3>}
      </div>
      
      <button className="btn-action" onClick={estraiParola}>Estrai Parola</button>
    </div>
  );
}