import React, { useEffect, useRef } from 'react';

interface BarProps {
  index: number;
  delay: number;
  duration: number;
}

const Bar: React.FC<BarProps> = ({ index, delay, duration }) => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (barRef.current) {
        barRef.current.style.width = '0%';
      }
    }, delay * index);

    return () => {
      clearTimeout(timer);
    };
  }, [delay, index]);

  return (
    <div
      ref={barRef}
      style={{
        width: '100%',
        flex: '1',
        backgroundColor: '#000',
        margin: '0 1px',
        transition: `width ${duration}ms`,
      }}
    />
  );
};

export default Bar;
