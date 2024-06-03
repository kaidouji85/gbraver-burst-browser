import { map, merge, Observable } from "rxjs";

import { BattleSceneAction } from "../../../../actions";
import { HUDGameObjectsProps } from "../props";

/**
 * 戦闘アクションを通知する
 * @param props プロパティ
 * @returns 通知ストリーム
 */
export function notifyBattleAction(
  props: HUDGameObjectsProps,
): Observable<BattleSceneAction> {
  const { batterySelector, burstButton, pilotButton, timeScaleButton } = props;
  return merge(
    batterySelector
      .notifyBatteryPlus()
      .pipe(map(() => ({ type: "plusBattery" }) as const)),
    batterySelector
      .notifyBatteryMinus()
      .pipe(map(() => ({ type: "minusBattery" }) as const)),
    batterySelector.notifyDecision().pipe(
      map(
        (event) =>
          ({
            type: "decideBattery",
            battery: batterySelector.getBattery(),
            event,
          }) as const,
      ),
    ),
    burstButton
      .notifyPressed()
      .pipe(map((event) => ({ type: "doBurst", event }) as const)),
    pilotButton
      .notifyPressed()
      .pipe(map((event) => ({ type: "doPilotSkill", event }) as const)),
    timeScaleButton
      .notifyToggled()
      .pipe(
        map((timeScale) => ({ type: "toggleTimeScale", timeScale }) as const),
      ),
  );
}
