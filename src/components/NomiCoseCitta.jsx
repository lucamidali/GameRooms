import React, { useState } from 'react';

// Alfabeto personalizzato (ho tolto le lettere straniere più complesse per i ragazzi)
const alfabeto = [
  'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'L', 
  'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'Z'
];

// Categorie classiche da mostrare come promemoria a schermo
const categorie = ['Nome', 'Cosa', 'Città', 'Animale', 'Cibo', 'Mestiere'];

export default function NomiCoseCitta({ onBack }) {
  const [lettera, setLettera] = useState('');

  const estraiLettera = () => {
    const random = alfabeto[Math.floor(Math.random() * alfabeto.length)];
    setLettera(random);
  };

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>✏️ Nomi, Cose, Città</h2>
      <p>Preparate foglio e penna! Estrai una lettera e completate le categorie.</p>
      
      {lettera ? (
        <div className="lettera-card">
          <div className="lettera-display">{lettera}</div>
          
          <div className="categorie-container">
            <h4>CATEGORIE:</h4>
            <div className="categorie-grid">
              {categorie.map((cat, i) => (
                <span key={i} className="categoria-tag">{cat}</span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="card-display">
          <h3>Pronti a scrivere?</h3>
          <p>Clicca sotto per estrarre la lettera della manche.</p>
        </div>
      )}
      
      <button className="btn-action" onClick={estraiLettera}>
        {lettera ? 'Nuova Lettera' : 'Estrai Lettera'}
      </button>
    </div>
  );
}