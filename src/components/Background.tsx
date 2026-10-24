import React, { useMemo } from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { PALETTE } from "../theme";

interface BackgroundProps {
  glowIntensity?: number;
  variant?: "intro" | "default" | "goldHeavy" | "finale";
}

export const Background: React.FC<BackgroundProps> = ({
  glowIntensity = 1,
  variant = "default",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Floating orb motion
  const redOrbX = interpolate(
    Math.sin((frame / fps) * 0.4),
    [-1, 1],
    [15, 35]
  );
  const redOrbY = interpolate(
    Math.cos((frame / fps) * 0.3),
    [-1, 1],
    [20, 45]
  );

  const goldOrbX = interpolate(
    Math.cos((frame / fps) * 0.35),
    [-1, 1],
    [65, 85]
  );
  const goldOrbY = interpolate(
    Math.sin((frame / fps) * 0.45),
    [-1, 1],
    [55, 80]
  );

  const pulse = interpolate(
    Math.sin((frame / fps) * 1.5),
    [-1, 1],
    [0.85, 1.15]
  );

  // Generate deterministic floating particles
  const particles = useMemo(() => {
    return Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      x: (i * 47) % 100,
      initialY: (i * 31) % 100,
      size: 2 + (i % 3) * 1.5,
      speed: 0.15 + ((i % 5) * 0.08),
      color: i % 3 === 0 ? PALETTE.primary.gold : PALETTE.primary.red,
      opacity: 0.15 + (i % 4) * 0.1,
    }));
  }, []);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: PALETTE.background.dark,
        overflow: "hidden",
        zIndex: 0,
      }}
    >
      {/* Subtle isometric grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: -100,
          backgroundImage: `
            radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.04) 1px, transparent 0)
          `,
          backgroundSize: "40px 40px",
          transform: `translateY(${((frame * 0.2) % 40)}px)`,
          opacity: 0.7,
        }}
      />

      {/* Primary Red Ambient Orb */}
      <div
        style={{
          position: "absolute",
          left: `${redOrbX}%`,
          top: `${redOrbY}%`,
          width: 800,
          height: 800,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${PALETTE.primary.red} 0%, rgba(185, 28, 28, 0.3) 40%, transparent 70%)`,
          filter: "blur(120px)",
          opacity: 0.28 * glowIntensity * pulse,
          pointerEvents: "none",
        }}
      />

      {/* Primary Gold Ambient Orb */}
      <div
        style={{
          position: "absolute",
          left: `${goldOrbX}%`,
          top: `${goldOrbY}%`,
          width: variant === "goldHeavy" || variant === "finale" ? 950 : 700,
          height: variant === "goldHeavy" || variant === "finale" ? 950 : 700,
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          background: `radial-gradient(circle, ${PALETTE.primary.gold} 0%, rgba(234, 179, 8, 0.35) 45%, transparent 70%)`,
          filter: "blur(130px)",
          opacity: (variant === "goldHeavy" ? 0.38 : 0.22) * glowIntensity * pulse,
          pointerEvents: "none",
        }}
      />

      {/* Cinematic Center Spot / Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(11, 15, 23, 0.75) 85%, #0b0f17 100%)",
          pointerEvents: "none",
        }}
      />

      {/* Drifting Floating Particles */}
      {particles.map((p) => {
        const currentY = (p.initialY - frame * p.speed + 200) % 100;
        return (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: `${p.x}%`,
              top: `${currentY}%`,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              backgroundColor: p.color,
              opacity: p.opacity,
              boxShadow: `0 0 ${p.size * 3}px ${p.color}`,
              pointerEvents: "none",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
