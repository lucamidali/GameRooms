import React, { useState } from 'react';
import wordsChiSono from '../data/wordsChiSono'; 

export default function ChiSono({ onBack }) {
  const [personaggio, setPersonaggio] = useState('');
  const [inCaricamento, setInCaricamento] = useState(false);
  const [slotText, setSlotText] = useState('PRONTO?');

  const estraiPersonaggio = () => {
    if (inCaricamento || !wordsChiSono || wordsChiSono.length === 0) return;
    setInCaricamento(true);
    setPersonaggio('');

    let intervalloSlot;
    let durata = 0;

    intervalloSlot = setInterval(() => {
      const randomNome = wordsChiSono[Math.floor(Math.random() * wordsChiSono.length)];
      setSlotText(randomNome);
      durata += 80;

      if (durata >= 2000) {
        clearInterval(intervalloSlot);
        const definitivo = wordsChiSono[Math.floor(Math.random() * wordsChiSono.length)];
        setPersonaggio(definitivo);
        setSlotText(definitivo);
        setInCaricamento(false);
      }
    }, 80);
  };

  // Funzione ricalibrata: abbassiamo i tetti massimi (rem e vh) per non toccare mai i bordi
  const ottieniDimensioneFont = (testo) => {
    if (inCaricamento) return 'min(5vw, 1.5rem)';
    
    const lunghezza = testo.length;
    if (lunghezza > 16) return 'min(4.2vh, 1.3rem)';   // Per stringhe lunghissime con spazi
    if (lunghezza > 12) return 'min(4.8vh, 1.6rem)';   // Per "MANUEL NEUER", "BRUNO FERNANDES"
    if (lunghezza > 8) return 'min(6vh, 2.1rem)';      // Per nomi medi
    return 'min(8vh, 2.8rem)';                         // Per nomi corti (es. GOKU, SHREK)
  };

  return (
    <div className="game-room" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '82vh',
      padding: '20px',
      boxSizing: 'border-box'
    }}>
      
      {/* INTESTAZIONE */}
      <div style={{ width: '100%', textAlign: 'center' }}>
        <button className="btn-back" onClick={onBack} style={{ marginBottom: '10px' }}>
          ← Torna ai Giochi
        </button>
        <h2>👑 Chi Sono?</h2>
        <p>Pesca e metti il telefono in verticale sulla fronte!</p>
      </div>
      
      {/* AREA CARD BIANCA */}
      <div style={{
        background: '#ffffff',
        borderRadius: '20px',
        width: '240px', 
        height: '360px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.25)',
        border: '2px solid #f1f5f9',
        padding: '25px 15px', // Aumentato il padding verticale interno di sicurezza
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        margin: '15px 0'
      }}>
        
        {/* IL TESTO DEL NOME */}
        <span style={{
          color: inCaricamento ? '#64748b' : '#0f172a',
          fontSize: ottieniDimensioneFont(slotText),
          fontWeight: '900',
          textAlign: 'center',
          textTransform: 'uppercase',
          letterSpacing: '1px',
          whiteSpace: 'nowrap',
          filter: inCaricamento ? 'blur(1px)' : 'none',
          
          transform: 'rotate(90deg)',
          // Ridotta la larghezza utile massima per forzarlo a stare dentro i margini bianchi
          maxWidth: '300px', 
          display: 'block',
          lineHeight: '1', // Evita che lo spazio sopra/sotto il font crei offset invisibili
          
          transition: 'font-size 0.12s ease, filter 0.1s ease'
        }}>
          {slotText}
        </span>

      </div>

      {/* BOTTONE DI LANCIO */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '5px' }}>
        <button 
          className="btn-action" 
          onClick={estraiPersonaggio}
          disabled={inCaricamento}
          style={{ 
            width: '100%',
            maxWidth: '300px',
            opacity: inCaricamento ? 0.6 : 1,
            cursor: inCaricamento ? 'not-allowed' : 'pointer'
          }}
        >
          {inCaricamento ? 'Estrazione...' : 'PESCA PERSONAGGIO'}
        </button>
      </div>

    </div>
  );
}