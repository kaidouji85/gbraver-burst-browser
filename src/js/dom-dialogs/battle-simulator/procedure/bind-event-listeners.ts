import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { BattleSimulatorProps } from "../props";
import { onBackGroundPush } from "./on-back-ground-push";
import { onCloserPush } from "./on-closer-push";
import { onEnemyBatteryMinusPush } from "./on-enemy-battery-minus-push";
import { onEnemyBatteryPlusPush } from "./on-enemy-battery-plus-push";
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
  const { backGround, closer, playerElements, enemyElements } = props;
  return [
    domPushStream(playerElements.batteryPlus).subscribe((action) => {
      onPlayerBatteryPlusPush(props, action);
    }),
    domPushStream(playerElements.batteryMinus).subscribe((action) => {
      onPlayerBatteryMinusPush(props, action);
    }),
    domPushStream(enemyElements.batteryPlus).subscribe((action) => {
      onEnemyBatteryPlusPush(props, action);
    }),
    domPushStream(enemyElements.batteryMinus).subscribe((action) => {
      onEnemyBatteryMinusPush(props, action);
    }),
    domPushStream(closer).subscribe((action) => {
      onCloserPush(props, action);
    }),
    domPushStream(backGround).subscribe((action) => {
      onBackGroundPush(props, action);
    }),
  ];
}
