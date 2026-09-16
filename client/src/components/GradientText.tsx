import { useId, type ReactNode, useMemo } from 'react';

interface GradientTextProps {
  children: ReactNode;
  className?: string;
  colors?: string[];
  animationSpeed?: number;
  showBorder?: boolean;
  direction?: 'horizontal' | 'vertical' | 'diagonal';
  pauseOnHover?: boolean;
  yoyo?: boolean;
}

export default function GradientText({
  children,
  className = '',
  colors = ['#5227FF', '#FF9FFC', '#B497CF'],
  animationSpeed = 3,
  showBorder = false,
  direction = 'horizontal',
  pauseOnHover = false,
  yoyo = true
}: GradientTextProps) {
  const id = useId().replace(/:/g, '');
  const animName = `gradientShift-${direction}-${id}`;

  const gradientAngle =
    direction === 'horizontal' ? 'to right' : direction === 'vertical' ? 'to bottom' : 'to bottom right';

  const gradientColors = useMemo(() => [...colors, colors[0]].join(', '), [colors]);

  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(${gradientAngle}, ${gradientColors})`,
    backgroundSize:
      direction === 'horizontal' ? '300% 100%' : direction === 'vertical' ? '100% 300%' : '300% 300%',
  };

  const animationStyle: React.CSSProperties = {
    ...gradientStyle,
    animation: `${animName} ${animationSpeed}s linear infinite ${yoyo ? 'alternate' : 'normal'}`,
  };



  const keyframes = `
    @keyframes ${animName} {
      0% { background-position: ${direction === 'horizontal' ? '0% 50%' : direction === 'vertical' ? '50% 0%' : '0% 0%'}; }
      100% { background-position: ${direction === 'horizontal' ? '100% 50%' : direction === 'vertical' ? '50% 100%' : '100% 100%'}; }
    }
    ${pauseOnHover ? `.${animName}-wrap:hover .${animName}-inner { animation-play-state: paused !important; }` : ''}
  `;

  return (
    <>
      <style>{keyframes}</style>
      <div
        className={`relative mx-auto flex max-w-fit flex-row items-center justify-center rounded-[1.25rem] font-medium backdrop-blur transition-shadow duration-500 overflow-hidden ${showBorder ? 'py-1 px-2' : ''} ${animName}-wrap ${className}`}
      >
        {showBorder && (
          <div
            className="absolute inset-0 z-0 pointer-events-none rounded-[1.25rem]"
            style={animationStyle}
          >
            <div
              className="absolute bg-black rounded-[1.25rem] z-[-1]"
              style={{
                width: 'calc(100% - 2px)',
                height: 'calc(100% - 2px)',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            />
          </div>
        )}
        <div
          className={`inline-block relative z-2 text-transparent bg-clip-text ${animName}-inner`}
          style={{
            ...animationStyle,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {children}
        </div>
      </div>
    </>
  );
}
