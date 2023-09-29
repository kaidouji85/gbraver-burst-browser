import { batterySystemTutorial } from "./battery-system";
import { burstTutorial } from "./burst";
import { Episode } from "./episode";
import { pilotSkillTutorial01 } from "./pilot-skill-01";
import { pilotSkillTutorial02 } from "./pilot-skill-02";
import { zeroDefenseTutorial } from "./zero-defense";

/** チュートリアルエピソードを集めたもの */
export const TutorialEpisodes: Episode[] = [
  batterySystemTutorial,
  zeroDefenseTutorial,
  burstTutorial,
  pilotSkillTutorial01,
  pilotSkillTutorial02,
];

/** 開発中のチュートリアルのエピソードをあつめたもの */
export const TutorialEpisodesInDevelopment: Episode[] = [...TutorialEpisodes];
