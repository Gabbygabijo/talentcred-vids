import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BrowserWindow } from "../components/BrowserWindow";
import { PALETTE } from "../theme";

export const Scene2TheProblem: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for main browser window
  const windowSpring = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  const windowOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Parallax floating offsets for layered windows
  const sheetFloatX = interpolate(
    Math.sin((frame / fps) * 1.5),
    [-1, 1],
    [-8, 8]
  );
  const sheetFloatY = interpolate(
    Math.cos((frame / fps) * 1.2),
    [-1, 1],
    [-10, 10]
  );

  const emailFloatX = interpolate(
    Math.cos((frame / fps) * 1.8),
    [-1, 1],
    [8, -8]
  );
  const emailFloatY = interpolate(
    Math.sin((frame / fps) * 1.4),
    [-1, 1],
    [-8, 8]
  );

  const resumeFloatX = interpolate(
    Math.sin((frame / fps) * 1.2),
    [-1, 1],
    [-6, 6]
  );
  const resumeFloatY = interpolate(
    Math.cos((frame / fps) * 1.6),
    [-1, 1],
    [10, -10]
  );

  // Red translucent overlay spring (pops in at frame 40)
  const overlaySpring = spring({
    frame: frame - 40,
    fps,
    config: { damping: 12, stiffness: 100 },
  });

  // Exit transition (Frames 240 - 260)
  const exitOpacity = interpolate(frame, [240, 260], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const exitScale = interpolate(frame, [240, 260], [1, 0.95], {
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
        opacity: windowOpacity * exitOpacity,
        transform: `scale(${exitScale})`,
      }}
    >
      {/* Scene Header */}
      <div
        style={{
          position: "absolute",
          top: 60,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 12,
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 18px",
            borderRadius: 9999,
            backgroundColor: "rgba(185, 28, 28, 0.15)",
            border: `1px solid ${PALETTE.primary.red}`,
            color: "#fca5a5",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          SCENE 02 • THE INDUSTRY BOTTLENECK
        </div>
        <h2
          style={{
            fontSize: 48,
            fontWeight: 800,
            color: PALETTE.text.primary,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          Chaotic, Fragmented, and Vulnerable to Fraud.
        </h2>
      </div>

      {/* Main Browser Window with Mock Windows Stack */}
      <div
        style={{
          transform: `scale(${windowSpring})`,
          width: 1180,
          height: 640,
          marginTop: 65,
          position: "relative",
        }}
      >
        <BrowserWindow
          url="legacy-recruiting-suite.internal/workflow"
          title="Messy Pipeline"
          width="100%"
          height="100%"
          borderColor="rgba(255, 255, 255, 0.1)"
        >
          {/* Inner Canvas with Stacked Mock Windows */}
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              backgroundColor: "#0d131f",
              overflow: "hidden",
              padding: 30,
            }}
          >
            {/* Background Grid Pattern */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
                opacity: 0.6,
              }}
            />

            {/* MOCK WINDOW 1: Spreadsheets (Left / Top) */}
            <div
              style={{
                position: "absolute",
                left: 60,
                top: 40,
                width: 520,
                borderRadius: 12,
                backgroundColor: "#162032",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.6)",
                transform: `translate(${sheetFloatX}px, ${sheetFloatY}px) rotate(-2deg)`,
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              {/* Spreadsheet mini bar */}
              <div
                style={{
                  height: 32,
                  backgroundColor: "#0f172a",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  color: "#10b981",
                  fontWeight: 700,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <span>📊</span> Candidates_Master_Tracker_Final_v3_copy.xlsx
              </div>
              <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "Sarah Chen", role: "Sr. Backend Dev", status: "Manual Call Pending", color: "#f59e0b" },
                  { name: "Marcus Brody", role: "Staff Architect", status: "Unverified Degree", color: "#ef4444" },
                  { name: "Elena Rostova", role: "Product Designer", status: "Missing References", color: "#ef4444" },
                ].map((row, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "8px 12px",
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                      borderRadius: 6,
                      fontSize: 13,
                    }}
                  >
                    <span style={{ color: "#ffffff", fontWeight: 600 }}>{row.name}</span>
                    <span style={{ color: "#94a3b8" }}>{row.role}</span>
                    <span
                      style={{
                        padding: "3px 8px",
                        borderRadius: 4,
                        fontSize: 11,
                        backgroundColor: `${row.color}22`,
                        color: row.color,
                        fontWeight: 700,
                      }}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* MOCK WINDOW 2: Emails Thread (Right / Mid) */}
            <div
              style={{
                position: "absolute",
                right: 70,
                top: 70,
                width: 480,
                borderRadius: 12,
                backgroundColor: "#1e293b",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.7)",
                transform: `translate(${emailFloatX}px, ${emailFloatY}px) rotate(2.5deg)`,
                overflow: "hidden",
                zIndex: 3,
              }}
            >
              <div
                style={{
                  height: 32,
                  backgroundColor: "#0f172a",
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  fontSize: 12,
                  color: "#38bdf8",
                  fontWeight: 700,
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <span>✉️</span> Inbox (48 unread verification requests)
              </div>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ fontSize: 13, color: "#f8fafc", fontWeight: 600 }}>
                  Re: Background check delay for Engineering Hire #4
                </div>
                <div style={{ fontSize: 12, color: "#94a3b8", lineHeight: 1.4 }}>
                  "We have waited 14 days for university verification... candidate has already accepted another offer."
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    fontSize: 11,
                    color: "#ef4444",
                    fontWeight: 700,
                  }}
                >
                  ⚠️ 2 weeks lost in manual checks
                </div>
              </div>
            </div>

            {/* MOCK WINDOW 3: Static Resumes (Center / Bottom) */}
            <div
              style={{
                position: "absolute",
                left: 320,
                bottom: 30,
                width: 460,
                borderRadius: 12,
                backgroundColor: "#fdfbf7", // Light paper texture
                color: "#0f172a",
                border: "1px solid rgba(0, 0, 0, 0.15)",
                boxShadow: "0 30px 60px rgba(0, 0, 0, 0.8)",
                transform: `translate(${resumeFloatX}px, ${resumeFloatY}px) rotate(-1deg)`,
                overflow: "hidden",
                padding: 16,
                zIndex: 4,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderBottom: "1px solid #e2e8f0",
                  paddingBottom: 8,
                  marginBottom: 10,
                }}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 900, color: "#0f172a" }}>
                    Static_Resume_2024.pdf
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>Unsigned • Self-Reported</div>
                </div>
                <span
                  style={{
                    padding: "3px 8px",
                    borderRadius: 4,
                    fontSize: 11,
                    backgroundColor: "#fee2e2",
                    color: "#b91c1c",
                    fontWeight: 800,
                  }}
                >
                  Unverified
                </span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ height: 8, backgroundColor: "#cbd5e1", borderRadius: 4, width: "90%" }} />
                <div style={{ height: 8, backgroundColor: "#cbd5e1", borderRadius: 4, width: "75%" }} />
                <div style={{ height: 8, backgroundColor: "#e2e8f0", borderRadius: 4, width: "60%" }} />
              </div>
            </div>

            {/* Red Translucent Overlay: #b91c1c with 0.2 opacity */}
            {frame >= 35 && (
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  transform: `scale(${overlaySpring})`,
                  opacity: overlaySpring,
                  backgroundColor: "rgba(185, 28, 28, 0.2)", // User specified: #b91c1c with 0.2 opacity
                  backdropFilter: "blur(6px)",
                  border: `2px solid ${PALETTE.primary.red}`,
                  borderRadius: 12,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 16,
                  zIndex: 20,
                  boxShadow: "inset 0 0 60px rgba(185, 28, 28, 0.4)",
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    backgroundColor: PALETTE.primary.red,
                    color: "#ffffff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 32,
                    fontWeight: 900,
                    boxShadow: "0 0 30px rgba(185, 28, 28, 0.8)",
                  }}
                >
                  ✕
                </div>

                <div
                  style={{
                    fontSize: 54,
                    fontWeight: 900,
                    color: "#ffffff",
                    letterSpacing: "-0.02em",
                    textTransform: "uppercase",
                    textShadow: "0 4px 20px rgba(0,0,0,0.8), 0 0 30px #b91c1c",
                  }}
                >
                  Disconnected Workflows
                </div>

                <div
                  style={{
                    padding: "8px 24px",
                    borderRadius: 9999,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    color: "#fecaca",
                    fontSize: 17,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                  }}
                >
                  Lost hours • Fabricated claims • High friction
                </div>
              </div>
            )}
          </div>
        </BrowserWindow>
      </div>
    </AbsoluteFill>
  );
};
