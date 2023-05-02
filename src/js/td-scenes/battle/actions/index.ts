import type { DecideBattery } from "./decide-battery";
import { DecideBatteryByMiniController } from "./decide-battery-by-mini-controller";
import type { DoBurst } from "./do-burst";
import { DoBurstByMiniController } from "./do-burst-by-mini-controller";
import type { DoPilotSkill } from "./do-pilot-skill";
import { DoPilotSkillByMiniController } from "./do-pilot-skill-by-mini-controller";
import type { MinusBattery } from "./minus-battery";
import type { PlusBattery } from "./plus-battery";
import type { StartBattleScene } from "./start-battle-scene";
import type { ToggleTimeScale } from "./toggle-time-scale";

/** 戦闘シーンアクション */
export type BattleSceneAction =
  | StartBattleScene
  | PlusBattery
  | MinusBattery
  | DecideBattery
  | DoBurst
  | DoPilotSkill
  | ToggleTimeScale
  | DecideBatteryByMiniController
  | DoBurstByMiniController
  | DoPilotSkillByMiniController;
