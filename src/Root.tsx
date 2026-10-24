import { Composition } from "remotion";
import { TalentCredLaunchTeaser } from "./TalentCredLaunchTeaser";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TalentCredLaunchTeaser"
        component={TalentCredLaunchTeaser}
        durationInFrames={1130}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
