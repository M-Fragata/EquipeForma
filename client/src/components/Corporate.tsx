import React, { useRef, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from './AnimatedText';
import './Corporate.css';

gsap.registerPlugin(ScrollTrigger);

export const Corporate: React.FC = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.to(cardRef.current, {
        scrollTrigger: {
          trigger: cardRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.85,
        ease: 'power3.out',
        onComplete: () => {
          cardRef.current?.classList.remove('opacity-0');
          cardRef.current?.classList.add('opacity-1');
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section className="corporate-section">
      <div className="container">
        <div ref={cardRef} className="corporate-card gsap-card opacity-0">
          <div className="corporate-left">
            <div className="corporate-icon-wrapper">
              <ShieldCheck size={36} className="text-secondary" />
            </div>
            <div>
              <div className="corporate-title-wrapper">
                <AnimatedText
                  as="h3"
                  className="corporate-title"
                  type="words,lines"
                  animation="fade-up"
                >
                  Parceiro Oficial Gympass e TotalPass
                </AnimatedText>
                <span className="corporate-verified-badge">Validado</span>
              </div>
              <AnimatedText
                as="p"
                className="corporate-desc"
                type="words,lines"
                animation="stagger-blur"
              >
                Treine na Equipe Forma utilizando seu benefício corporativo com check-in ultra-rápido via QR Code na recepção. Sem taxas ocultas.
              </AnimatedText>
            </div>
          </div>

          <a
            href="https://wa.me/5521975334017?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20saber%20como%20utilizar%20meu%20Gympass/TotalPass."
            target="_blank"
            rel="noopener noreferrer"
            className="corporate-cta gsap-btn"
          >
            <span>Validar Meu Benefício</span>
          </a>
        </div>
      </div>
    </section>
  );
};
