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
  number: index + 1
}));

/** サイドエピソード */
export const SideEpisodes: Episode[] = [
  pilotSkillTutorial01,
  pilotSkillTutorial02,
].map((config, index) => ({
  ...config,
  type: "Episode",
  number: index + 1
}));

/** @deprecated チュートリアルエピソードを集めたもの */

export const TutorialEpisodes: Episode[] = [
  ...MainEpisodes,
  ...SideEpisodes,
];

/** @deprecated 開発中のチュートリアルのエピソードをあつめたもの */
export const TutorialEpisodesInDevelopment: Episode[] = [...TutorialEpisodes];
