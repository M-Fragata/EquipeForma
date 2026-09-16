import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Dumbbell, Sun, Moon } from 'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../hooks/useTheme';
import './Navbar.css';

import logo from "../../public/logoforma.png"

export const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const headerRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sectionIds = ['modalidades', 'horarios', 'planos', 'contatos'];
      const isBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 60;

      if (isBottom) {
        setActiveSection('contatos');
        return;
      }

      // If before modalidades (in hero), clear active link
      const firstSection = document.getElementById('modalidades');
      if (firstSection) {
        const firstRect = firstSection.getBoundingClientRect();
        if (firstRect.top > 200) {
          setActiveSection('');
          return;
        }
      }

      let current = '';
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 220 && rect.bottom >= 100) {
            current = id;
          }
        }
      }

      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!headerRef.current) return;

    // Set initial hidden state so it waits for Hero
    gsap.set(headerRef.current, { y: -90, opacity: 0 });

    let hasAnimated = false;
    const animateHeader = () => {
      if (hasAnimated) return;
      hasAnimated = true;

      gsap.to(headerRef.current, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        ease: 'power3.out',
        onComplete: () => {
          headerRef.current?.classList.remove('opacity-0');
          headerRef.current?.classList.add('opacity-1');
          // Signal that Header animation has finished, now Metrics can animate
          window.dispatchEvent(new CustomEvent('header-animation-complete'));
        },
      });

      if (navRef.current) {
        gsap.fromTo(
          navRef.current.querySelectorAll('.navbar-link'),
          { y: -15, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.45,
            stagger: 0.06,
            delay: 0.15,
            ease: 'power2.out',
          }
        );
      }
    };

    window.addEventListener('hero-animation-complete', animateHeader);

    // Fallback timer to ensure header appears even if hero event isn't caught
    const fallbackTimer = setTimeout(animateHeader, 1400);

    return () => {
      window.removeEventListener('hero-animation-complete', animateHeader);
      clearTimeout(fallbackTimer);
    };
  }, []);

  const logoUrl = logo;

  return (
    <header ref={headerRef} className={`navbar-header opacity-0 ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <a href="#inicio" className="navbar-brand">
          <img src={logoUrl} alt="Academia Forma Fitness" className="navbar-logo" />
          <div className="navbar-title-group">
            <span className="navbar-title-forma">Forma</span>
            <span className="navbar-title-fitness">Fitness</span>
          </div>
        </a>

        <nav ref={navRef} className={`navbar-nav ${mobileMenuOpen ? 'open' : ''}`}>
          <a
            href="#modalidades"
            onClick={() => {
              setActiveSection('modalidades');
              setMobileMenuOpen(false);
            }}
            className={`navbar-link ${activeSection === 'modalidades' ? 'active' : ''}`}
          >
            Modalidades
          </a>
          <a
            href="#horarios"
            onClick={() => {
              setActiveSection('horarios');
              setMobileMenuOpen(false);
            }}
            className={`navbar-link ${activeSection === 'horarios' ? 'active' : ''}`}
          >
            Horários e Localização
          </a>
          <a
            href="#planos"
            onClick={() => {
              setActiveSection('planos');
              setMobileMenuOpen(false);
            }}
            className={`navbar-link ${activeSection === 'planos' ? 'active' : ''}`}
          >
            Planos
          </a>
          <a
            href="#contatos"
            onClick={() => {
              setActiveSection('contatos');
              setMobileMenuOpen(false);
            }}
            className={`navbar-link ${activeSection === 'contatos' ? 'active' : ''}`}
          >
            Contatos
          </a>
          <div className="mobile-menu-actions">
            <a
              href="#planos"
              onClick={() => setMobileMenuOpen(false)}
              className="btn-secondary mobile-cta gsap-btn"
            >
              <Dumbbell size={18} />
              Matricule-se
            </a>
          </div>
        </nav>

        <div className="navbar-actions">
          {/* Quick Theme Switcher Button */}
          <button
            onClick={toggleTheme}
            className="navbar-theme-btn"
            title={theme === 'light' ? 'Mudar para Modo Escuro' : 'Mudar para Modo Claro'}
            aria-label={theme === 'light' ? 'Mudar para Modo Escuro' : 'Mudar para Modo Claro'}
          >
            {theme === 'light' ? (
              <Moon size={19} className="theme-icon moon" />
            ) : (
              <Sun size={19} className="theme-icon sun" />
            )}
          </button>

          <a href="#planos" className="btn-secondary navbar-cta gsap-btn">
            <Dumbbell size={18} />
            <span>Matricule-se Agora</span>
          </a>

          <button
            className="mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>
    </header>
  );
};

