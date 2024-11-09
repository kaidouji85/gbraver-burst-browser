import { BattleSimulatorEnd } from "./battle-simulator-end";
import { BattleSimulatorStart } from "./battle-simulator-start";
import { DecideBattery } from "./decide-battery";
import { DecideBatteryByMiniController } from "./decide-battery-by-mini-controller";
import { DoBurst } from "./do-burst";
import { DoBurstByMiniController } from "./do-burst-by-mini-controller";
import { DoPilotSkill } from "./do-pilot-skill";
import { DoPilotSkillByMiniController } from "./do-pilot-skill-by-mini-controller";
import { ForceEndBattle } from "./force-end-battle";
import { ForceRetry } from "./force-retry";
import { MinusBattery } from "./minus-battery";
import { PlusBattery } from "./plus-battery";
import { StartBattleScene } from "./start-battle-scene";
import { ToggleTimeScale } from "./toggle-time-scale";

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
  | DoPilotSkillByMiniController
  | BattleSimulatorStart
  | BattleSimulatorEnd
  | ForceEndBattle
  | ForceRetry;
