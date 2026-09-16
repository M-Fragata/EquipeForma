import React, { useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import './WhatsAppCTA.css';

export const WhatsAppCTA: React.FC = () => {
  const asideRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!asideRef.current) return;
    gsap.fromTo(
      asideRef.current,
      { scale: 0, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        delay: 1.8,
        ease: 'back.out(1.8)',
        clearProps: 'transform,opacity',
      }
    );
  }, []);

  return (
    <aside ref={asideRef} className="whatsapp-floating-aside">
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

