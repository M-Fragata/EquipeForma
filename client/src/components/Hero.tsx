import React, { useRef, useEffect } from 'react';
import { Dumbbell, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { AnimatedText } from './AnimatedText';
import './Hero.css';

export const Hero: React.FC = () => {
  const badgeRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (badgeRef.current) {
        gsap.to(badgeRef.current, {
          scale: 1,
          opacity: 1,
          duration: 0.55,
          delay: 0.05,
          ease: 'back.out(1.6)',
          onComplete: () => {
            badgeRef.current?.classList.remove('opacity-0');
            badgeRef.current?.classList.add('opacity-1');
          },
        });
      }
      if (ctaRef.current) {
        gsap.to(ctaRef.current, {
          y: 0,
          opacity: 1,
          duration: 0.55,
          delay: 0.75,
          ease: 'power2.out',
          onComplete: () => {
            ctaRef.current?.classList.remove('opacity-0');
            ctaRef.current?.classList.add('opacity-1');
            // Signal that Hero principal content animation is finished
            window.dispatchEvent(new CustomEvent('hero-animation-complete'));
          },
        });
      }
    });

    // Safety fallback dispatch in case of any animation interruption
    const fallbackTimer = setTimeout(() => {
      window.dispatchEvent(new CustomEvent('hero-animation-complete'));
    }, 1350);

    return () => {
      clearTimeout(fallbackTimer);
      ctx.revert();
    };
  }, []);

  return (
    <section id="inicio" className="hero-section">
      <div className="hero-bg-overlay"></div>
      <div className="hero-glow-1"></div>
      <div className="hero-glow-2"></div>

      <div className="container hero-content">
        {/* Gympass badge */}
        <div ref={badgeRef} className="hero-badge-wrapper opacity-0">
          <div className="badge badge-tertiary hero-badge">
            
            <span>Aceitamos Gympass & TotalPass</span>
          </div>
        </div>

        {/* Animated H1 Title with SplitText (Lines & Words) */}
        <AnimatedText
          as="h1"
          className="hero-title"
          type="words,lines"
          animation="fade-up"
          delay={0.1}
          stagger={0.06}
          scrollTrigger={false}
        >
          Equipe Forma Academia
        </AnimatedText>

        <AnimatedText
          as="h2"
          className="hero-subtitle-gradient"
          type="words,lines"
          animation="fade-up"
          delay={0.3}
          stagger={0.04}
          scrollTrigger={false}
        >
          Seu treino, sua evolução diária.
        </AnimatedText>

        {/* Paragraph with Split Lines / Words */}
        <AnimatedText
          as="p"
          className="hero-description"
          type="words,lines"
          animation="stagger-blur"
          delay={0.5}
          duration={0.7}
          stagger={0.02}
          scrollTrigger={false}
        >
          A união perfeita entre Musculação completa de alta performance e Jiu-Jitsu técnico de alto nível em um único centro de excelência em Maricá.
        </AnimatedText>

        {/* CTA Buttons */}
        <div ref={ctaRef} className="hero-ctas opacity-0">
          <a href="#planos" className="btn-primary hero-btn gsap-btn">
            <Dumbbell size={20} />
            <span>Conhecer Nossos Planos</span>
          </a>
          <a
            href="https://wa.me/5521975334017?text=Olá!%20Vim%20pelo%20site%20da%20Equipe%20Forma%20e%20gostaria%20de%20mais%20informações."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline hero-btn gsap-btn"
          >
            <MessageCircle size={20} className="text-tertiary" />
            <span>Falar no WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
};
