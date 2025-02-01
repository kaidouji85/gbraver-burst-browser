import { BattleSceneAction } from "../../actions";
import { BattleSceneProps } from "../../props";
import { onBattleSimulatorEnd } from "./on-battle-simulator-end";
import { onBattleSimulatorStart } from "./on-battle-simulator-start";
import { onBurst } from "./on-burst";
import { onBurstByMiniController } from "./on-burst-by-mini-controller";
import { onDecideBattery } from "./on-decide-battery";
import { onDecideBatteryByMiniController } from "./on-decide-battery-by-minicontroller";
import { onMinusBattery } from "./on-minus-battery";
import { onPilotSkill } from "./on-pilot-skill";
import { onPilotSkillByMiniController } from "./on-pilot-skill-by-mini-controller";
import { onPlusBattery } from "./on-plus-battery";
import { onToggleTimeScale } from "./on-toggle-time-scale";

/**
 * 戦闘シーンアクション発生時の処理
 * @param props 戦闘シーンプロパティ
 * @param action アクション
 */
export function onBattleSceneAction(
  props: BattleSceneProps,
  action: BattleSceneAction,
) {
  if (action.type === "plusBattery") {
    onPlusBattery(props);
  } else if (action.type === "minusBattery") {
    onMinusBattery(props);
  } else if (action.type === "decideBattery") {
    onDecideBattery(props, action);
  } else if (action.type === "doBurst") {
    onBurst(props);
  } else if (action.type === "doPilotSkill") {
    onPilotSkill(props);
  } else if (action.type === "toggleTimeScale") {
    onToggleTimeScale(props, action);
  } else if (action.type === "decideBatteryByMiniController") {
    onDecideBatteryByMiniController(props, action);
  } else if (action.type === "doBurstByMiniController") {
    onBurstByMiniController(props);
  } else if (action.type === "doPilotSkillByMiniController") {
    onPilotSkillByMiniController(props);
  } else if (action.type === "battleSimulatorStart") {
    onBattleSimulatorStart(props);
  } else if (action.type === "battleSimulatorEnd") {
    onBattleSimulatorEnd(props);
  }
}
