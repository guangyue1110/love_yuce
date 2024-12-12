export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
}

export interface TransitionProps {
  initial?: object;
  animate?: object;
  exit?: object;
  transition?: AnimationConfig;
} 