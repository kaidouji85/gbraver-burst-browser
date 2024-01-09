import { batterySystemTutorial } from "./battery-system-tutorial";
import { burstTutorial } from "./burst-tutorial";
import { confrontationTwoBraver } from "./confrontation-two-braver";
import { Episode } from "./episode";
import { nationalTournamentRevenge } from "./national-tournament-revenge";
import { pilotSkillTutorial01 } from "./pilot-skill-tutorial-01";
import { pilotSkillTutorial02 } from "./pilot-skill-tutorial-02";
import { zeroDefenseTutorial } from "./zero-defense";

/** メインエピソード */
export const MainEpisodes: Episode[] = [
  batterySystemTutorial,
  zeroDefenseTutorial,
  burstTutorial,
];

/** サイドエピソード */
export const SideEpisodes: Episode[] = [
  pilotSkillTutorial01,
  pilotSkillTutorial02,
];

/** エピソードを集めたもの */
export const Episodes: Episode[] = [...MainEpisodes, ...SideEpisodes];

/** 開発中のエピソードをあつめたもの */
export const EpisodesInDevelopment: Episode[] = [
  ...Episodes,
  confrontationTwoBraver,
  nationalTournamentRevenge,
];
