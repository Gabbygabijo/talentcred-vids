import React from "react";
import { PALETTE } from "../theme";

interface CursorPointerProps {
  x: number | string;
  y: number | string;
  scale?: number;
  isClicking?: boolean;
  rippleProgress?: number; // 0 to 1
  label?: string;
  color?: string;
}

export const CursorPointer: React.FC<CursorPointerProps> = ({
  x,
  y,
  scale = 1,
  isClicking = false,
  rippleProgress = 0,
  label,
  color = PALETTE.primary.red,
}) => {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        transform: `translate(-2px, -2px) scale(${isClicking ? scale * 0.82 : scale})`,
        pointerEvents: "none",
        zIndex: 100,
        transition: "transform 0.08s ease",
      }}
    >
      {/* Ripple wave on click */}
      {rippleProgress > 0 && rippleProgress < 1 && (
        <div
          style={{
            position: "absolute",
            top: 2,
            left: 2,
            transform: "translate(-50%, -50%)",
            width: rippleProgress * 80,
            height: rippleProgress * 80,
            borderRadius: "50%",
            border: `2px solid ${color}`,
            backgroundColor: `${color}33`,
            opacity: 1 - rippleProgress,
            pointerEvents: "none",
          }}
        />
      )}

      {/* SVG Mouse Pointer */}
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          filter: "drop-shadow(0 4px 10px rgba(0, 0, 0, 0.6))",
        }}
      >
        <path
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z"
          fill="#ffffff"
          stroke={color}
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
      </svg>

      {/* Optional Label Badge (e.g. "Candidate" or "Recruiter") */}
      {label && (
        <div
          style={{
            position: "absolute",
            left: 20,
            top: 18,
            backgroundColor: color,
            color: "#ffffff",
            padding: "2px 8px",
            borderRadius: 4,
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.05em",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
};
