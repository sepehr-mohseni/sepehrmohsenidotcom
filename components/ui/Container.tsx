import { clsx } from "clsx";
import type { HTMLAttributes, ReactNode } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  centered?: boolean;
}

const sizeStyles = {
  sm: "max-w-2xl",
  md: "max-w-4xl",
  lg: "max-w-6xl",
  xl: "max-w-7xl",
  full: "max-w-full",
};

export function Container({
  children,
  size = "lg",
  centered = true,
  className,
  ...props
}: ContainerProps) {
  return (
    <div
      className={clsx(
        "w-full px-4 sm:px-6 lg:px-8",
        sizeStyles[size],
        centered && "mx-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
