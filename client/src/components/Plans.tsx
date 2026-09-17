import React, { useRef, useEffect } from 'react';
import { Dumbbell, Swords, Flame, Check, Star } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from './AnimatedText';
import './Plans.css';

gsap.registerPlugin(ScrollTrigger);

export const Plans: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 150);

    const mm = gsap.matchMedia(gridRef);

    // Mobile: cada card de plano anima individualmente ao entrar na tela
    mm.add('(max-width: 767px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.plan-card');
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          {
            y: 35,
            opacity: 0,
          },
          {
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
            y: 0,
            opacity: 1,
            duration: 0.7,
            ease: 'power3.out',
            clearProps: 'transform',
            onComplete: () => {
              card.classList.remove('opacity-0');
              card.classList.add('opacity-1');
              gsap.set(card, { clearProps: 'transform' });
            },
          }
        );
      });
    });

    // Desktop: cards entram juntos com stagger ao visualizar o grid
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        '.plan-card',
        {
          y: 40,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'transform',
          onComplete: () => {
            document.querySelectorAll('.plan-card').forEach((el) => {
              el.classList.remove('opacity-0');
              el.classList.add('opacity-1');
            });
            gsap.set('.plan-card', { clearProps: 'transform' });
          },
        }
      );
    });

    return () => {
      clearTimeout(timer);
      mm.revert();
    };
  }, []);

  return (
    <section id="planos" className="plans-section">
      <div className="plans-ambient-glow"></div>
      <div className="container">
        <div className="plans-header">
          <span className="badge badge-primary mb-2">Sem Complicação, Máximo Resultado</span>
          <AnimatedText
            as="h2"
            className="plans-title"
            type="words,lines"
            animation="fade-up"
          >
            Escolha o plano ideal para a sua rotina
          </AnimatedText>
          <AnimatedText
            as="p"
            className="plans-desc"
            type="words,lines"
            animation="stagger-blur"
          >
            Planos transparentes com infraestrutura premium, suporte especializado e liberdade de evolução técnica.
          </AnimatedText>
        </div>

        <div ref={gridRef} className="plans-grid">
          {/* Plano Musculação */}
          <div className="plan-card gsap-card opacity-0">
            <div>
              <div className="plan-card-header">
                <span className="badge badge-primary">Força & Cárdio</span>
                <Dumbbell size={22} className="text-muted" />
              </div>

              <h3 className="plan-name">Plano Musculação</h3>
              <p className="plan-summary">
                Focado em hipertrofia, saúde cardiovascular e emagrecimento com acompanhamento de sala.
              </p>

              <div className="plan-pricing">
                <span className="currency">R$</span>
                <span className="price">109,90</span>
                <span className="period">/mês</span>
              </div>

              <ul className="plan-benefits">
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Acesso livre à área de musculação</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Treino personalizado</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Avaliação física periódica</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Vestiários completos e armários</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/5521975334017?text=Olá!%20Vim%20do%20site%20e%20gostaria%20de%20me%20matricular%20no%20Plano%20Musculação."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline plan-cta gsap-btn"
            >
              Fazer Matrícula
            </a>
          </div>

          {/* Plano Combo (Destaque) */}
          <div className="plan-card plan-featured gsap-card opacity-0">
            <div className="featured-badge">
              <Star size={13} fill="#ffffff" />
              <span>Custo-Benefício</span>
            </div>

            <div>
              <div className="plan-card-header">
                <span className="badge badge-secondary">Experiência Completa</span>
                <div className="plan-icons-group">
                  <Dumbbell size={20} className="text-secondary" />
                  <Swords size={20} className="text-secondary" />
                  <Flame size={20} className="text-secondary" />
                </div>
              </div>

              <h3 className="plan-name">Combo Musculação + Arte Marcial</h3>
              <p className="plan-summary">
                Treinamento híbrido absoluto: potência muscular combinada com a técnica do Jiu-Jitsu ou a intensidade do Muay Thai.
              </p>

              <div className="plan-pricing">
                <span className="currency">R$</span>
                <span className="price highlight">169,90</span>
                <span className="period">/mês</span>
              </div>

              <ul className="plan-benefits">
                <li>
                  <div className="check-bullet orange">
                    <Check size={14} />
                  </div>
                  <strong className="text-white">Acesso total à musculação + luta à sua escolha</strong>
                </li>
                <li>
                  <div className="check-bullet orange">
                    <Check size={14} />
                  </div>
                  <span>Turmas de Jiu-Jitsu (todas as faixas) ou Muay Thai</span>
                </li>
                <li>
                  <div className="check-bullet orange">
                    <Check size={14} />
                  </div>
                  <span>Preparação física funcional e condicionamento</span>
                </li>
                <li>
                  <div className="check-bullet orange">
                    <Check size={14} />
                  </div>
                  <span>Treinos dinâmicos com professores graduados</span>
                </li>
                <li className="benefit-highlight">
                  <div className="check-bullet green">
                    <Check size={14} />
                  </div>
                  <span>Isenção total de taxa de matrícula</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/5521975334017?text=Olá!%20Vim%20do%20site%20e%20quero%20aproveitar%20o%20Combo%20Musculação%20e%20Arte%20Marcial%20com%20isenção%20de%20matrícula."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary plan-cta featured-btn gsap-btn"
            >
              Fazer Matrícula
            </a>
          </div>

          {/* Plano Jiu-Jitsu ou Muay Thai */}
          <div className="plan-card gsap-card opacity-0">
            <div>
              <div className="plan-card-header">
                <span className="badge badge-primary">Arte Marcial</span>
                <div className="plan-icons-group">
                  <Swords size={20} className="text-muted" />
                  <Flame size={20} className="text-muted" />
                </div>
              </div>

              <h3 className="plan-name">Plano Jiu-Jitsu ou Muay Thai</h3>
              <p className="plan-summary">
                Foco estrito nas artes marciais, com evolução técnica, autodefesa e alto condicionamento na modalidade escolhida.
              </p>

              <div className="plan-pricing">
                <span className="currency">R$</span>
                <span className="price">119,90</span>
                <span className="period">/mês</span>
              </div>

              <ul className="plan-benefits">
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Acesso à modalidade escolhida (Jiu-Jitsu ou Muay Thai)</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Metodologia estruturada do iniciante ao avançado</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Turmas técnicas, funcionais e preparação marcial</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Instrução com mestres e treinadores qualificados</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/5521975334017?text=Olá!%20Vim%20do%20site%20e%20desejo%20me%20matricular%20no%20Plano%20Jiu-Jitsu%20ou%20Muay%20Thai."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline plan-cta gsap-btn"
            >
              Fazer Matrícula
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
