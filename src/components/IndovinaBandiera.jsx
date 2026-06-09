import React, { useState } from 'react';
import wordsBandiere from '../data/wordsBandiere';

export default function IndovinaBandiera({ onBack }) {
  // Il gioco parte direttamente con il Livello 1 (Facile) attivo di default
  const [difficolta, setDifficolta] = useState(1); 
  const [bandieraAttuale, setBandieraAttuale] = useState(null);
  const [inCaricamento, setInCaricamento] = useState(false);
  const [slotCodice, setSlotCodice] = useState('it'); // Flag iniziale (Italia)
  const [mostraSoluzione, setMostraSoluzione] = useState(false);

  // Filtra la lista dinamicamente in base alla difficoltà selezionata nella stanza
  const ottieniListaFiltrata = (livelloScelto) => {
    if (livelloScelto === 1) return wordsBandiere.filter(b => b.livello === 1);
    if (livelloScelto === 2) return wordsBandiere.filter(b => b.livello === 1 || b.livello === 2);
    return wordsBandiere; // Livello 3 = Tutte le bandiere
  };

  const ottieniUrlBandiera = (codice) => {
    if (!codice) return '';
    const codeLower = String(codice).toLowerCase().trim();
    return `https://flagcdn.com/w160/${codeLower}.png`;
  };

  const pescaBandiera = () => {
    const listaFiltrata = ottieniListaFiltrata(difficolta);
    if (inCaricamento || listaFiltrata.length === 0) return;

    setInCaricamento(true);
    setBandieraAttuale(null);
    setMostraSoluzione(false);

    let intervalloSlot;
    let durata = 0;

    intervalloSlot = setInterval(() => {
      const randomItem = listaFiltrata[Math.floor(Math.random() * listaFiltrata.length)];
      setSlotCodice(randomItem.code); 
      durata += 80;

      if (durata >= 1800) {
        clearInterval(intervalloSlot);
        const definitivo = listaFiltrata[Math.floor(Math.random() * listaFiltrata.length)];
        setBandieraAttuale(definitivo);
        setSlotCodice(definitivo.code);
        setInCaricamento(false);
      }
    }, 80);
  };

  // Quando l'utente cambia difficoltà, resettiamo lo stato della card corrente per evitare incongruenze
  const cambiaDifficolta = (nuovoLivello) => {
    if (inCaricamento) return;
    setDifficolta(nuovoLivello);
    setBandieraAttuale(null);
    setMostraSoluzione(false);
    
    // Imposta una bandiera di placeholder coerente con il livello per non lasciare il box vuoto
    if (nuovoLivello === 1) setSlotCodice('it');
    if (nuovoLivello === 2) setSlotCodice('jm');
    if (nuovoLivello === 3) setSlotCodice('gl');
  };

  const giocoIniziato = bandieraAttuale !== null || inCaricamento;

  return (
    <div className="game-room" style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', minHeight: '85vh', padding: '15px 20px', boxSizing: 'border-box'
    }}>
      
      {/* INTESTAZIONE */}
      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
        <button className="btn-back" onClick={onBack} style={{ marginBottom: '5px' }}>
          ← Torna ai Giochi
        </button>
        <h2 style={{ margin: '5px 0' }}>🚩 Indovina la Bandiera</h2>
      </div>

      {/* CONTROLLO DIFFICOLTÀ INTERNO (SOPRA LA CARD) */}
      <div style={{
        display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '12px',
        width: '100%', maxWidth: '320px', justifyContent: 'space-between', boxSizing: 'border-box', margin: '5px 0'
      }}>
        <button 
          onClick={() => cambiaDifficolta(1)}
          disabled={inCaricamento}
          style={{
            flex: 1, padding: '8px 4px', fontSize: '0.8rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer',
            background: difficolta === 1 ? '#10b981' : 'transparent',
            color: difficolta === 1 ? '#ffffff' : '#64748b',
            transition: 'all 0.2s ease'
          }}
        >
          🟢 Facile
        </button>
        <button 
          onClick={() => cambiaDifficolta(2)}
          disabled={inCaricamento}
          style={{
            flex: 1, padding: '8px 4px', fontSize: '0.8rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer',
            background: difficolta === 2 ? '#f59e0b' : 'transparent',
            color: difficolta === 2 ? '#ffffff' : '#64748b',
            transition: 'all 0.2s ease'
          }}
        >
          🟡 Medio
        </button>
        <button 
          onClick={() => cambiaDifficolta(3)}
          disabled={inCaricamento}
          style={{
            flex: 1, padding: '8px 4px', fontSize: '0.8rem', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer',
            background: difficolta === 3 ? '#ef4444' : 'transparent',
            color: difficolta === 3 ? '#ffffff' : '#64748b',
            transition: 'all 0.2s ease'
          }}
        >
          🔴 Difficile
        </button>
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
                color: '#10b981', fontSize: '1.4rem', fontWeight: '900', letterSpacing: '1px', textTransform: 'uppercase'
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