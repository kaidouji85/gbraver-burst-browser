import { Unsubscribable } from "rxjs";

import { BattleSceneProps } from "../battle-scene-props";
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
 * 戦闘画面に同画面アクションを関連付ける
 * @param props 画面プロパティ
 * @return アンサブスクライバ
 */
function bindBattleActions(props: BattleSceneProps): Unsubscribable {
  return props.view.battleActionNotifier().subscribe((action) => {
    if (action.type === "plusBattery") {
      onPlusBattery(props);
    } else if (action.type === "minusBattery") {
      onMinusBattery(props);
    } else if (action.type === "decideBattery") {
      onDecideBattery(props, action);
    } else if (action.type === "doBurst") {
      onBurst(props, action);
    } else if (action.type === "doPilotSkill") {
      onPilotSkill(props, action);
    } else if (action.type === "toggleTimeScale") {
      onToggleTimeScale(props, action);
    } else if (action.type === "decideBatteryByMiniController") {
      onDecideBatteryByMiniController(props, action);
    } else if (action.type === "doBurstByMiniController") {
      onBurstByMiniController(props);
    } else if (action.type === "doPilotSkillByMiniController") {
      onPilotSkillByMiniController(props);
    }
  })
}

/**
 * 戦闘画面に緊急停止通知を関連付ける
 * @param props 画面プロパティ
 * @return アンサブスクライバ
 */
function bindEmergencyStopIfNeeded(props: BattleSceneProps): Unsubscribable[] {
  if (props.emergencyStop === null) {
    return [];
  }

  return [
    props.emergencyStop.subscribe(() => {
      // TODO 処理を書く
    })
  ];
}

/**
 * 戦闘シーンイにベントリスナーをバインドする
 * @param props 戦闘シーンプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(props: BattleSceneProps): Unsubscribable[] {
  return [
    bindBattleActions(props),
    ...bindEmergencyStopIfNeeded(props),
  ];
}
