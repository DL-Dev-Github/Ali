declare module 'react-confetti' {
    import { Component } from 'react';
  
    export interface ConfettiProps {
      width?: number;
      height?: number;
      numberOfPieces?: number;
      friction?: number;
      wind?: number;
      gravity?: number;
      initialVelocityX?: number;
      initialVelocityY?: number;
      colors?: string[];
      opacity?: number;
      recycle?: boolean;
      run?: boolean;
    }
  
    export default class Confetti extends Component<ConfettiProps> {}
  }
  