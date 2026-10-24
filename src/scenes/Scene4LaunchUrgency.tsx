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

export const Scene4LaunchUrgency: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Dimmed background transition
  const dimOpacity = interpolate(frame, [0, 20], [0, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Flier scale up in the background with glow
  const flierScale = interpolate(frame, [0, 180], [1.0, 1.12], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const flierOpacity = interpolate(frame, [0, 25, 160, 180], [0, 0.38, 0.38, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Animated Counter counting down to 26 (from frame 10 to 60)
  // Let's count down from 60 down to 26
  const rawCount = interpolate(frame, [10, 60], [60, 26], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const countNumber = Math.round(rawCount);

  // Counter impact bounce when hitting 26 (at frame 60)
  const hitBounce = spring({
    frame: frame - 60,
    fps,
    config: { damping: 10, stiffness: 120 },
  });

  // Kinetic typography reveal (After count hits 26)
  const textSpring = spring({
    frame: frame - 62,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Shockwave ring at impact
  const shockwave = interpolate(frame, [60, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Pulsing glow for 26 OCTOBER
  const goldPulse = interpolate(
    Math.sin((frame / fps) * 3),
    [-1, 1],
    [0.96, 1.04]
  );

  // Exit transition (Frames 160 - 180)
  const exitOpacity = interpolate(frame, [160, 180], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: PALETTE.fontFamily,
        opacity: exitOpacity,
        textAlign: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Dimming Overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "#000000",
          opacity: dimOpacity,
          zIndex: 1,
        }}
      />

      {/* Background Asset: flier-26-october.png subtly scaling up with glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: `scale(${flierScale})`,
          opacity: flierOpacity,
          filter: `blur(8px) drop-shadow(0 0 60px ${PALETTE.primary.gold})`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      >
        <Img
          src={staticFile("assets/flier-26-october.png")}
          style={{
            height: "125%",
            width: "auto",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Center Spotlight Aura */}
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${PALETTE.primary.gold}44 0%, ${PALETTE.primary.red}33 45%, transparent 70%)`,
          filter: "blur(100px)",
          zIndex: 3,
          pointerEvents: "none",
        }}
      />

      {/* Main Content Layer */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
        }}
      >
        {/* Top Kicker */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "8px 24px",
            borderRadius: 9999,
            backgroundColor: "rgba(185, 28, 28, 0.2)",
            border: `1.5px solid ${PALETTE.primary.red}`,
            color: "#fca5a5",
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            boxShadow: "0 0 20px rgba(185, 28, 28, 0.4)",
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: PALETTE.primary.red,
              boxShadow: `0 0 10px ${PALETTE.primary.red}`,
            }}
          />
          GLOBAL LAUNCH COUNTDOWN
        </div>

        {/* Animated Counter Display */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 4,
          }}
        >
          {/* Shockwave expanding from 26 */}
          {shockwave > 0 && shockwave < 1 && (
            <div
              style={{
                position: "absolute",
                width: shockwave * 700,
                height: shockwave * 700,
                borderRadius: "50%",
                border: `3px solid ${PALETTE.primary.gold}`,
                boxShadow: `0 0 40px ${PALETTE.primary.gold}`,
                opacity: 1 - shockwave,
                pointerEvents: "none",
              }}
            />
          )}

          <div
            style={{
              fontSize: 160,
              fontWeight: 900,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1,
              letterSpacing: "-0.04em",
              color: countNumber === 26 ? PALETTE.primary.gold : "#ffffff",
              textShadow:
                countNumber === 26
                  ? `0 0 50px rgba(234, 179, 8, 0.9), 0 0 100px rgba(234, 179, 8, 0.5), 0 10px 40px rgba(0, 0, 0, 0.9)`
                  : `0 0 30px rgba(255, 255, 255, 0.6), 0 10px 40px rgba(0, 0, 0, 0.9)`,
              transform: `scale(${countNumber === 26 ? 1 + hitBounce * 0.15 : 1})`,
            }}
          >
            {countNumber}
          </div>
        </div>

        {/* Big Bold Kinetic Typography in Gold (#eab308) and Red (#b91c1c) */}
        <div
          style={{
            transform: `scale(${textSpring * goldPulse})`,
            opacity: textSpring,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              textTransform: "uppercase",
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                color: PALETTE.primary.gold,
                textShadow: `0 0 40px rgba(234, 179, 8, 0.6), 0 0 80px rgba(234, 179, 8, 0.3)`,
              }}
            >
              26 OCTOBER
            </span>
            <span style={{ color: "rgba(255, 255, 255, 0.3)" }}>—</span>
            <span
              style={{
                padding: "6px 24px",
                borderRadius: 14,
                backgroundColor: PALETTE.primary.red,
                color: "#ffffff",
                boxShadow: `0 0 50px rgba(185, 28, 28, 0.7)`,
              }}
            >
              NEW ROLES GO LIVE
            </span>
          </div>

          <p
            style={{
              fontSize: 22,
              color: PALETTE.text.secondary,
              margin: 0,
              maxWidth: 720,
              lineHeight: 1.5,
              fontWeight: 600,
            }}
          >
            Top tech organizations unlock instant access to verified engineers, product managers, and leaders.
          </p>
        </div>

        {/* Urgency Badge Row */}
        <div
          style={{
            transform: `translateY(${interpolate(textSpring, [0, 1], [30, 0])}px)`,
            opacity: textSpring,
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginTop: 10,
          }}
        >
          {[
            "🔥 100+ Hiring Partners Ready",
            "⚡ Automatic Candidate Matching",
            "🛡️ 100% Cryptographic Verification",
          ].map((pill, idx) => (
            <div
              key={idx}
              style={{
                padding: "10px 20px",
                borderRadius: 12,
                backgroundColor: "rgba(255, 255, 255, 0.07)",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#f8fafc",
                fontSize: 15,
                fontWeight: 700,
                backdropFilter: "blur(10px)",
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    </AbsoluteFill>
  );
};
