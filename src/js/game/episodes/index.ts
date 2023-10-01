import { batterySystemTutorial } from "./battery-system";
import { burstTutorial } from "./burst";
import { Episode } from "./episode";
import { pilotSkillTutorial01 } from "./pilot-skill-01";
import { pilotSkillTutorial02 } from "./pilot-skill-02";
import { zeroDefenseTutorial } from "./zero-defense";

/** メインエピソード */
export const MainEpisodes: Episode[] = [
  batterySystemTutorial,
  zeroDefenseTutorial,
  burstTutorial,
].map((config, index) => ({
  ...config,
  type: "Episode",
  number: index + 1,
}));

/** サイドエピソード */
export const SideEpisodes: Episode[] = [
  pilotSkillTutorial01,
  pilotSkillTutorial02,
].map((config, index) => ({
  ...config,
  type: "Episode",
  number: index + 1,
}));

/** エピソードを集めたもの */

export const Episodes: Episode[] = [...MainEpisodes, ...SideEpisodes];

/** 開発中のエピソードをあつめたもの */
export const EpisodesInDevelopment: Episode[] = [...Episodes];
