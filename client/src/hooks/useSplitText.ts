import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export interface UseSplitTextOptions {
  type?: 'lines' | 'words' | 'words,lines' | 'chars,words' | 'lines,words,chars';
  animation?: 'fade-up' | 'reveal-mask' | 'stagger-blur' | 'wave';
  delay?: number;
  duration?: number;
  stagger?: number;
  scrollTrigger?: boolean | ScrollTrigger.Vars;
}

export function useSplitText<T extends HTMLElement = HTMLHeadingElement>(
  options: UseSplitTextOptions = {}
) {
  const ref = useRef<T>(null);

  const {
    type = 'words,lines',
    animation = 'fade-up',
    delay = 0,
    duration = 0.8,
    stagger = 0.04,
    scrollTrigger = true,
  } = options;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let splitInstance: SplitType | null = null;
    let ctx: gsap.Context | null = null;

    // Small timeout ensures webfonts are loaded and layout dimensions are calculated
    const initTimer = setTimeout(() => {
      splitInstance = new SplitType(el, {
        types: type,
        tagName: 'span',
      });

      ctx = gsap.context(() => {
        let targets: HTMLElement[] = [];
        if (type.includes('words') && splitInstance?.words?.length) {
          targets = splitInstance.words;
        } else if (type.includes('lines') && splitInstance?.lines?.length) {
          targets = splitInstance.lines;
        } else if (type.includes('chars') && splitInstance?.chars?.length) {
          targets = splitInstance.chars;
        }

        if (targets.length === 0) return;

        // Wrap lines in overflow-hidden masks for reveal-mask effect
        if (animation === 'reveal-mask' && splitInstance?.lines) {
          splitInstance.lines.forEach((line) => {
            const wrapper = document.createElement('div');
            wrapper.style.overflow = 'hidden';
            wrapper.style.display = 'block';
            line.parentNode?.insertBefore(wrapper, line);
            wrapper.appendChild(line);
          });
        }

        // Release initial opacity-0 on parent now that child targets are ready to animate
        el.classList.remove('opacity-0');

        let initialVars: gsap.TweenVars = { opacity: 0 };
        const toVars: gsap.TweenVars = {
          ease: 'power3.out',
          duration,
          delay,
          stagger,
          opacity: 1,
          clearProps: 'transform',
          onComplete: () => {
            el.classList.add('opacity-1');
            gsap.set(targets, { opacity: 1 });
          },
        };

        if (animation === 'fade-up') {
          initialVars.y = 35;
          initialVars.rotateX = -10;
          toVars.y = 0;
          toVars.rotateX = 0;
        } else if (animation === 'reveal-mask') {
          initialVars.yPercent = 105;
          toVars.yPercent = 0;
        } else if (animation === 'stagger-blur') {
          initialVars.y = 20;
          initialVars.filter = 'blur(6px)';
          toVars.y = 0;
          toVars.filter = 'blur(0px)';
        } else if (animation === 'wave') {
          initialVars.y = 25;
          initialVars.scale = 0.95;
          toVars.y = 0;
          toVars.scale = 1;
        }

        if (scrollTrigger) {
          toVars.scrollTrigger =
            typeof scrollTrigger === 'object'
              ? scrollTrigger
              : {
                  trigger: el,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                };
        }

        gsap.fromTo(targets, initialVars, toVars);
      }, el);
    }, 60);

    return () => {
      clearTimeout(initTimer);
      if (ctx) ctx.revert();
      if (splitInstance) splitInstance.revert();
    };
  }, [type, animation, delay, duration, stagger, scrollTrigger]);

  return ref;
}
