import React, { useRef, useEffect } from 'react';
import { Dumbbell, Swords, Flame, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from './AnimatedText';
import './Modalities.css';

gsap.registerPlugin(ScrollTrigger);

export const Modalities: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const mm = gsap.matchMedia(gridRef);

    // Mobile: cada card inicia a animação individualmente ao entrar na tela
    mm.add('(max-width: 767px)', () => {
      const cards = gsap.utils.toArray<HTMLElement>('.modality-card');
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
            onComplete: () => {
              card.classList.remove('opacity-0');
              card.classList.add('opacity-1');
            },
          }
        );
      });
    });

    // Desktop: cards entram juntos com stagger ao atingir a seção
    mm.add('(min-width: 768px)', () => {
      gsap.fromTo(
        '.modality-card',
        {
          y: 45,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          onComplete: () => {
            const cards = document.querySelectorAll('.modality-card');
            cards.forEach((el) => {
              el.classList.remove('opacity-0');
              el.classList.add('opacity-1');
            });
          },
        }
      );
    });

    return () => mm.revert();
  }, []);
  const musculacaoImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC08NrZ04XLCYxC-jyP1B5C_BLxknz0CAIAqgCEfs0QvtDR1ZvFwspyHpVvViIvhCFQITSbGVA3MzhGJHGMMsMYk5tmRyCpcAS4xq-JlOFI_SG_5tJr4Mz3syKuS2CisfyBQ8nM1agKFZXh15IYsZaKxafoSWl_XovSJzyLaygGXnr_ThD9jcgsvCoyku1X9BHSiey_jsprCtCFwHv1bEz-g0Hkanh2828yuwyvsNf6V0ZDUGqyCwFB';

  return (
    <section id="modalidades" className="modalities-section">
      <div className="container">
        <div className="section-header">
          <div className="section-title-group">
            <span className="badge badge-secondary mb-2">Estrutura de Alto Nível</span>
            <AnimatedText
              as="h2"
              className="section-title"
              type="words,lines"
              animation="fade-up"
            >
              <span className="highlight-primary">Musculação, Jiu-Jitsu e Muay Thai</span>
              <br />
              projetados para o seu resultado
            </AnimatedText>
          </div>
          <AnimatedText
            as="p"
            className="section-desc"
            type="words,lines"
            animation="stagger-blur"
          >
            Ambiente climatizado, aparelhos biomecânicos modernos, tatame de alta densidade e área dedicada para striking e artes marciais.
          </AnimatedText>
        </div>

        <div ref={gridRef} className="modalities-grid">
          {/* Card Musculação */}
          <div className="modality-card card-musculacao gsap-card opacity-0">
            <div className="modality-glow blue"></div>
            <div className="modality-content">
              <div className="modality-header">
                <div className="modality-icon-box blue">
                  <Dumbbell size={28} />
                </div>
                <AnimatedText
                  as="h3"
                  className="modality-name"
                  type="words,lines"
                  animation="fade-up"
                >
                  Musculação
                </AnimatedText>
              </div>

              <p className="modality-text">
                Aparelhos biomecânicos modernos e completos para força, hipertrofia e condicionamento físico. Área de pesos livres completa com halteres monobloco, gaiolas de agachamento e maquinário ergonômico.
              </p>

              <ul className="modality-features">
                <li>
                  <CheckCircle2 size={18} className="feature-icon blue" />
                  <span>Área de Pesos Livres</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon blue" />
                  <span>Esteiras & Cárdio</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon blue" />
                  <span>Fichas Digitais de Treino</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon blue" />
                  <span>Auxílio de Professores</span>
                </li>
              </ul>
            </div>

            <div className="modality-image-container">
              <img
                src={musculacaoImage}
                alt="Musculação de Alto Nível na Equipe Forma"
                className="modality-img"
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          {/* Card Jiu-Jitsu */}
          <div className="modality-card card-jiujitsu gsap-card opacity-0">
            <div className="modality-glow orange"></div>
            <div className="modality-content">
              <div className="modality-header">
                <div className="modality-icon-box orange">
                  <Swords size={28} />
                </div>
                <AnimatedText
                  as="h3"
                  className="modality-name"
                  type="words,lines"
                  animation="fade-up"
                >
                  Jiu-Jitsu
                </AnimatedText>
              </div>

              <p className="modality-text">
                Metodologia estruturada com treinos técnicos para todos os níveis, do iniciante ao atleta de competição. Disciplina marcial, defesa pessoal apurada e evolução contínua sob instrução de mestres graduados.
              </p>

              <ul className="modality-features">
                <li>
                  <CheckCircle2 size={18} className="feature-icon orange" />
                  <span>Gi (Kimono) & No-Gi</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon orange" />
                  <span>Turmas Kids a Master</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon orange" />
                  <span>Tatame Amplo & Higienizado</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon orange" />
                  <span>Preparação Marcial</span>
                </li>
              </ul>
            </div>

            <div className="modality-image-container">
              <img
                src="../../public/jjalunos.jpg"
                alt="Treinamento de Jiu-Jitsu na academia forma e fitness"
                className="modality-img"
              />
              <div className="image-overlay"></div>
            </div>
          </div>

          {/* Card Muay Thai */}
          <div className="modality-card card-muaythai gsap-card opacity-0">
            <div className="modality-glow red"></div>
            <div className="modality-content">
              <div className="modality-header">
                <div className="modality-icon-box red">
                  <Flame size={28} />
                </div>
                <AnimatedText
                  as="h3"
                  className="modality-name"
                  type="words,lines"
                  animation="fade-up"
                >
                  Muay Thai
                </AnimatedText>
              </div>

              <p className="modality-text">
                A arte das oito armas: dinâmica intensa combinando socos, chutes, joelhadas e cotoveladas. Treinamento de alta intensidade para condicionamento cardiorrespiratório, queima calórica acelerada, agilidade e defesa pessoal para todos os níveis.
              </p>

              <ul className="modality-features">
                <li>
                  <CheckCircle2 size={18} className="feature-icon red" />
                  <span>Striking Completo (Socos, Chutes e Joelhos)</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon red" />
                  <span>Alto Gasto Calórico e Definição</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon red" />
                  <span>Turmas Mistas, Femininas e Iniciantes</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon red" />
                  <span>Instrução Técnica Especializada</span>
                </li>
              </ul>
            </div>

            <div className="modality-image-container">
              <img
                src="../../public/mtalunos.jpg"
                alt="Treinamento de Muay Thai na Academia Forma e Fitness"
                className="modality-img"
              />
              <div className="image-overlay"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
