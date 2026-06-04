import React, { useState } from 'react';

const COLORI_PREDEFINITI = [
  '#ef4444', // Rosso
  '#3b82f6', // Blu
  '#eab308', // Giallo
  '#10b981', // Verde
  '#a855f7', // Viola
  '#f97316', // Arancione
  '#ec4899', // Rosa
  '#06b6d4', // Turchese
  '#84cc16', // Lime
  '#64748b'  // Grigio Ardesia
];

export default function GiraRuota({ onBack }) {
  const [colori, setColori] = useState(COLORI_PREDEFINITI.slice(0, 5));
  const [rotazione, setRotazione] = useState(0);
  const [inGiramento, setInGiramento] = useState(false);
  // Gestiamo la durata dell'animazione nello stato per renderla randomica
  const [durataAnimazione, setDurataAnimazione] = useState(3);

  const giraRuota = () => {
    if (inGiramento) return;
    setInGiramento(true);

    // 1. Durata della frenata del tutto casuale (tra 1.5 e 3.5 secondi)
    const tempoFrenataCasuale = Math.random() * 2 + 1.5; 
    const durataTotaleDellaRullata = 1 + tempoFrenataCasuale; // 1 secondo fisso a palla + frenata
    
    setDurataAnimazione(durataTotaleDellaRullata);

    // 2. Giri di potenza casuali (da 6 a 12 giri completi) + i gradi dello spicchio finale
    const giriCompletiCasuali = Math.floor(Math.random() * 7) + 6; 
    const gradiSpicchioCasuali = Math.floor(Math.random() * 360);
    
    // Calcoliamo la nuova posizione finale assoluta
    const nuovaRotazione = rotazione + (giriCompletiCasuali * 360) + gradiSpicchioCasuali;
    setRotazione(nuovaRotazione);

    // 3. Sblocca il bottone solo quando tutta l'animazione dinamica è terminata
    setTimeout(() => {
      setInGiramento(false);
    }, durataTotaleDellaRullata * 1000);
  };

  const aggiungiColore = () => {
    if (colori.length < 10) {
      setColori(COLORI_PREDEFINITI.slice(0, colori.length + 1));
    }
  };

  const rimuoviColore = () => {
    if (colori.length > 2) {
      setColori(COLORI_PREDEFINITI.slice(0, colori.length - 1));
    }
  };

  const generaGradienteConico = () => {
    const totaleColori = colori.length;
    const gradiPerSpicchio = 360 / totaleColori;
    
    const stringaSpicchi = colori.map((colore, indice) => {
      const inizio = (indice * gradiPerSpicchio).toFixed(1);
      const fine = ((indice + 1) * gradiPerSpicchio).toFixed(1);
      return `${colore} ${inizio}deg ${fine}deg`;
    });

    return `conic-gradient(${stringaSpicchi.join(', ')})`;
  };

  return (
    <div className="game-room">
      <button className="btn-back" onClick={onBack}>← Torna ai Giochi</button>
      <h2>🎡 Gira la Ruota Dinamica</h2>
      <p>Aggiungi o togli gli spicchi prima di girare </p>

      <div className="card-display" style={{ background: '#ffffff', border: '1px solid #f1f5f9', borderRadius: '16px', padding: '25px 20px', margin: '20px auto', maxWidth: '340px', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)', boxSizing: 'border-box' }}>
        
        {/* CONTROLLI IN ALTO */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: '20px' }}>
          <button 
            onClick={rimuoviColore} 
            disabled={colori.length <= 2 || inGiramento}
            style={{ ...btnStileModifica, backgroundColor: colori.length <= 2 ? '#e2e8f0' : '#ef4444', cursor: colori.length <= 2 || inGiramento ? 'not-allowed' : 'pointer' }}
          >
            - Rimuovi
          </button>
          
          <span style={{ color: '#0f172a', fontWeight: '800', fontSize: '1.05rem', textAlign: 'center', flex: '1', whiteSpace: 'nowrap', padding: '0 5px' }}>
            Spicchi: {colori.length}
          </span>

          <button 
            onClick={aggiungiColore} 
            disabled={colori.length >= 10 || inGiramento}
            style={{ ...btnStileModifica, backgroundColor: colori.length >= 10 ? '#e2e8f0' : '#10b981', cursor: colori.length >= 10 || inGiramento ? 'not-allowed' : 'pointer' }}
          >
            + Aggiungi
          </button>
        </div>

        {/* CONTENITORE DELLA RUOTA */}
        <div style={{ position: 'relative', width: '240px', height: '240px', margin: '0 auto' }}>
          
          {/* LA RUOTA CON TRANSIZIONE DINAMICA */}
          <div style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            border: '6px solid #1e293b',
            boxShadow: '0 8px 16px rgba(0,0,0,0.15)',
            transform: `rotate(${rotazione}deg)`,
            // La durata (`durataAnimazione` secondi) e la frenata ora cambiano a ogni click!
            transition: `transform ${durataAnimazione}s cubic-bezier(0.25, 1, 0.5, 1)`,
            background: generaGradienteConico(),
            boxSizing: 'border-box'
          }}>
          </div>

          {/* PERNO FRECCIA-A-GOCCIA (Punta verso l'alto a 0°) */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%) rotate(45deg)',
            width: '38px',
            height: '38px',
            background: '#ffffff',
            border: '4px solid #1e293b',
            borderRadius: '0px 50px 50px 50px', 
            zIndex: 15,
            boxShadow: '0 4px 6px rgba(0,0,0,0.15)',
            boxSizing: 'border-box'
          }}></div>

        </div>

      </div>

      {/* BOTTONE PRINCIPALE */}
      <button 
        className="btn-action" 
        onClick={giraRuota}
        disabled={inGiramento}
        style={{ opacity: inGiramento ? 0.7 : 1, cursor: inGiramento ? 'not-allowed' : 'pointer' }}
      >
        {inGiramento ? 'La ruota gira...' : 'GIRA LA RUOTA'}
      </button>
    </div>
  );
}

const btnStileModifica = {
  border: 'none',
  color: 'white',
  padding: '8px 12px',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '0.85rem',
  transition: 'all 0.2s ease',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  minWidth: '85px'
};