import { Episode } from "../episode";
import { batterySystemTutorial } from "./battery-system-tutorial";
import { burstTutorial } from "./burst-tutorial";
import { confrontationTwoBraver } from "./confrontation-two-braver";
import { pilotSkillTutorial01 } from "./pilot-skill-tutorial-01";
import { pilotSkillTutorial02 } from "./pilot-skill-tutorial-02";
import { PrinceOfFallenSun } from "./prince-of-fallen-sun";
import { QueenOfTragedy } from "./queen-of-tragedy";
import { surviveSuperPowerWithGuard } from "./survive-super-power-with-guard";
import { zeroDefenseTutorial } from "./zero-defense";

/** メインエピソード */
export const MainEpisodes: Episode[] = [
  batterySystemTutorial,
  zeroDefenseTutorial,
  burstTutorial,
  pilotSkillTutorial01,
  pilotSkillTutorial02,
  confrontationTwoBraver,
  surviveSuperPowerWithGuard,
];

/** サイドエピソード */
export const SideEpisodes: Episode[] = [QueenOfTragedy, PrinceOfFallenSun];

/** エピソードを集めたもの */
export const Episodes: Episode[] = [...MainEpisodes, ...SideEpisodes];

/** 開発中のエピソードをあつめたもの */
export const EpisodesInDevelopment: Episode[] = [
  ...MainEpisodes,
  ...SideEpisodes,
];
