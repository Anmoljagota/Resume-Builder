"use client";
import { useSpring, animated, SpringValue } from "@react-spring/web";
import React from "react";

interface IAnimatedDivProps {
  children: React.ReactNode;
  springValue: {
    from: { x?: number; y?: number; opacity?: number };
    to: { x?: number; y?: number; opacity?: number };

    config?: { duration: number };
    delay?: number;
  };
}

const AnimatedDiv = ({ children, springValue }: IAnimatedDivProps) => {
  const [springs] = useSpring(() => springValue);
  return <animated.div style={springs}>{children}</animated.div>;
};
export default AnimatedDiv;
