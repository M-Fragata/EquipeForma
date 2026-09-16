import React from 'react';
import { useSplitText, type UseSplitTextOptions } from '../hooks/useSplitText';

interface AnimatedTextProps extends UseSplitTextOptions {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  style?: React.CSSProperties;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  style,
  type = 'words,lines',
  animation = 'fade-up',
  delay = 0,
  duration = 0.8,
  stagger = 0.04,
  scrollTrigger = true,
}) => {
  const ref = useSplitText<HTMLHeadingElement>({
    type,
    animation,
    delay,
    duration,
    stagger,
    scrollTrigger,
  });

  return React.createElement(
    Component,
    {
      ref,
      className,
      style,
    },
    children
  );
};
