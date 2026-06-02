import React, { useState } from 'react';
import { wordsMimo } from '../data/wordsMimo'; // <-- Importiamo le parole

export default function Mimo({ onBack }) {
  const [parola, setParola] = useState('');

  const estraiParola = () => {
    const random = wordsMimo[Math.floor(Math.random() * wordsMimo.length)];
    setParola(random);
  };

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>🎨 Mimo</h2>
      <p>Pesca una parola e Mimala senza parlare o scrivere!</p>
      
      <div className="card-display">
        {parola ? <h3>{parola}</h3> : <h3>Clicca per pescare!</h3>}
      </div>
      
      <button className="btn-action" onClick={estraiParola}>Estrai Parola</button>
    </div>
  );
}