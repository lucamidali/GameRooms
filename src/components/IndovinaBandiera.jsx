import React, { useState } from 'react';
import wordsBandiere from '../data/wordsBandiere';

export default function IndovinaBandiera({ onBack }) {
  const [bandieraAttuale, setBandieraAttuale] = useState(null);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [slotCodice, setSlotCodice] = useState('it'); // Parte con l'Italia di default
  const [mostraSoluzione, setMostraSoluzione] = useState(false);

  // Router intelligente delle immagini con proxy alternativo anti-blocco DNS
  const ottieniUrlBandiera = (codice) => {
    if (!codice) return '';
    
    // Pulisce l'input da spazi e lo rende minuscolo
    const codeLower = String(codice).toLowerCase().trim();

    // Mappa di reindirizzamento sicuro e definitivo per tutti i codici storici ed estesi
    const codiciSpeciali = {
      // --- JUGOSLAVIA (Copre tutte le varianti possibili che potresti aver scritto nel DB) ---
      'yu': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Flag_of_Yugoslavia_%281946-1992%29.svg/240px-Flag_of_Yugoslavia_%281946-1992%29.svg.png',
      'yug': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Flag_of_Yugoslavia_%281946-1992%29.svg/240px-Flag_of_Yugoslavia_%281946-1992%29.svg.png',
      'yugoslavia': 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Flag_of_Yugoslavia_%281946-1992%29.svg/240px-Flag_of_Yugoslavia_%281946-1992%29.svg.png',

      // --- ALTRI ISO A 2 LETTERE OBSOLETI ---
      'su': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_Soviet_Union.svg/240px-Flag_of_the_Soviet_Union.svg.png',
      'zr': 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Zaire_%281971%E2%80%931997%29.svg/240px-Flag_of_Zaire_%281971%E2%80%931997%29.svg.png',
      'an': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Flag_of_the_Netherlands_Antilles_%281986%E2%80%932010%29.svg/240px-Flag_of_the_Netherlands_Antilles_%281986%E2%80%932010%29.svg.png',

      // --- GRANDI IMPERI E BANDIERE STORICHE ESTESE ---
      'cn-qing': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Flag_of_the_Qing_dynasty_%281889%E2%80%931912%29.svg/240px-Flag_of_the_Qing_dynasty_%281889%E2%80%931912%29.svg.png',
      'de-1900': 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Flag_of_the_German_Empire.svg/240px-Flag_of_the_German_Empire.svg.png',
      'ddr': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Flag_of_East_Germany.svg/240px-Flag_of_East_Germany.svg.png',
      'it-regno': 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Flag_of_the_Kingdom_of_Italy_%281861%E2%80%931946%29.svg/240px-Flag_of_the_Kingdom_of_Italy_%281861%E2%80%931946%29.svg.png',
      'fr-vichy': 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Civil_Flag_of_Vichy_France.svg/240px-Civil_Flag_of_Vichy_France.svg.png',
      'ly-1977': 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Flag_of_Libya_%281977%E2%80%932011%29.svg/240px-Flag_of_Libya_%281977%E2%80%932011%29.svg.png',
      'es-franchi': 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Flag_of_Spain_%281945%E2%80%931977%29.svg/240px-Flag_of_Spain_%281945%E2%80%931977%29.svg.png'
    };

    if (codiciSpeciali[codeLower]) {
      const urlSpeciale = codiciSpeciali[codeLower];
      
      // Se l'URL punta a Wikipedia, usiamo il proxy CDN di WordPress che elude i blocchi DNS locali
      if (urlSpeciale.includes('wikimedia.org')) {
        const urlSenzaProtocollo = urlSpeciale.replace('https://', '');
        return `https://i0.wp.com/${urlSenzaProtocollo}`;
      }
      return urlSpeciale;
    }

    return `https://flagcdn.com/w160/${codeLower}.png`;
  };

  const pescaBandiera = () => {
    if (inCaricamento || !wordsBandiere || wordsBandiere.length === 0) return;
    setInCaricamento(true);
    setBandieraAttuale(null);
    setMostraSoluzione(false);

    let intervalloSlot;
    let durata = 0;

    intervalloSlot = setInterval(() => {
      const randomItem = wordsBandiere[Math.floor(Math.random() * wordsBandiere.length)];
      setSlotCodice(randomItem.code); 
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
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '85vh', padding: '15px 20px', boxSizing: 'border-box'
    }}>
      
      {/* INTESTAZIONE CENTRATA */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <button className="btn-back" onClick={onBack} style={{ marginBottom: '5px' }}>
          ← Torna ai Giochi
        </button>
        <h2 style={{ margin: '5px 0' }}>🚩 Indovina la Bandiera</h2>
        {!giocoIniziato && (
          <p style={{ margin: '5px 0', fontSize: '0.95rem', width: '100%', textAlign: 'center' }}>
            Indovina a quale nazione appartiene la bandiera estratta!
          </p>
        )}
      </div>

      {/* CARD DELLA BANDIERA */}
      <div style={{
        background: '#ffffff', borderRadius: '24px', width: '85vw', height: '42vh', maxWidth: '340px', maxHeight: '380px',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center',
        boxShadow: '0 15px 35px rgba(0, 0, 0, 0.3)', border: '2px solid #f1f5f9', padding: '20px', boxSizing: 'border-box', margin: '10px 0'
      }}>
        
        {/* RETTANGOLO IMMAGINE */}
        <div style={{
          width: '240px', height: '140px', display: 'flex', justifyContent: 'center', alignItems: 'center',
          overflow: 'hidden', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          filter: inCaricamento ? 'blur(3px)' : 'none', transition: 'filter 0.1s ease', background: '#f8fafc'    
        }}>
          {/* L'attributo key={slotCodice} forza React a rigenerare l'immagine evitando bug di cache visiva */}
          <img 
            key={slotCodice}
            src={ottieniUrlBandiera(slotCodice)}
            alt="Bandiera"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain'
            }}
          />
        </div>

        {/* RISPOSTA COPERTA */}
        {bandieraAttuale && (
          <div style={{ marginTop: '25px', width: '100%', textAlign: 'center', minHeight: '40px' }}>
            {mostraSoluzione ? (
              <span style={{
                color: '#10b981', fontSize: '1.5rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase'
              }}>
                {bandieraAttuale.nazione}
              </span>
            ) : (
              <button
                onClick={() => setMostraSoluzione(true)}
                style={{
                  background: '#f1f5f9', border: '1px dashed #cbd5e1', color: '#64748b',
                  padding: '8px 16px', borderRadius: '10px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer'
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
            width: '100%', maxWidth: '280px', padding: '14px 0',
            opacity: inCaricamento ? 0.6 : 1, cursor: inCaricamento ? 'not-allowed' : 'pointer'
          }}
        >
          {inCaricamento ? 'Mescolando...' : 'PESCA BANDIERA'}
        </button>
      </div>

    </div>
  );
}