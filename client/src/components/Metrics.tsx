import React, { useRef, useEffect } from 'react';
import { Users, Award, Cpu, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Metrics.css';

gsap.registerPlugin(ScrollTrigger);

export const Metrics: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial hidden state until Header finishes
    gsap.set('.metric-card', { y: 25, opacity: 0 });

    let hasAnimated = false;
    const animateMetrics = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      gsap.to('.metric-card', {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.08,
        ease: 'power2.out',
        onComplete: () => {
          document.querySelectorAll('.metric-card').forEach((el) => {
            el.classList.remove('opacity-0');
            el.classList.add('opacity-1');
          });
        },
      });
    };

    // Listen for header completion event
    window.addEventListener('header-animation-complete', animateMetrics);

    // Also trigger via ScrollTrigger if the user scrolls down immediately
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      onEnter: () => {
        // If scrolled into view after 1s, allow animation
        animateMetrics();
      },
    });

    // Fallback timer: guarantees metrics animate even without events
    const fallbackTimer = setTimeout(animateMetrics, 2100);

    return () => {
      window.removeEventListener('header-animation-complete', animateMetrics);
      clearTimeout(fallbackTimer);
      st.kill();
    };
  }, []);

  const metrics = [
    {
      value: '+500',
      label: 'Alunos Ativos',
      icon: <Users className="metric-icon primary" size={24} />,
      highlight: true,
    },
    {
      value: 'Tatame Oficial',
      label: 'Área Ampla',
      icon: <Award className="metric-icon secondary" size={24} />,
    },
    {
      value: 'Biomecânica',
      label: 'Carga e Ergonomia',
      icon: <Cpu className="metric-icon primary" size={24} />,
    },
    {
      value: 'Faixa Preta',
      label: 'Mestres Titulados',
      icon: <Trophy className="metric-icon tertiary" size={24} />,
    },
  ];

  return (
    <section ref={sectionRef} className="metrics-section">
      <div className="container">
        <div className="metrics-grid">
          {metrics.map((item, idx) => (
            <div key={idx} className="metric-card opacity-0">
              <div className="metric-header">
                {item.icon}
                <span className={`metric-value ${item.highlight ? 'highlight' : ''}`}>
                  {item.value}
                </span>
              </div>
              <span className="metric-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
