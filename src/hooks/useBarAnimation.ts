import { useSpring } from 'react-spring';

interface BarAnimationProps {
  index: number;
  delay: number;
  duration: number;
}

export const useBarAnimation = ({
  index,
  delay,
  duration,
}: BarAnimationProps) => {
  const animation = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    delay: 0,
    config: { duration: 1 },
  });

  return animation;
};
