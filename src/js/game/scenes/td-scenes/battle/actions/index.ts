import { BatteryNumberPushed } from "./battery-number-pushed";
import { BattleSimulatorEnd } from "./battle-simulator-end";
import { BattleSimulatorStart } from "./battle-simulator-start";
import { BattleSimulatorStartByIcon } from "./battle-simulator-start-by-icon";
import { DecideBattery } from "./decide-battery";
import { DecideBatteryByMiniController } from "./decide-battery-by-mini-controller";
import { DoBurst } from "./do-burst";
import { DoBurstByMiniController } from "./do-burst-by-mini-controller";
import { DoPilotSkill } from "./do-pilot-skill";
import { DoPilotSkillByMiniController } from "./do-pilot-skill-by-mini-controller";
import { MinusBattery } from "./minus-battery";
import { PlusBattery } from "./plus-battery";
import { StartBattleScene } from "./start-battle-scene";
import { StatusClosing } from "./status-closing";
import { StatusOpeningByIcon } from "./status-opening-by-icon";
import { ToggleTimeScale } from "./toggle-time-scale";

/** 戦闘シーンアクション */
export type BattleSceneAction =
  | StartBattleScene
  | PlusBattery
  | MinusBattery
  | BatteryNumberPushed
  | DecideBattery
  | DoBurst
  | DoPilotSkill
  | ToggleTimeScale
  | DecideBatteryByMiniController
  | DoBurstByMiniController
  | DoPilotSkillByMiniController
  | BattleSimulatorStart
  | BattleSimulatorStartByIcon
  | BattleSimulatorEnd
  | StatusOpeningByIcon
  | StatusClosing;
