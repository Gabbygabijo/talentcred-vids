import React from "react";
import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { AudioLayer } from "./components/AudioLayer";
import { Background } from "./components/Background";
import { FontLoader } from "./components/FontLoader";
import { ProgressBar } from "./components/ProgressBar";
import { Scene1Intro } from "./scenes/Scene1Intro";
import { Scene2TheProblem } from "./scenes/Scene2TheProblem";
import { Scene3TheSolution } from "./scenes/Scene3TheSolution";
import { Scene4LaunchUrgency } from "./scenes/Scene4LaunchUrgency";
import { Scene5CallToAction } from "./scenes/Scene5CallToAction";
import { PALETTE } from "./theme";

export const TalentCredLaunchTeaser: React.FC = () => {
  const frame = useCurrentFrame();

  // Dynamic atmospheric mood based on active narrative beat
  const backgroundVariant =
    frame < 180
      ? "intro"
      : frame >= 730 && frame < 910
      ? "goldHeavy"
      : frame >= 910
      ? "finale"
      : "default";

  // Transition Flash Effect at scene cut boundaries (Frames 180, 440, 730, 910)
  const flashOpacity = Math.max(
    interpolate(frame, [178, 180, 184], [0, 0.4, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(frame, [438, 440, 445], [0, 0.45, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(frame, [728, 730, 735], [0, 0.5, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(frame, [908, 910, 915], [0, 0.55, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  return (
    <AbsoluteFill
      style={{
        backgroundColor: PALETTE.background.dark,
        overflow: "hidden",
        translate: "-4px 0px"
      }}
    >
      <FontLoader />

      {/* Atmospheric Canvas Layer */}
      <Background variant={backgroundVariant} />

      {/* SCENE 01: The Hook & Brand Teaser (Frames 0 - 180 | 0s - 6s) */}
      <Sequence
        durationInFrames={180}
        style={{
          translate: "-1px 0px"
        }}
      >
        <Scene1Intro />
      </Sequence>

      {/* SCENE 02: The Problem - Disconnected Workflows (Frames 180 - 440 | 6s - 14.67s) */}
      <Sequence from={180} durationInFrames={260}>
        <Scene2TheProblem />
      </Sequence>

      {/* SCENE 03: The Solution - Dashboard & Multiple Resumes (Frames 440 - 730 | 14.67s - 24.33s) */}
      <Sequence from={440} durationInFrames={290}>
        <Scene3TheSolution />
      </Sequence>

      {/* SCENE 04: Launch Urgency - 26 October Countdown (Frames 730 - 910 | 24.33s - 30.33s) */}
      <Sequence from={730} durationInFrames={180}>
        <Scene4LaunchUrgency />
      </Sequence>

      {/* SCENE 05: Call to Action - Preview & Link (Frames 910 - 1130 | 30.33s - 37.67s) */}
      <Sequence from={910} durationInFrames={220}>
        <Scene5CallToAction />
      </Sequence>

      {/* Cinematic Flash Transition */}
      {flashOpacity > 0 && (
        <AbsoluteFill
          style={{
            backgroundColor: "#ffffff",
            opacity: flashOpacity,
            mixBlendMode: "overlay",
            pointerEvents: "none",
            zIndex: 40,
          }}
        />
      )}

      {/* Audio Layer: Voiceover and Synchronized SFX */}
      <AudioLayer />

      {/* Bottom Timeline Indicator */}
      <ProgressBar />
    </AbsoluteFill>
  );
};
