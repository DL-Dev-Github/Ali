import React from 'react';
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import theme from 'theme';

const fadeOut = keyframes`
0%  {
    opacity: 1;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const expand = keyframes`
  0% {
    height: 0%;
    width: 2px;
    opacity: 1;
  }
  25% {
    height: 100%;
    width: 2px;
    opacity: 1;
  }
  32% {
    height: 100%;
    width: 4px;
    opacity: 1;
  }
  50% {
    height: 100%;
    width: 8px;
    opacity: 1;
  }
  70% {
    height: 100%;
    width: 75%;
    opacity: 1;
  }
  95% {
    height: 100%;
    width: 100%;
    opacity: 0;
  }

  100% {
    height: 100%;
    width: 100%;
    opacity: 0;
  }
`;

const LoadingScreenWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  display: flex;
  opacity: 1;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  animation: ${fadeOut} 1s 1s forwards ease-in-out;
  &.hidden {
    display: none;
  }
`;

const Blind = styled.div<{ index: number }>`
  height: 100%;
  background-color: #000;
  animation: ${expand} 2.5s ${({ index }) => index * 0.005}s forwards ease-in-out;

`;

const LoadingScreen: React.FC = () => {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setHidden(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  const blinds = Array.from({ length: 8 }, (_, index) => (
    <Blind key={index} index={index} />
  ));

  return (
    <LoadingScreenWrapper className={hidden ? 'hidden' : ''}>
      {blinds}
    </LoadingScreenWrapper>
  );
};

export default LoadingScreen;
