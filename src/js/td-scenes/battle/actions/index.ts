import { BattleSimulatorEnd } from "./battle-simulator-end";
import { BattleSimulatorStart } from "./battle-simulator-start";
import { BattleSimulatorStartByIcon } from "./battle-simulator-start-by-icon";
import { DecideBattery } from "./decide-battery";
import { DecideBatteryByMiniController } from "./decide-battery-by-mini-controller";
import { DoBurst } from "./do-burst";
import { DoBurstByMiniController } from "./do-burst-by-mini-controller";
import { DoPilotSkill } from "./do-pilot-skill";
import { DoPilotSkillByMiniController } from "./do-pilot-skill-by-mini-controller";
import { EnemyStatusOpening } from "./enemy-status-opening";
import { MinusBattery } from "./minus-battery";
import { PlayerStatusOpening } from "./player-status-opening";
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
  | PlayerStatusOpening
  | EnemyStatusOpening
  | StatusOpeningByIcon
  | StatusClosing;
