import React from 'react';
import { MessageCircle } from 'lucide-react';
import './WhatsAppCTA.css';

export const WhatsAppCTA: React.FC = () => {
  return (
    <aside className="whatsapp-floating-aside">
      <a
        href="https://wa.me/5521975334017?text=Olá!%20Estou%20no%20site%20da%20Equipe%20Forma%20e%20gostaria%20de%20falar%20com%20um%20atendente."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-btn"
        aria-label="Fale Conosco pelo WhatsApp"
      >
        <span className="whatsapp-ping"></span>
        <span className="whatsapp-dot"></span>
        <MessageCircle size={26} fill="currentColor" />
        <span className="whatsapp-label">Fale Conosco</span>
      </a>
    </aside>
  );
};
