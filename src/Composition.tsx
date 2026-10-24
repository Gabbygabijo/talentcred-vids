import { Composition } from "remotion";
import { TalentCredLaunchTeaser } from "./TalentCredLaunchTeaser";

export { TalentCredLaunchTeaser };

export const MyComposition = () => {
  return (
    <Composition
      id="TalentCredLaunchTeaser"
      component={TalentCredLaunchTeaser}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
