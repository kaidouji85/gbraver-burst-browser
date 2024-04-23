import { Unsubscribable } from "rxjs";

import { HUDGameObjectsProps } from "../props";

/**
 * イベントをバインドする
 * @param props プロパティ
 * @return アンサブスクライバ
 */
export function bindEventListener(
  props: HUDGameObjectsProps,
): Unsubscribable[] {
  const {
    batterySelector,
    burstButton,
    pilotButton,
    timeScaleButton,
    battleAction,
  } = props;
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
