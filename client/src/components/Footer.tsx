import React, { useRef, useEffect } from 'react';
import { Dumbbell, Phone, MapPin, MessageCircle, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { AnimatedText } from './AnimatedText';
import './Footer.css';
import logo from '../../public/logoforma.png';

gsap.registerPlugin(ScrollTrigger);

export const Footer: React.FC = () => {
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bannerRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(bannerRef.current, {
        scrollTrigger: {
          trigger: bannerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
        scale: 0.94,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  const logoUrl = logo;

  return (
    <footer id="contatos" className="footer-wrapper">
      <span id="contato" className="sr-only" aria-hidden="true" />
      {/* Intermediate Conversion Banner */}
      <div className="container">
        <div ref={bannerRef} className="conversion-banner gsap-card">
          <div className="banner-text">
            <div className="flex items-center gap-2 mb-2">
              <img src={logoUrl} alt="Logo" className="banner-logo" />
              <span className="banner-brand">Equipe Forma Academia</span>
            </div>
            <AnimatedText
              as="h3"
              className="banner-heading"
              type="words,lines"
              animation="fade-up"
            >
              A infraestrutura que você precisa com a energia que te move todos os dias.
            </AnimatedText>
            <p className="banner-subtext">
              Venha fazer uma aula experimental sem compromisso e sinta a diferença no tatame e nos aparelhos!
            </p>
          </div>

          <a
            href="https://wa.me/5521975334017?text=Olá!%20Gostaria%20de%20agendar%20uma%20aula%20experimental%20grátis%20na%20Equipe%20Forma."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary banner-cta gsap-btn"
          >
            <Dumbbell size={20} />
            <span>Agendar Aula Experimental Grátis</span>
          </a>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          {/* Column 1: Brand */}
          <div className="footer-col">
            <div className="footer-brand-header">
              <img src={logoUrl} alt="Equipe Forma" className="footer-logo" />
              <span className="footer-brand-title">Equipe Forma</span>
            </div>
            <p className="footer-brand-desc">
              Centro de treinamento de alta performance, saúde integrada e musculação com metodologia comprovada para o seu resultado.
            </p>
            <div className="badge badge-tertiary footer-badge">
              <ShieldCheck size={14} />
              <span>Aceitamos Gympass & TotalPass</span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="footer-col">
            <h4 className="footer-col-title">Navegação</h4>
            <ul className="footer-links">
              <li><a href="#inicio">Início</a></li>
              <li><a href="#modalidades">Modalidades</a></li>
              <li><a href="#horarios">Horários e Localização</a></li>
              <li><a href="#planos">Planos</a></li>
              <li><a href="#contatos">Contatos</a></li>
            </ul>
          </div>

          {/* Column 3: Schedules */}
          <div className="footer-col">
            <h4 className="footer-col-title">Horários</h4>
            <ul className="footer-schedule">
              <li>
                <span className="day">Segunda a Sexta</span>
                <span className="time">06:00 - 22:00</span>
              </li>
              <li>
                <span className="day">Sábados</span>
                <span className="time">09:00 - 13:00</span>
              </li>
              <li>
                <span className="day">Domingos e Feriados</span>
                <span className="time">Consultar Programação</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Social */}
          <div className="footer-col">
            <h4 className="footer-col-title">Contato & Redes</h4>
            <div className="footer-contact-list">
              <a
                href="https://wa.me/5521975334017"
                target="_blank"
                rel="noopener noreferrer"
                className="contact-item"
              >
                <Phone size={18} className="text-secondary" />
                <span>(21) 97533-4017</span>
              </a>
              <div className="contact-item">
                <MapPin size={18} className="text-primary" />
                <span>Maricá, Rio de Janeiro - RJ</span>
              </div>
            </div>

            <div className="social-links">
              <a
                href="https://www.instagram.com/equipeformaacademia/"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Instagram da Equipe Forma"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a
                href="https://www.facebook.com/equipeforma"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="Facebook da Equipe Forma"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a
                href="https://wa.me/5521975334017"
                target="_blank"
                rel="noopener noreferrer"
                className="social-btn"
                aria-label="WhatsApp da Equipe Forma"
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Equipe Forma Academia. Todos os direitos reservados.</p>
          <div className="footer-legal">
            <span>Musculação de Alta Performance & Jiu-Jitsu</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
