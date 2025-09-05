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
import { onPlayerStatusOpening } from "./on-player-status-opening";
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
  switch (action.type) {
    case "plusBattery":
      return onPlusBattery(props);
    case "minusBattery":
      return onMinusBattery(props);
    case "decideBattery":
      return onDecideBattery(props, action);
    case "doBurst":
      return onBurst(props, action);
    case "doPilotSkill":
      return onPilotSkill(props, action);
    case "toggleTimeScale":
      return onToggleTimeScale(props, action);
    case "decideBatteryByMiniController":
      return onDecideBatteryByMiniController(props, action);
    case "doBurstByMiniController":
      return onBurstByMiniController(props);
    case "doPilotSkillByMiniController":
      return onPilotSkillByMiniController(props);
    case "battleSimulatorStart":
      return onBattleSimulatorStart(props);
    case "battleSimulatorEnd":
      return onBattleSimulatorEnd(props);
    case "playerStatusOpening":
      return onPlayerStatusOpening(props);  
  }
}
