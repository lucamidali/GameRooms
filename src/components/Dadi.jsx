import React, { useState } from 'react';

export default function Dadi({ onBack }) {
  // Lo stato iniziale contiene un solo dado con il valore di partenza a 1
  const [dadi, setDadi] = useState([1]);
  // Stato per gestire la classe dell'animazione
  const [isRolling, setIsRolling] = useState(false);

  // Aumenta il numero di dadi (fino a un massimo di 6)
  const aggiungiDado = () => {
    if (dadi.length < 6) {
      setDadi([...dadi, 1]);
    }
  };

  // Diminuisce il numero di dadi (fino a un minimo di 1)
  const rimuoviDado = () => {
    if (dadi.length > 1) {
      setDadi(dadi.slice(0, -1));
    }
  };

  // Funzione per lanciare i dadi con effetto animazione
  const lanciaDadi = () => {
    if (isRolling) return; // Evita clic ripetuti durante l'animazione

    setIsRolling(true);

    // Facciamo partire l'animazione CSS e cambiamo i numeri dopo 600 millisecondi
    setTimeout(() => {
      const nuoviValori = dadi.map(() => Math.floor(Math.random() * 6) + 1);
      setDadi(nuoviValori);
      setIsRolling(false);
    }, 600);
  };

  // Funzione di supporto per mappare i numeri sui pallini classici del dado
  const renderFacciaDado = (valore) => {
    // Array di posizioni dei pallini per ogni numero (stile griglia 3x3)
    const mappaturaPallini = {
      1: [4],
      2: [0, 8],
      3: [0, 4, 8],
      4: [0, 2, 6, 8],
      5: [0, 2, 4, 6, 8],
      6: [0, 2, 3, 5, 6, 8],
    };

    const palliniAttivi = mappaturaPallini[valore] || [];

    return (
      <div className={`dado-face ${isRolling ? 'shaking' : ''}`}>
        {[...Array(9)].map((_, index) => (
          <div 
            key={index} 
            className={`pallino ${palliniAttivi.includes(index) ? 'attivo' : ''}`} 
          />
        ))}
      </div>
    );
  };

  // Calcola il totale dei dadi a schermo
  const totale = dadi.reduce((acc, curr) => acc + curr, 0);

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>🎲 Lancio dei Dadi</h2>
      <p>Clicca sullo schermo o sul bottone per lanciare i dadi!</p>

      {/* Controlli per aggiungere o rimuovere dadi */}
      <div className="dadi-controls">
        <button onClick={rimuoviDado} disabled={dadi.length <= 1 || isRolling} className="btn-control">-</button>
        <span className="dadi-count">Dadi: {dadi.length}</span>
        <button onClick={aggiungiDado} disabled={dadi.length >= 6 || isRolling} className="btn-control">+</button>
      </div>

      {/* Area dei dadi (cliccabile per lanciare) */}
      <div className="dadi-container" onClick={lanciaDadi}>
        <div className="dadi-grid">
          {dadi.map((valore, index) => (
            <div key={index} className="dado-wrapper">
              {renderFacciaDado(valore)}
            </div>
          ))}
        </div>
      </div>

      {/* Visualizzazione del Totale */}
      {!isRolling && dadi.length > 1 && (
        <div className="dadi-totale">
          <h3>Totale: <span>{totale}</span></h3>
        </div>
      )}

      <button className="btn-action" onClick={lanciaDadi} disabled={isRolling}>
        {isRolling ? 'Sto lanciando...' : 'Lancia i Dadi'}
      </button>
    </div>
  );
}