import { batterySystemTutorial } from "./battery-system";
import { burstTutorial } from "./burst";
import { pilotSkillTutorial01 } from "./pilot-skill-01";
import { pilotSkillTutorial02 } from "./pilot-skill-02";
import { TutorialStage } from "./tutorial-stage";
import { zeroDefenseTutorial } from "./zero-defense";

/** チュートリアルステージを集めたもの */
export const TutorialStages: TutorialStage[] = [
  batterySystemTutorial,
  zeroDefenseTutorial,
  burstTutorial,
];

/** 開発中のチュートリアルのステージをあつめたもの */
export const TutorialStagesInDevelopment: TutorialStage[] = [
  ...TutorialStages,
  pilotSkillTutorial01,
  pilotSkillTutorial02,
];
