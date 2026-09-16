import React, { useRef, useEffect } from 'react';
import { Dumbbell, Swords, Check, Star } from 'lucide-react';
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

    const ctx = gsap.context(() => {
      gsap.to('.plan-card', {
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
        onComplete: () => {
          document.querySelectorAll('.plan-card').forEach((el) => {
            el.classList.remove('opacity-0');
            el.classList.add('opacity-1');
          });
        },
      });
    }, gridRef);

    return () => {
      clearTimeout(timer);
      ctx.revert();
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
              href="https://wa.me/5521975334017?text=Olá!%20Gostaria%20de%20me%20matricular%20no%20Plano%20Musculação."
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
                <Swords size={22} className="text-secondary" />
                <Dumbbell size={22} className="text-secondary" />
              </div>

              <h3 className="plan-name">Combo Musculação + Jiu-Jitsu</h3>
              <p className="plan-summary">
                Treinamento híbrido absoluto: potência muscular combinada com a técnica e disciplina do tatame.
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
                  <strong className="text-white">Acesso total musculação + tatame ilimitado</strong>
                </li>
                <li>
                  <div className="check-bullet orange">
                    <Check size={14} />
                  </div>
                  <span>Aulas de Jiu-Jitsu em todas as graduações</span>
                </li>
                <li>
                  <div className="check-bullet orange">
                    <Check size={14} />
                  </div>
                  <span>Preparação física funcional para lutas</span>
                </li>
                <li>
                  <div className="check-bullet orange">
                    <Check size={14} />
                  </div>
                  <span>Treinos livres aos sábados (Open Mat)</span>
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
              href="https://wa.me/5521975334017?text=Olá!%20Quero%20aproveitar%20o%20Combo%20Musculação%20e%20Jiu-Jitsu%20com%20isenção%20de%20matrícula."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary plan-cta featured-btn gsap-btn"
            >
              Fazer Matrícula
            </a>
          </div>

          {/* Plano Jiu-Jitsu */}
          <div className="plan-card gsap-card opacity-0">
            <div>
              <div className="plan-card-header">
                <span className="badge badge-primary">Arte Suave</span>
                <Swords size={22} className="text-muted" />
              </div>

              <h3 className="plan-name">Plano Jiu-Jitsu</h3>
              <p className="plan-summary">
                Foco estrito nas artes marciais, com evolução técnica, autodefesa e formação marcial.
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
                  <span>Acesso a todas as turmas de Jiu-Jitsu</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Graduação oficial reconhecida</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Turmas iniciantes, intermediárias e avançadas</span>
                </li>
                <li>
                  <div className="check-bullet blue">
                    <Check size={14} />
                  </div>
                  <span>Suporte de mestres qualificados</span>
                </li>
              </ul>
            </div>

            <a
              href="https://wa.me/5521975334017?text=Olá!%20Desejo%20me%20matricular%20no%20Plano%20Jiu-Jitsu."
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
