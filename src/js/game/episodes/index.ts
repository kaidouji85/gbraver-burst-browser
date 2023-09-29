import { batterySystemTutorial } from "./battery-system";
import { burstTutorial } from "./burst";
import { Episode } from "./episode";
import { pilotSkillTutorial01 } from "./pilot-skill-01";
import { pilotSkillTutorial02 } from "./pilot-skill-02";
import { zeroDefenseTutorial } from "./zero-defense";

/** チュートリアルステージを集めたもの */
export const TutorialStages: Episode[] = [
  batterySystemTutorial,
  zeroDefenseTutorial,
  burstTutorial,
  pilotSkillTutorial01,
  pilotSkillTutorial02,
];

/** 開発中のチュートリアルのステージをあつめたもの */
export const TutorialStagesInDevelopment: Episode[] = [...TutorialStages];
