import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { BattleSimulatorProps } from "../props";
import { onPlayerBatteryMinusPush } from "./on-player-battery-minus-push";
import { onPlayerBatteryPlusPush } from "./on-player-battery-plus-push";

/**
 * イベントリスナを登録する
 * @param props プロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: BattleSimulatorProps,
): Unsubscribable[] {
  const { playerElements } = props;
  return [
    domPushStream(playerElements.batteryPlus).subscribe((action) => {
      onPlayerBatteryPlusPush(props, action);
    }),
    domPushStream(playerElements.batteryMinus).subscribe(action => {
      onPlayerBatteryMinusPush(props, action);
    })
  ];
}
