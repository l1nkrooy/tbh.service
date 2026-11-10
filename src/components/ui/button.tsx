"use client";

import { forwardRef, useRef, type ButtonHTMLAttributes } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils/cn";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "discord"
  | "funpay"
  | "donationalerts";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  magnetic?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-blood text-bone hover:bg-blood-bright shadow-[var(--shadow-glow-blood)]",
  secondary:
    "bg-panel-raised text-bone border border-line hover:border-bone-faint",
  ghost: "bg-transparent text-bone-dim hover:text-bone hover:bg-panel/60",
  discord: "bg-[#5865F2] text-white hover:bg-[#6b75f5]",
  funpay: "bg-relic text-ash hover:bg-relic-bright",
  donationalerts: "bg-[#FF7426] text-white hover:bg-[#ff8a47]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-[0.95rem]",
  lg: "px-8 py-4 text-base",
};

/**
 * Кнопка с фирменным "магнитным" поведением: при наведении лёгко
 * подтягивается к курсору в пределах своей области.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      magnetic = true,
      children,
      ...props
    },
    forwardedRef,
  ) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.3 });
    const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.3 });

    function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
      if (!magnetic || !innerRef.current) return;
      const rect = innerRef.current.getBoundingClientRect();
      const relX = e.clientX - rect.left - rect.width / 2;
      const relY = e.clientY - rect.top - rect.height / 2;
      x.set(relX * 0.25);
      y.set(relY * 0.25);
    }

    function handleMouseLeave() {
      x.set(0);
      y.set(0);
    }

    return (
      <motion.button
        ref={(node) => {
          innerRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        style={magnetic ? { x: springX, y: springY } : undefined}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.96 }}
        className={cn(
          "inline-flex items-center justify-center gap-2 rounded-[var(--radius-md)] font-medium transition-colors duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {children}
      </motion.button>
    );
  },
);

Button.displayName = "Button";
