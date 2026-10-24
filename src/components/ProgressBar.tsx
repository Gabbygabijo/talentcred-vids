import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { PALETTE } from "../theme";

const CHAPTERS = [
  { label: "OVERVIEW", start: 0, end: 180 },
  { label: "THE PROBLEM", start: 180, end: 440 },
  { label: "THE SOLUTION", start: 440, end: 730 },
  { label: "26 OCTOBER", start: 730, end: 910 },
  { label: "GET READY", start: 910, end: 1130 },
];

export const ProgressBar: React.FC = () => {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  // Progress clamped between 0 and 1
  const progress = Math.min(1, Math.max(0, frame / durationInFrames));

  // Current time calculation
  const seconds = Math.floor(frame / fps);
  const milliseconds = Math.floor(((frame % fps) / fps) * 100);
  const timeFormatted = `00:${seconds.toString().padStart(2, "0")}:${milliseconds
    .toString()
    .padStart(2, "0")}`;

  // Hide progress bar during final fadeout to black
  if (frame >= 1105) {
    return null;
  }

  return (
    <div
      style={{
        position: "absolute",
        bottom: 28,
        left: 64,
        right: 64,
        display: "flex",
        flexDirection: "column",
        gap: 10,
        zIndex: 50,
        pointerEvents: "none",
        fontFamily: PALETTE.fontFamily,
      }}
    >
      {/* Top row: Chapter pills & live timecode */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 12,
          fontWeight: 800,
          letterSpacing: "0.1em",
        }}
      >
        <div style={{ display: "flex", gap: 18 }}>
          {CHAPTERS.map((ch, idx) => {
            const isActive = frame >= ch.start && frame < ch.end;
            const isCompleted = frame >= ch.end;

            return (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: isActive
                    ? PALETTE.primary.gold
                    : isCompleted
                    ? PALETTE.text.secondary
                    : "rgba(148, 163, 184, 0.4)",
                  transition: "color 0.2s ease",
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: isActive
                      ? PALETTE.primary.gold
                      : isCompleted
                      ? PALETTE.primary.red
                      : "rgba(148, 163, 184, 0.3)",
                    boxShadow: isActive
                      ? `0 0 8px ${PALETTE.primary.gold}`
                      : "none",
                  }}
                />
                <span>{ch.label}</span>
              </div>
            );
          })}
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            color: PALETTE.text.secondary,
            fontVariantNumeric: "tabular-nums",
          }}
        >
          <span
            style={{
              padding: "3px 8px",
              borderRadius: 6,
              background: "rgba(185, 28, 28, 0.15)",
              border: `1px solid rgba(185, 28, 28, 0.4)`,
              color: "#fca5a5",
              fontSize: 10,
              letterSpacing: "0.15em",
            }}
          >
            TALENTCRED LAUNCH
          </span>
          <span style={{ color: PALETTE.text.primary }}>{timeFormatted}</span>
          <span style={{ opacity: 0.4 }}>/ 00:30:00</span>
        </div>
      </div>

      {/* Progress track */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 3,
          backgroundColor: "rgba(255, 255, 255, 0.08)",
          borderRadius: 9999,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: `${progress * 100}%`,
            background: `linear-gradient(90deg, ${PALETTE.primary.red} 0%, ${PALETTE.primary.gold} 100%)`,
            boxShadow: `0 0 10px ${PALETTE.primary.gold}`,
          }}
        />
      </div>
    </div>
  );
};
