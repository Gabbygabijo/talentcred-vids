import React from "react";
import { Audio, Sequence, staticFile } from "remotion";

interface AudioLayerProps {
  enableVoiceover?: boolean;
  enableSfx?: boolean;
  voiceVolume?: number;
  sfxVolume?: number;
  voiceExtension?: "wav" | "mp3";
}

export const AudioLayer: React.FC<AudioLayerProps> = ({
  enableVoiceover = true,
  enableSfx = true,
  voiceVolume = 1.0,
  sfxVolume = 0.8,
  voiceExtension = "wav",
}) => {
  return (
    <>
      {/* ============================================================ */}
      {/* 1. SCENE VOICEOVERS (Drop new audio in public/voicehover/)   */}
      {/* ============================================================ */}
      {enableVoiceover && (
        <>
          {/* Scene 1: "Hiring process is broken. We just fixed it..." (Audio: 154 frames) */}
          <Sequence from={10} durationInFrames={160}>
            <Audio
              src={staticFile(`voicehover/scene1.${voiceExtension}`)}
              volume={voiceVolume}
            />
          </Sequence>

          {/* Scene 2: "Fragmented resumes, unverified claims..." (Audio: 232 frames) */}
          <Sequence from={190} durationInFrames={240}>
            <Audio
              src={staticFile(`voicehover/scene2.${voiceExtension}`)}
              volume={voiceVolume}
            />
          </Sequence>

          {/* Scene 3: "Meet TalentCred. One unified dashboard..." (Audio: 258 frames) */}
          <Sequence from={450} durationInFrames={270}>
            <Audio
              src={staticFile(`voicehover/scene3.${voiceExtension}`)}
              volume={voiceVolume}
            />
          </Sequence>

          {/* Scene 4: "The countdown has officially begun..." (Audio: 147 frames) */}
          <Sequence from={740} durationInFrames={160}>
            <Audio
              src={staticFile(`voicehover/scene4.${voiceExtension}`)}
              volume={voiceVolume}
            />
          </Sequence>

          {/* Scene 5: "Claim your verified credential profile today..." (Audio: 183 frames) */}
          <Sequence from={920} durationInFrames={200}>
            <Audio
              src={staticFile(`voicehover/scene5.${voiceExtension}`)}
              volume={voiceVolume}
            />
          </Sequence>
        </>
      )}

      {/* ============================================================ */}
      {/* 2. SYNCHRONIZED CINEMATIC SOUND EFFECTS (SFX)                */}
      {/* ============================================================ */}
      {enableSfx && (
        <>
          {/* SCENE 1 SFX (0 - 180) */}
          {/* Opening ambient swoosh */}
          <Sequence durationInFrames={25}>
            <Audio
              src={staticFile("sfx/whoosh.wav")}
              volume={0.35 * sfxVolume}
            />
          </Sequence>

          {/* "We Just Fixed It" / Logo Reveal Sub Impact */}
          <Sequence from={55} durationInFrames={50}>
            <Audio
              src={staticFile("sfx/impact.wav")}
              volume={0.75 * sfxVolume}
            />
          </Sequence>

          {/* Credential Badge shimmer chime */}
          <Sequence from={75} durationInFrames={40}>
            <Audio
              src={staticFile("sfx/chime.wav")}
              volume={0.4 * sfxVolume}
            />
          </Sequence>

          {/* SCENE 2 SFX (180 - 440) */}
          {/* Transition into problem scene */}
          <Sequence from={180} durationInFrames={25}>
            <Audio
              src={staticFile("sfx/whoosh.wav")}
              volume={0.35 * sfxVolume}
            />
          </Sequence>

          {/* SCENE 3 SFX (440 - 730) */}
          {/* Transition into dashboard */}
          <Sequence from={440} durationInFrames={25}>
            <Audio
              src={staticFile("sfx/whoosh.wav")}
              volume={0.4 * sfxVolume}
            />
          </Sequence>

          {/* Cursor clicks "Claim your public link" (frame 440 + 75 = 515) */}
          <Sequence from={515} durationInFrames={15}>
            <Audio
              src={staticFile("sfx/click.wav")}
              volume={0.7 * sfxVolume}
            />
          </Sequence>
          <Sequence from={516} durationInFrames={40}>
            <Audio
              src={staticFile("sfx/chime.wav")}
              volume={0.5 * sfxVolume}
            />
          </Sequence>

          {/* Switcher Tab Click 1: Product Manager (frame 440 + 175 = 615) */}
          <Sequence from={615} durationInFrames={15}>
            <Audio
              src={staticFile("sfx/click.wav")}
              volume={0.5 * sfxVolume}
            />
          </Sequence>

          {/* Switcher Tab Click 2: Engineering Manager (frame 440 + 233 = 673) */}
          <Sequence from={673} durationInFrames={15}>
            <Audio
              src={staticFile("sfx/click.wav")}
              volume={0.5 * sfxVolume}
            />
          </Sequence>

          {/* SCENE 4 SFX (730 - 910) */}
          {/* Tension Riser leading into countdown */}
          <Sequence from={730} durationInFrames={60}>
            <Audio
              src={staticFile("sfx/riser.wav")}
              volume={0.55 * sfxVolume}
            />
          </Sequence>

          {/* Rapid countdown ticks */}
          <Sequence from={745} durationInFrames={8}>
            <Audio src={staticFile("sfx/tick.wav")} volume={0.35 * sfxVolume} />
          </Sequence>
          <Sequence from={755} durationInFrames={8}>
            <Audio src={staticFile("sfx/tick.wav")} volume={0.4 * sfxVolume} />
          </Sequence>
          <Sequence from={765} durationInFrames={8}>
            <Audio src={staticFile("sfx/tick.wav")} volume={0.45 * sfxVolume} />
          </Sequence>
          <Sequence from={775} durationInFrames={8}>
            <Audio src={staticFile("sfx/tick.wav")} volume={0.5 * sfxVolume} />
          </Sequence>
          <Sequence from={785} durationInFrames={8}>
            <Audio src={staticFile("sfx/tick.wav")} volume={0.55 * sfxVolume} />
          </Sequence>

          {/* 26 OCTOBER Impact Hit & Shockwave (frame 730 + 60 = 790) */}
          <Sequence from={790} durationInFrames={65}>
            <Audio
              src={staticFile("sfx/impact.wav")}
              volume={0.9 * sfxVolume}
            />
          </Sequence>

          {/* SCENE 5 SFX (910 - 1130) */}
          {/* Transition to CTA */}
          <Sequence from={910} durationInFrames={25}>
            <Audio
              src={staticFile("sfx/whoosh.wav")}
              volume={0.35 * sfxVolume}
            />
          </Sequence>

          {/* CTA Card Shimmer */}
          <Sequence from={955} durationInFrames={45}>
            <Audio
              src={staticFile("sfx/chime.wav")}
              volume={0.45 * sfxVolume}
            />
          </Sequence>
        </>
      )}
    </>
  );
};
