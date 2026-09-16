import React, { useRef, useEffect } from 'react';
import { Dumbbell, Swords, CheckCircle2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from './AnimatedText';
import './Modalities.css';

gsap.registerPlugin(ScrollTrigger);

export const Modalities: React.FC = () => {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.card-musculacao',
        {
          x: isMobile ? 0 : -45,
          y: isMobile ? 35 : 0,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );

      gsap.fromTo(
        '.card-jiujitsu',
        {
          x: isMobile ? 0 : 45,
          y: isMobile ? 35 : 0,
          opacity: 0,
        },
        {
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: isMobile ? 0.1 : 0.15,
          ease: 'power3.out',
          clearProps: 'all',
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, []);
  const musculacaoImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuC08NrZ04XLCYxC-jyP1B5C_BLxknz0CAIAqgCEfs0QvtDR1ZvFwspyHpVvViIvhCFQITSbGVA3MzhGJHGMMsMYk5tmRyCpcAS4xq-JlOFI_SG_5tJr4Mz3syKuS2CisfyBQ8nM1agKFZXh15IYsZaKxafoSWl_XovSJzyLaygGXnr_ThD9jcgsvCoyku1X9BHSiey_jsprCtCFwHv1bEz-g0Hkanh2828yuwyvsNf6V0ZDUGqyCwFB';

  const jiuJitsuImage =
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDcDycO845O0AzXDW3N7p9QrBWgnWwBTxQiOaNBNelzJG6L8lZ3ARLlhjiIdnwGAdnr3TMakfYkfhPKGj_kiAuGb07dzov3Kngwm-PxjARjeJjyQNPE63m0UW06HDea9TYYvRrfKgYAYiHu-NV21eAx1SzQqSDMI3gkkymSkLCtThmCot5PGq8DXwubh5dVusLY4XygoNcmfgOkzSO5XcgIUMHb_prx3nEoDV_aRZ4aV8W_ejqi6t_N';

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
              Musculação e Jiu-Jitsu projetados para o seu resultado
            </AnimatedText>
          </div>
          <AnimatedText
            as="p"
            className="section-desc"
            type="words,lines"
            animation="stagger-blur"
          >
            Ambiente climatizado, zoneamento estratégico para pesos livres, aparelhos calibrados e tatame de densidade profissional homologado.
          </AnimatedText>
        </div>

        <div ref={gridRef} className="modalities-grid">
          {/* Card Musculação */}
          <div className="modality-card card-musculacao gsap-card">
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
                  Musculação Avançada
                </AnimatedText>
              </div>

              <p className="modality-text">
                Aparelhos biomecânicos modernos e completos para força, hipertrofia e condicionamento físico. Área de pesos livres completa com halteres monobloco, gaiolas de agachamento e maquinário ergonômico.
              </p>

              <ul className="modality-features">
                <li>
                  <CheckCircle2 size={18} className="feature-icon blue" />
                  <span>Área de Pesos Livres Completa</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon blue" />
                  <span>Esteiras & Cárdio Pro</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon blue" />
                  <span>Fichas Digitais de Treino</span>
                </li>
                <li>
                  <CheckCircle2 size={18} className="feature-icon blue" />
                  <span>Professores em Sala</span>
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
          <div className="modality-card card-jiujitsu gsap-card">
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
                  Jiu-Jitsu de Elite
                </AnimatedText>
              </div>

              <p className="modality-text">
                Metodologia estruturada com treinos técnicos para todos os níveis — do iniciante ao atleta de competição. Disciplina marcial, defesa pessoal apurada e evolução contínua sob instrução de mestres graduados.
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
                  <span>Preparação Marcial & Competições</span>
                </li>
              </ul>
            </div>

            <div className="modality-image-container">
              <img
                src={jiuJitsuImage}
                alt="Treinamento de Jiu-Jitsu na Equipe Forma"
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
