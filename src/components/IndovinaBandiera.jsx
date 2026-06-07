import React, { useState } from 'react';
import wordsBandiere from '../data/wordsBandiere';

export default function IndovinaBandiera({ onBack }) {
  const [bandieraAttuale, setBandieraAttuale] = useState(null);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [slotCodice, setSlotCodice] = useState('it'); // Parte con l'Italia di default
  const [mostraSoluzione, setMostraSoluzione] = useState(false);

  const pescaBandiera = () => {
    if (inCaricamento || !wordsBandiere || wordsBandiere.length === 0) return;
    setInCaricamento(true);
    setBandieraAttuale(null);
    setMostraSoluzione(false);

    let intervalloSlot;
    let durata = 0;

    intervalloSlot = setInterval(() => {
      const randomItem = wordsBandiere[Math.floor(Math.random() * wordsBandiere.length)];
      setSlotCodice(randomItem.code); // Usa direttamente il codice dell'oggetto
      durata += 80;

      if (durata >= 1800) {
        clearInterval(intervalloSlot);
        const definitivo = wordsBandiere[Math.floor(Math.random() * wordsBandiere.length)];
        setBandieraAttuale(definitivo);
        setSlotCodice(definitivo.code);
        setInCaricamento(false);
      }
    }, 80);
  };

  const giocoIniziato = bandieraAttuale !== null || inCaricamento;

  return (
    <div className="game-room" style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '85vh',
      padding: '15px 20px',
      boxSizing: 'border-box'
    }}>
      
      {/* INTESTAZIONE CORRETTA E CENTRATA ALLINEANDO GLI ELEMENTI */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <button className="btn-back" onClick={onBack} style={{ marginBottom: '5px' }}>
          ← Torna ai Giochi
        </button>
        <h2 style={{ margin: '5px 0' }}>🚩 Indovina la Bandiera</h2>
        {!giocoIniziato && (
          <p style={{ margin: '5px 0', fontSize: '0.95rem',width: '100%',textAlign: 'center' }}>
            Indovina a quale nazione appartiene la bandiera estratta!
          </p>
        )}
      </div>

      {/* CARD DELLA BANDIERA */}
      <div style={{
        background: '#ffffff',
        borderRadius: '24px',
        width: '85vw',
        height: '42vh',
        maxWidth: '340px',
        maxHeight: '380px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)',
        border: '2px solid #f1f5f9',
        padding: '20px',
        boxSizing: 'border-box',
        margin: '10px 0'
      }}>
        
        {/* RETTANGOLO IMMAGINE */}
        <div style={{
          width: '180px',
          height: '120px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          overflow: 'hidden',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          filter: inCaricamento ? 'blur(3px)' : 'none',
          transition: 'filter 0.1s ease'
        }}>
          <img 
            src={`https://flagcdn.com/w160/${slotCodice}.png`}
            alt="Bandiera"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>

        {/* RISPOSTA COPERTA */}
        {bandieraAttuale && (
          <div style={{ marginTop: '25px', width: '100%', textAlign: 'center', minHeight: '40px' }}>
            {mostraSoluzione ? (
              <span style={{
                color: '#10b981',
                fontSize: '1.6rem',
                fontWeight: '900',
                letterSpacing: '1px',
                textTransform: 'uppercase'
              }}>
                {bandieraAttuale.nazione}
              </span>
            ) : (
              <button
                onClick={() => setMostraSoluzione(true)}
                style={{
                  background: '#f1f5f9',
                  border: '1px dashed #cbd5e1',
                  color: '#64748b',
                  padding: '8px 16px',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  fontWeight: 'bold',
                  cursor: 'pointer'
                }}
              >
                👁️ Mostra Risposta
              </button>
            )}
          </div>
        )}
      </div>

      {/* BOTTONE DI PESCA */}
      <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
        <button
          className="btn-action"
          onClick={pescaBandiera}
          disabled={inCaricamento}
          style={{
            width: '100%',
            maxWidth: '280px',
            padding: '14px 0',
            opacity: inCaricamento ? 0.6 : 1,
            cursor: inCaricamento ? 'not-allowed' : 'pointer'
          }}
        >
          {inCaricamento ? 'Mescolando...' : 'PESCA BANDIERA'}
        </button>
      </div>

    </div>
  );
}