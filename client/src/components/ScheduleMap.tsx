import React, { useRef, useEffect, useState } from 'react';
import { Clock, MapPin, Navigation, ShieldCheck, Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from './AnimatedText';
import { useTheme } from '../hooks/useTheme';
import './ScheduleMap.css';

gsap.registerPlugin(ScrollTrigger);

export const ScheduleMap: React.FC = () => {
  const { theme } = useTheme();
  const [darkMapOverride, setDarkMapOverride] = useState<boolean | null>(null);
  const darkMap = darkMapOverride ?? theme === 'dark';
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const mm = gsap.matchMedia(containerRef);

    // Mobile: cada card (horários e mapa) anima ao entrar individualmente na tela
    mm.add('(max-width: 767px)', () => {
      gsap.fromTo(
        '.schedule-card',
        {
          y: 35,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: '.schedule-card',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => {
            const el = document.querySelector('.schedule-card');
            el?.classList.remove('opacity-0');
            el?.classList.add('opacity-1');
          },
        }
      );

      gsap.fromTo(
        '.map-card',
        {
          y: 35,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: '.map-card',
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.7,
          ease: 'power3.out',
          onComplete: () => {
            const el = document.querySelector('.map-card');
            el?.classList.remove('opacity-0');
            el?.classList.add('opacity-1');
          },
        }
      );
    });

    // Desktop: cards entram simultaneamente pelos lados
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        '.schedule-card',
        {
          x: -40,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          onComplete: () => {
            const el = document.querySelector('.schedule-card');
            el?.classList.remove('opacity-0');
            el?.classList.add('opacity-1');
          },
        }
      );

      gsap.fromTo(
        '.map-card',
        {
          x: 40,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          x: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          onComplete: () => {
            const el = document.querySelector('.map-card');
            el?.classList.remove('opacity-0');
            el?.classList.add('opacity-1');
          },
        }
      );
    });

    return () => mm.revert();
  }, []);

  // Google Maps interactive embed coordinates for Equipe Forma Maricá
  const mapIframeSrc =
    'https://maps.google.com/maps?q=-22.912206,-42.820039&t=&z=16&ie=UTF8&iwloc=&output=embed';

  return (
    <section id="horarios" className="schedule-map-section">
      <div className="container">
        <div ref={containerRef} className="schedule-map-grid">
          {/* Card Horários */}
          <div className="info-card schedule-card gsap-card opacity-0">
            <div>
              <div className="card-header">
                <div className="card-icon-wrapper blue">
                  <Clock size={24} />
                </div>
                <AnimatedText
                  as="h3"
                  className="card-title"
                  type="words,lines"
                  animation="fade-up"
                >
                  Horários de Treino
                </AnimatedText>
              </div>

              <p className="card-desc">
                Ampla grade horária planejada para quem precisa treinar antes do expediente, no almoço ou no final do dia.
              </p>

              <div className="schedule-list">
                <div className="schedule-item">
                  <div className="schedule-day">
                    <span className="dot blue"></span>
                    <span>Segunda a Sexta</span>
                  </div>
                  <span className="schedule-time blue">06h às 22h</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-day">
                    <span className="dot orange"></span>
                    <span>Sábados</span>
                  </div>
                  <span className="schedule-time orange">09h às 13h</span>
                </div>

                <div className="schedule-item">
                  <div className="schedule-day">
                    <span className="dot grey"></span>
                    <span>Domingos e Feriados</span>
                  </div>
                  <span className="schedule-time muted">Consultar Programação</span>
                </div>
              </div>
            </div>

            <div className="schedule-footer">
              <ShieldCheck size={18} className="text-tertiary" />
              <span>Acesso liberado a todas as áreas conforme seu plano.</span>
            </div>
          </div>

          {/* Card Localização com Mapa 100% Interativo Embutido */}
          <div id="localizacao" className="info-card map-card gsap-card opacity-0">
            <div>
              <div className="card-header justify-between">
                <div className="flex-header">
                  <div className="card-icon-wrapper orange">
                    <MapPin size={24} />
                  </div>
                  <AnimatedText
                    as="h3"
                    className="card-title"
                    type="words,lines"
                    animation="fade-up"
                  >
                    Localização & Acesso
                  </AnimatedText>
                </div>
                <div className="map-badge-group">
                  <button
                    onClick={() => setDarkMapOverride(!darkMap)}
                    className="map-theme-btn"
                    title="Alternar tema do mapa"
                  >
                    {darkMap ? <Sun size={14} /> : <Moon size={14} />}
                  </button>

                </div>
              </div>

              <p className="card-desc">
                Você pode interagir diretamente com o mapa abaixo: dê zoom, arraste e explore o trajeto até nossa unidade em Maricá.
              </p>

              {/* Interactive Embedded Map Container */}
              <div className="map-interactive-wrapper">
                <iframe
                  title="Mapa Interativo da Equipe Forma Academia"
                  src={mapIframeSrc}
                  className={`map-interactive-iframe ${darkMap ? 'dark-filter' : ''}`}
                  loading="lazy"
                  allowFullScreen
                ></iframe>
                <div className="map-floating-pin">
                  <span className="map-pin-title">Equipe Forma Academia</span>
                </div>
              </div>
            </div>

            <div className="map-card-actions">
              <div className="location-details">
                <span className="city-title">Maricá, RJ</span>
                <span className="city-subtitle">Coordenadas: -22.912206, -42.820039</span>
              </div>
              <a
                href="https://www.google.com/maps/search/?api=1&query=-22.912206,-42.820039"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary map-btn gsap-btn"
              >
                <Navigation size={18} />
                <span>Abrir no App do Maps</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

