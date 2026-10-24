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
import { BrowserWindow } from "../components/BrowserWindow";
import { PALETTE } from "../theme";

export const Scene5CallToAction: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for logo & preview card
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const enterOpacity = interpolate(frame, [0, 16], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Scale down login screen card into centered preview card
  const cardScale = interpolate(enterSpring, [0, 1], [1.25, 1.0]);

  // Text overlay spring
  const textSpring = spring({
    frame: frame - 18,
    fps,
    config: { damping: 12, stiffness: 95 },
  });

  // Gold Button spring
  const buttonSpring = spring({
    frame: frame - 35,
    fps,
    config: { damping: 11, stiffness: 100 },
  });

  // Tagline spring
  const taglineSpring = spring({
    frame: frame - 50,
    fps,
    config: { damping: 14, stiffness: 90 },
  });

  // Looping button pulse & shimmer
  const buttonPulse = interpolate(
    Math.sin((frame / fps) * 2.5),
    [-1, 1],
    [0.98, 1.02]
  );
  const shimmerTranslate = interpolate((frame * 4) % 150, [0, 150], [-150, 250]);

  // Fade out to black at the end of the scene (local frame 195 to 220)
  const fadeToBlack = interpolate(frame, [195, 220], [0, 1], {
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
        opacity: enterOpacity,
        textAlign: "center",
        backgroundColor: PALETTE.background.dark,
        overflow: "hidden",
      }}
    >
      {/* Ambient Red & Gold Halo */}
      <div
        style={{
          position: "absolute",
          width: 850,
          height: 850,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${PALETTE.primary.gold}33 0%, ${PALETTE.primary.red}25 50%, transparent 70%)`,
          filter: "blur(100px)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          maxWidth: 1300,
        }}
      >
        {/* Top Centered Header: High-Res Logo */}
        <div
          style={{
            transform: `scale(${enterSpring})`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Img
            src={staticFile("assets/talentcred-t-logo.png")}
            style={{
              height: 95,
              objectFit: "contain",
              filter: "drop-shadow(0 15px 30px rgba(0, 0, 0, 0.8))",
            }}
          />
        </div>

        {/* Text Overlay: "Claim Your Profile & Get Ready" */}
        <div
          style={{
            transform: `scale(${textSpring})`,
            opacity: textSpring,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          <h1
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: PALETTE.text.primary,
              margin: 0,
              letterSpacing: "-0.03em",
              lineHeight: 1.15,
            }}
          >
            Claim Your Profile & Get Ready.
          </h1>
          <div
            style={{
              fontSize: 18,
              color: PALETTE.primary.gold,
              fontWeight: 800,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            ★ GO-LIVE OCTOBER 26TH ★
          </div>
        </div>

        {/* Centered Preview Card: login_screen.png scales down */}
        <div
          style={{
            transform: `scale(${cardScale})`,
            width: 760,
            height: 330,
            borderRadius: 18,
            overflow: "hidden",
            boxShadow: `0 25px 60px rgba(0, 0, 0, 0.9), 0 0 0 1px ${PALETTE.background.border}, 0 0 35px rgba(234, 179, 8, 0.25)`,
            backgroundColor: PALETTE.background.surface,
            position: "relative",
          }}
        >
          <BrowserWindow
            url="talentcredha.com/auth/login"
            title="Claim Your Profile"
            width="100%"
            height="100%"
            borderColor="rgba(234, 179, 8, 0.3)"
          >
            <div
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
                position: "relative",
              }}
            >
              <Img
                src={staticFile("assets/signin-screenshot.png")}
                style={{
                  width: "100%",
                  height: "auto",
                  display: "block",
                  transform: "scale(1.02)",
                }}
              />
            </div>
          </BrowserWindow>
        </div>

        {/* URL Banner: Gold Button with URL text "www.talentcredha.com" */}
        <div
          style={{
            transform: `scale(${buttonSpring * buttonPulse})`,
            opacity: buttonSpring,
            position: "relative",
            overflow: "hidden",
            display: "inline-flex",
            alignItems: "center",
            gap: 14,
            padding: "18px 46px",
            borderRadius: 16,
            background: PALETTE.gradients.gold,
            color: "#0b0f17",
            boxShadow: `0 15px 40px rgba(234, 179, 8, 0.45)`,
            border: "2px solid #fef08a",
            marginTop: 4,
          }}
        >
          <span style={{ fontSize: 24 }}>🚀</span>
          <span
            style={{
              fontSize: 26,
              fontWeight: 900,
              letterSpacing: "0.02em",
              textTransform: "lowercase",
            }}
          >
            www.talentcredha.com
          </span>
          <span style={{ fontSize: 26, fontWeight: 900 }}>→</span>

          {/* Shimmer sweep animation */}
          <div
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: `${shimmerTranslate}%`,
              width: 50,
              background:
                "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent)",
              transform: "skewX(-25deg)",
              pointerEvents: "none",
            }}
          />
        </div>

        {/* Tagline: "Talents find jobs. Organizations post them." */}
        <div
          style={{
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [15, 0])}px)`,
            opacity: taglineSpring,
            fontSize: 22,
            fontWeight: 800,
            color: PALETTE.text.secondary,
            letterSpacing: "-0.01em",
          }}
        >
          <span style={{ color: "#ffffff" }}>Talents find jobs.</span>{" "}
          <span style={{ color: PALETTE.primary.gold }}>Organizations post them.</span>
        </div>
      </div>

      {/* Fade out to black on frame 885 (local frame 134 to 150) */}
      {fadeToBlack > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#000000",
            opacity: fadeToBlack,
            zIndex: 100,
            pointerEvents: "none",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
