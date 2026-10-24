import React from "react";
import { PALETTE } from "../theme";

interface BrowserWindowProps {
  url?: string;
  title?: string;
  width?: number | string;
  height?: number | string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  borderColor?: string;
  glow?: boolean;
}

export const BrowserWindow: React.FC<BrowserWindowProps> = ({
  url = "talentcred.com",
  title,
  width = "100%",
  height = "100%",
  children,
  style,
  borderColor = PALETTE.background.border,
  glow = true,
}) => {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: 16,
        overflow: "hidden",
        backgroundColor: PALETTE.background.surface,
        border: `1px solid ${borderColor}`,
        boxShadow: glow
          ? `0 25px 70px -10px rgba(0, 0, 0, 0.85), 0 0 40px rgba(0, 0, 0, 0.5)`
          : `0 20px 50px rgba(0, 0, 0, 0.6)`,
        display: "flex",
        flexDirection: "column",
        ...style,
      }}
    >
      {/* Chrome Window Header */}
      <div
        style={{
          height: 38,
          backgroundColor: "#111827",
          borderBottom: `1px solid ${borderColor}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 14px",
          gap: 12,
          flexShrink: 0,
          userSelect: "none",
        }}
      >
        {/* macOS Traffic Lights */}
        <div style={{ display: "flex", alignItems: "center", gap: 7, width: 60 }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#ef4444" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#f59e0b" }} />
          <div style={{ width: 10, height: 10, borderRadius: "50%", backgroundColor: "#10b981" }} />
        </div>

        {/* URL Pill Bar */}
        <div
          style={{
            flex: 1,
            maxWidth: 480,
            height: 24,
            borderRadius: 6,
            backgroundColor: "#1e293b",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
            fontSize: 11,
            color: PALETTE.text.secondary,
            fontFamily: "monospace",
            padding: "0 10px",
          }}
        >
          <span style={{ color: "#10b981", fontSize: 10 }}>🔒</span>
          <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {url}
          </span>
        </div>

        {/* Window Title or Empty Balance */}
        <div
          style={{
            width: 60,
            textAlign: "right",
            fontSize: 11,
            color: PALETTE.text.muted,
          }}
        >
          {title}
        </div>
      </div>

      {/* Window Body */}
      <div
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
        }}
      >
        {children}
      </div>
    </div>
  );
};
