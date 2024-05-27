import { Subject, Unsubscribable } from "rxjs";

import { BattleSceneAction } from "../../../../actions";
import { HUDGameObjectsProps } from "../props";

/**
 * イベントをバインドする
 * @param props プロパティ
 * @param battleAction 戦闘シーンアクション通知
 * @returns アンサブスクライバ
 */
export function bindEventListener(
  props: HUDGameObjectsProps,
  battleAction: Subject<BattleSceneAction>,
): Unsubscribable[] {
  const { batterySelector, burstButton, pilotButton, timeScaleButton } = props;
  return [
    batterySelector.notifyBatteryPlus().subscribe(() => {
      battleAction.next({
        type: "plusBattery",
      });
    }),
    batterySelector.notifyBatteryMinus().subscribe(() => {
      battleAction.next({
        type: "minusBattery",
      });
    }),
    batterySelector.notifyDecision().subscribe((event) => {
      battleAction.next({
        type: "decideBattery",
        battery: batterySelector.getBattery(),
        event,
      });
    }),
    burstButton.notifyPressed().subscribe((event) => {
      battleAction.next({
        type: "doBurst",
        event,
      });
    }),
    pilotButton.notifyPressed().subscribe((event) => {
      battleAction.next({
        type: "doPilotSkill",
        event,
      });
    }),
    timeScaleButton.notifyToggled().subscribe((timeScale) => {
      battleAction.next({
        type: "toggleTimeScale",
        timeScale,
      });
    }),
  ];
}
