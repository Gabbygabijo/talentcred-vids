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
import { CursorPointer } from "../components/CursorPointer";
import { PALETTE } from "../theme";

export const Scene3TheSolution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Entrance spring for browser window (Phase A)
  const enterSpring = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 85 },
  });

  const enterOpacity = interpolate(frame, [0, 18], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Camera zoom into the dashboard
  const cameraZoom = interpolate(frame, [0, 80, 125], [0.95, 1.05, 1.08], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Cursor 1: Glide towards "Claim your public link" banner
  const cursor1X = interpolate(frame, [25, 70, 78], [950, 680, 680], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const cursor1Y = interpolate(frame, [25, 70, 78], [550, 195, 195], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const isClicking1 = frame >= 72 && frame <= 82;
  const ripple1 = interpolate(frame, [72, 95], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Banner button reaction to click
  const bannerClaimed = frame >= 75;
  const claimBounce = spring({
    frame: frame - 75,
    fps,
    config: { damping: 12, stiffness: 120 },
  });

  // Phase B: Transition into Tailored Resumes Switcher (Starts around frame 120)
  const switcherSlide = spring({
    frame: frame - 120,
    fps,
    config: { damping: 14, stiffness: 85 },
  });

  // Role Switcher active state based on frame
  // Frame 120-175: "Software Engineer"
  // Frame 175-235: "Product Manager"
  // Frame 235-290: "Engineering Manager"
  const activeRoleIndex = frame < 175 ? 0 : frame < 235 ? 1 : 2;

  // Cursor 2: Clicking the switcher tabs
  const cursor2X = interpolate(
    frame,
    [140, 175, 182, 215, 235],
    [520, 640, 640, 840, 840],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const cursor2Y = interpolate(
    frame,
    [140, 175, 182, 215, 235],
    [400, 290, 290, 290, 290],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
  const isClicking2 = (frame >= 177 && frame <= 186) || (frame >= 233 && frame <= 242);
  const ripple2 = interpolate(
    frame,
    frame < 200 ? [177, 198] : [233, 254],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Exit transition (Frames 270 - 290)
  const exitOpacity = interpolate(frame, [270, 290], [1, 0], {
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
        opacity: enterOpacity * exitOpacity,
      }}
    >
      {/* Top Header */}
      <div
        style={{
          position: "absolute",
          top: 50,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 10,
          zIndex: 10,
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 20px",
            borderRadius: 9999,
            backgroundColor: "rgba(234, 179, 8, 0.12)",
            border: `1px solid ${PALETTE.primary.gold}`,
            color: PALETTE.primary.gold,
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            boxShadow: "0 0 16px rgba(234, 179, 8, 0.2)",
          }}
        >
          SCENE 03 • THE SOLUTION
        </div>
        <h2
          style={{
            fontSize: 44,
            fontWeight: 800,
            color: PALETTE.text.primary,
            margin: 0,
            letterSpacing: "-0.02em",
          }}
        >
          {frame < 125
            ? "Unified, Verified Talent Infrastructure"
            : "One Verified Identity. Multiple Tailored Resumes."}
        </h2>
      </div>

      {/* Main Container */}
      <div
        style={{
          width: 1220,
          height: 680,
          marginTop: 65,
          position: "relative",
          transform: `scale(${enterSpring})`,
        }}
      >
        {/* PHASE A: Dashboard with "Claim your public link" banner (Frames 0 - 130) */}
        {frame < 135 && (
          <BrowserWindow
            url="app.talentcred.com/dashboard/talent-hub"
            title="Talent Dashboard"
            width="100%"
            height="100%"
            borderColor="rgba(234, 179, 8, 0.3)"
            style={{
              transform: `scale(${cameraZoom})`,
              transition: "transform 0.05s linear",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                backgroundColor: "#0b0f17",
              }}
            >
              {/* Claim Your Public Link High-Impact Top Banner */}
              <div
                style={{
                  position: "absolute",
                  top: 14,
                  left: 20,
                  right: 20,
                  height: 60,
                  borderRadius: 12,
                  background: bannerClaimed
                    ? `linear-gradient(90deg, #065f46 0%, #047857 100%)`
                    : `linear-gradient(90deg, rgba(234, 179, 8, 0.2) 0%, rgba(185, 28, 28, 0.2) 100%)`,
                  border: `1.5px solid ${bannerClaimed ? "#10b981" : PALETTE.primary.gold}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "0 22px",
                  zIndex: 20,
                  boxShadow: `0 8px 24px rgba(0, 0, 0, 0.6), 0 0 20px ${
                    bannerClaimed ? "rgba(16, 185, 129, 0.3)" : "rgba(234, 179, 8, 0.25)"
                  }`,
                  transform: bannerClaimed ? `scale(${interpolate(claimBounce, [0, 1], [0.97, 1])})` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      backgroundColor: bannerClaimed ? "#10b981" : PALETTE.primary.gold,
                      color: "#0b0f17",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 18,
                      fontWeight: 900,
                    }}
                  >
                    {bannerClaimed ? "✓" : "⚡"}
                  </div>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: "#ffffff" }}>
                      {bannerClaimed
                        ? "Public Profile Live at talentcred.com/@alex-morgan"
                        : "Claim your public link & get verified for launch"}
                    </div>
                    <div style={{ fontSize: 12, color: bannerClaimed ? "#a7f3d0" : PALETTE.text.secondary }}>
                      {bannerClaimed
                        ? "Ready for recruiters on October 26th"
                        : "Lock in your custom handle before global access"}
                    </div>
                  </div>
                </div>

                {/* Banner CTA Button */}
                <div
                  style={{
                    padding: "9px 20px",
                    borderRadius: 8,
                    background: bannerClaimed ? "#10b981" : PALETTE.gradients.gold,
                    color: bannerClaimed ? "#ffffff" : "#0b0f17",
                    fontSize: 13,
                    fontWeight: 900,
                    letterSpacing: "0.05em",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
                  }}
                >
                  {bannerClaimed ? "✓ LINK CLAIMED" : "CLAIM LINK NOW"}
                </div>
              </div>

              {/* Underlying Dashboard Screenshot */}
              <div style={{ marginTop: 82, width: "100%", height: "calc(100% - 82px)", overflow: "hidden" }}>
                <Img
                  src={staticFile("assets/talentcred-dashboard.png")}
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "block",
                  }}
                />
              </div>

              {/* Cursor 1 Clicking the Claim Banner */}
              {frame >= 25 && frame <= 115 && (
                <CursorPointer
                  x={cursor1X}
                  y={cursor1Y}
                  isClicking={isClicking1}
                  rippleProgress={ripple1}
                  color={PALETTE.primary.gold}
                  label="Candidate"
                />
              )}
            </div>
          </BrowserWindow>
        )}

        {/* PHASE B: Feature Highlight UI Switcher (Frames 125 - 270) */}
        {frame >= 120 && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              transform: `translateY(${interpolate(switcherSlide, [0, 1], [60, 0])}px)`,
              opacity: switcherSlide,
              zIndex: 30,
            }}
          >
            <BrowserWindow
              url="app.talentcred.com/resumes/tailored-versions"
              title="Resume Switcher"
              width="100%"
              height="100%"
              borderColor="rgba(234, 179, 8, 0.4)"
              glow
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#0d131f",
                  padding: "28px 40px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 24,
                }}
              >
                {/* Switcher Header & Tabs */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: `1px solid ${PALETTE.background.border}`,
                    paddingBottom: 20,
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13, color: PALETTE.primary.gold, fontWeight: 800, letterSpacing: "0.1em" }}>
                      FEATURE HIGHLIGHT
                    </div>
                    <div style={{ fontSize: 24, fontWeight: 900, color: "#ffffff", marginTop: 2 }}>
                      Dynamic Role Switcher
                    </div>
                  </div>

                  {/* 3 Role Toggles */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "#161f30",
                      padding: 6,
                      borderRadius: 14,
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      gap: 8,
                    }}
                  >
                    {[
                      { title: "Software Engineer", icon: "💻" },
                      { title: "Product Manager", icon: "🚀" },
                      { title: "Engineering Manager", icon: "👥" },
                    ].map((tab, idx) => {
                      const isActive = activeRoleIndex === idx;
                      return (
                        <div
                          key={idx}
                          style={{
                            padding: "10px 20px",
                            borderRadius: 10,
                            backgroundColor: isActive ? PALETTE.primary.red : "transparent",
                            color: isActive ? "#ffffff" : PALETTE.text.secondary,
                            fontSize: 14,
                            fontWeight: 800,
                            display: "flex",
                            alignItems: "center",
                            gap: 8,
                            boxShadow: isActive ? "0 4px 15px rgba(185, 28, 28, 0.5)" : "none",
                            transition: "all 0.15s ease",
                          }}
                        >
                          <span>{tab.icon}</span>
                          <span>{tab.title}</span>
                          {isActive && (
                            <span
                              style={{
                                width: 6,
                                height: 6,
                                borderRadius: "50%",
                                backgroundColor: "#ffffff",
                              }}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Role Details Panel */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr",
                    gap: 30,
                    flex: 1,
                  }}
                >
                  {/* Left: Active Role Spec Card */}
                  <div
                    style={{
                      backgroundColor: "#111827",
                      borderRadius: 16,
                      border: "1px solid rgba(255, 255, 255, 0.08)",
                      padding: 24,
                      display: "flex",
                      flexDirection: "column",
                      gap: 16,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.5)",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <div>
                        <div style={{ fontSize: 20, fontWeight: 900, color: "#ffffff" }}>
                          {activeRoleIndex === 0
                            ? "Senior Software Engineer"
                            : activeRoleIndex === 1
                            ? "Staff Product Manager"
                            : "Engineering Manager"}
                        </div>
                        <div style={{ fontSize: 13, color: PALETTE.primary.gold, fontWeight: 700, marginTop: 2 }}>
                          ✓ Cryptographically Verified Credential Hash #4982-A
                        </div>
                      </div>
                      <div
                        style={{
                          padding: "6px 14px",
                          borderRadius: 8,
                          backgroundColor: "rgba(16, 185, 129, 0.15)",
                          color: "#10b981",
                          border: "1px solid #10b981",
                          fontSize: 12,
                          fontWeight: 800,
                        }}
                      >
                        100% VERIFIED
                      </div>
                    </div>

                    <div style={{ fontSize: 13, color: PALETTE.text.secondary, lineHeight: 1.5 }}>
                      {activeRoleIndex === 0
                        ? "Specialized in high-throughput distributed systems, React/TypeScript architecture, and zero-downtime database scaling."
                        : activeRoleIndex === 1
                        ? "Product strategy, roadmap velocity, metrics instrumentation (ARR growth, retention), and user research."
                        : "Team leadership (18 engineers), cross-functional hiring, career ladders, and high-velocity engineering culture."}
                    </div>

                    {/* Skill Tags */}
                    <div>
                      <div style={{ fontSize: 12, color: PALETTE.text.muted, fontWeight: 700, marginBottom: 8 }}>
                        TAILORED RELEVANT SKILLS
                      </div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                        {(activeRoleIndex === 0
                          ? ["React", "TypeScript", "Distributed Systems", "PostgreSQL", "Remotion"]
                          : activeRoleIndex === 1
                          ? ["Product Discovery", "PRDs", "A/B Testing", "GTM Strategy", "User Journey"]
                          : ["Team Building", "Tech Roadmap", "Sprint Execution", "1-on-1s", "System Architecture"]
                        ).map((skill, idx) => (
                          <span
                            key={idx}
                            style={{
                              padding: "6px 12px",
                              borderRadius: 6,
                              backgroundColor: "rgba(255, 255, 255, 0.05)",
                              border: "1px solid rgba(255, 255, 255, 0.1)",
                              color: "#f8fafc",
                              fontSize: 12,
                              fontWeight: 700,
                            }}
                          >
                            ✓ {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right: Real-time Credibility Score Preview (Light Accent Panel #fdfbf7) */}
                  <div
                    style={{
                      backgroundColor: PALETTE.background.panelLight, // #fdfbf7
                      borderRadius: 16,
                      padding: 24,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
                      border: "1px solid rgba(0,0,0,0.1)",
                      color: PALETTE.text.dark,
                    }}
                  >
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: PALETTE.primary.red, textTransform: "uppercase" }}>
                        Instant Recruiter View
                      </div>
                      <div style={{ fontSize: 24, fontWeight: 900, color: "#0f172a", marginTop: 4 }}>
                        Dynamic Trust Score
                      </div>
                      <div style={{ fontSize: 13, color: "#475569", marginTop: 4 }}>
                        Recruiters see the exact verified skills for the role they are hiring for.
                      </div>
                    </div>

                    <div
                      style={{
                        padding: "16px",
                        borderRadius: 12,
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 11, color: "#64748b", fontWeight: 700 }}>ROLE MATCH SCORE</div>
                        <div style={{ fontSize: 32, fontWeight: 900, color: PALETTE.primary.red }}>
                          {activeRoleIndex === 0 ? "98.5%" : activeRoleIndex === 1 ? "96.2%" : "99.1%"}
                        </div>
                      </div>
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: "50%",
                          backgroundColor: PALETTE.primary.gold,
                          color: "#0b0f17",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 24,
                          fontWeight: 900,
                        }}
                      >
                        ★
                      </div>
                    </div>

                    <div style={{ fontSize: 12, color: "#64748b", fontWeight: 600 }}>
                      ⚡ No duplicate accounts needed. All tailored profiles update in real time.
                    </div>
                  </div>
                </div>

                {/* Cursor 2 Clicking the tabs */}
                {frame >= 140 && frame <= 250 && (
                  <CursorPointer
                    x={cursor2X}
                    y={cursor2Y}
                    isClicking={isClicking2}
                    rippleProgress={ripple2}
                    color={PALETTE.primary.red}
                    label="Toggle Role"
                  />
                )}
              </div>
            </BrowserWindow>
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
