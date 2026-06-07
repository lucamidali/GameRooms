import React, { useState } from 'react';
import { wordsTaboo } from '../data/wordsTaboo'; // Importiamo il mazzo di carte dal file dei dati

export default function Taboo({ onBack }) {
  // Lo stato iniziale è null perché all'inizio non c'è nessuna carta pescata
  const [cartaAttuale, setCartaAttuale] = useState(null);

  const estraiCarta = () => {
    // Peschiamo un oggetto random dall'array wordsTaboo
    const randomCard = wordsTaboo[Math.floor(Math.random() * wordsTaboo.length)];
    setCartaAttuale(randomCard);
  };

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>🚫 Taboo</h2>
      <p>Fai indovinare la parola verde senza pronunciare le parole vietate!</p>
      
      {cartaAttuale ? (
        /* Se c'è una carta pescata, mostra la struttura completa */
        <div className="taboo-card">
          
          {/* Contenitore per mantenere il balloon verde perfettamente centrato */}
          <div style={{ textAlign: 'center' }}>
            {/* Controlla se la parola contiene spazi per assegnare la classe corretta */}
            <h3 className={`main-word ${cartaAttuale.parola.includes(' ') ? 'multi-word' : 'single-word'}`}>
              {cartaAttuale.parola}
            </h3>
          </div>
          
          <div className="forbidden-container">
            <h4>PAROLE VIETATE</h4>
            <ul className="forbidden-list">
              {cartaAttuale.vietate.map((parolaVietata, index) => (
                <li key={index} className="forbidden-item">
                  {parolaVietata}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        /* Se non è ancora stata pescata nessuna carta */
        <div className="card-display">
          <h3>Pronto per iniziare?</h3>
          <p>Clicca sul bottone qui sotto per pescare la prima carta.</p>
        </div>
      )}
      
      <button className="btn-action" onClick={estraiCarta}>
        {cartaAttuale ? 'Prossima Carta' : 'Estrai Carta'}
      </button>
    </div>
  );
}