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

  // Funzione ricalibrata per font giganti adattati alla nuova card responsiva
  const ottieniDimensioneFont = (testo) => {
    if (inCaricamento) return 'min(7vw, 2.2rem)';
    
    const lunghezza = testo.length;
    if (lunghezza > 16) return 'min(6.5vh, 2.2rem)'; // Nomi lunghissimi
    if (lunghezza > 12) return 'min(7.5vh, 2.7rem)'; // Nomi medio-lunghi
    if (lunghezza > 8) return 'min(9vh, 3.5rem)';    // Nomi medi
    return 'min(11vh, 4.5rem)';                      // Nomi corti
  };

  // Controlliamo se il gioco è effettivamente iniziato (se è stato pescato qualcosa)
  const giocoIniziato = slotText !== 'PRONTO?';

  return (
    <div className="game-room" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '88vh', // Sfrutta meglio l'altezza verticale dello schermo
      padding: '15px 20px',
      boxSizing: 'border-box'
    }}>
      
      {/* INTESTAZIONE */}
    <div style={{ width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <button className="btn-back" onClick={onBack} style={{ marginBottom: '5px' }}>
        ← Torna ai Giochi
    </button>
    <h2 style={{ margin: '5px 0' }}>👑 Chi Sono?</h2>
    
    {/* CONTENITORE CENTRATO PER LE SCRITTE INIZIALI */}
    {!giocoIniziato && (
        <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center',
        width: '100%',
        textAlign: 'center' 
        }}>
        <p style={{ margin: '4px 0', width: '100%' }}>
            Pesca e metti il telefono in verticale sulla fronte!
        </p>
        <p style={{ margin: '4px 0', fontSize: '0.85rem', opacity: 0.8, width: '100%' }}>
            Blocca la rotazione del telefono per vedere il personaggio!
        </p>
        </div>
    )}
    </div>
      
      {/* AREA CARD BIANCA ENORME */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        // Prende l'80% della larghezza e il 58% dell'altezza dello schermo del dispositivo
        width: '80vw', 
        height: '58vh', 
        maxWidth: '340px',  // Limiti massimi di sicurezza per schermi enormi
        maxHeight: '520px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
        border: '2px solid #f1f5f9',
        padding: '20px',
        boxSizing: 'border-box',
        overflow: 'hidden',
        position: 'relative',
        margin: '10px 0'
      }}>
        
        {/* IL TESTO DEL NOME RUOTATO */}
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
          // Adatta la larghezza virtuale del testo all'altezza reale interna della card
          maxWidth: '52vh', 
          display: 'block',
          lineHeight: '1',
          
          transition: 'font-size 0.12s ease, filter 0.1s ease'
        }}>
          {slotText}
        </span>

      </div>

      {/* BOTTONE DI LANCIO */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
        <button 
          className="btn-action" 
          onClick={estraiPersonaggio}
          disabled={inCaricamento}
          style={{ 
            width: '100%',
            maxWidth: '280px',
            padding: '14px 0', // Pulsante leggermente più compatto per lasciare spazio alla card
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