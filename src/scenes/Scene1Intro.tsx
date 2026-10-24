import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { PALETTE } from "../theme";

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: Hook Text Animation (Frames 0 - 65)
  const hookSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 110 },
  });

  const hookOpacity = interpolate(frame, [0, 15, 50, 62], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const hookTranslateY = interpolate(hookSpring, [0, 1], [30, 0]);

  // Phase 2: Logo and Hero Reveal (Starts at Frame 55)
  const logoSpring = spring({
    frame: frame - 55,
    fps,
    config: { damping: 12, stiffness: 90 },
  });

  const logoScale = interpolate(logoSpring, [0, 1], [0.75, 1]);
  const logoOpacity = interpolate(frame, [55, 68], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Tagline reveal (Starts at Frame 75)
  const taglineSpring = spring({
    frame: frame - 75,
    fps,
    config: { damping: 14, stiffness: 95 },
  });
  const taglineOpacity = interpolate(taglineSpring, [0, 1], [0, 1]);
  const tagpageY = interpolate(taglineSpring, [0, 1], [20, 0]);

  // Badge reveal (Starts at Frame 85)
  const badgeSpring = spring({
    frame: frame - 85,
    fps,
    config: { damping: 15, stiffness: 110 },
  });

  // Scene transition out (Frames 135 - 151)
  const exitOpacity = interpolate(frame, [135, 150], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [135, 150], [1, 1.04], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Shimmer effect
  const shimmerTranslate = interpolate(frame, [70, 120], [-150, 250], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: PALETTE.fontFamily,
        opacity: exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* PHASE 1: Hook Title */}
      {frame < 65 && (
        <div
          style={{
            position: "absolute",
            textAlign: "center",
            opacity: hookOpacity,
            transform: `translateY(${hookTranslateY}px)`,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 9999,
              background: "rgba(185, 28, 28, 0.15)",
              border: `1px solid ${PALETTE.primary.red}`,
              color: "#fca5a5",
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            The Problem With Hiring Today
          </div>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: PALETTE.text.primary,
              margin: 0,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
              maxWidth: 900,
            }}
          >
            Hiring process Is Broken.
            <br />
            <span
              style={{
                background: `linear-gradient(90deg, ${PALETTE.primary.red} 0%, ${PALETTE.primary.gold} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              We Just Fixed It.
            </span>
          </h1>
        </div>
      )}

      {/* PHASE 2: Brand Logo & Mission */}
      {frame >= 55 && (
        <div
          style={{
            opacity: logoOpacity,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 26,
            textAlign: "center",
          }}
        >
          {/* Badge over logo */}
          <div
            style={{
              transform: `scale(${badgeSpring})`,
              opacity: badgeSpring,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              padding: "8px 24px",
              borderRadius: 9999,
              background: "rgba(234, 179, 8, 0.12)",
              border: `1px solid ${PALETTE.primary.gold}`,
              color: PALETTE.primary.gold,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              boxShadow: "0 0 20px rgba(234, 179, 8, 0.2)",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: PALETTE.primary.gold,
                boxShadow: `0 0 10px ${PALETTE.primary.gold}`,
              }}
            />
            Next-Gen Credential Infrastructure
          </div>

          {/* Main Logo Container with glow */}
          <div
            style={{
              position: "relative",
              transform: `scale(${logoScale})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                position: "absolute",
                width: "120%",
                height: "120%",
                background: `radial-gradient(circle, ${PALETTE.primary.red}40 0%, transparent 70%)`,
                filter: "blur(40px)",
                zIndex: -1,
              }}
            />

            <Img
              src={staticFile("assets/talentcred-t-logo.png")}
              style={{
                height: 120,
                objectFit: "contain",
                filter: "drop-shadow(0 15px 35px rgba(0,0,0,0.7))",
              }}
            />

            {/* Shimmer sweep effect */}
            <div
              style={{
                position: "absolute",
                top: 0,
                bottom: 0,
                left: `${shimmerTranslate}%`,
                width: 60,
                background:
                  "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent)",
                transform: "skewX(-25deg)",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Subtitle & Tagline */}
          <div
            style={{
              opacity: taglineOpacity,
              transform: `translateY(${tagpageY}px)`,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 12,
            }}
          >
            <h2
              style={{
                fontSize: 34,
                fontWeight: 700,
                color: PALETTE.text.primary,
                letterSpacing: "-0.01em",
                margin: 0,
              }}
            >
              Verified Talent. Instant Credibility. Unrivaled Trust.
            </h2>
            <p
              style={{
                fontSize: 20,
                color: PALETTE.text.secondary,
                margin: 0,
                maxWidth: 680,
                lineHeight: 1.5,
              }}
            >
              The cryptographic proof of ability for modern professionals and
              fast-growing companies.
            </p>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
