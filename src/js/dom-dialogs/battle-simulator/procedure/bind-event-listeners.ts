import { filter, Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { BattleSimulatorProps } from "../props";
import { onBackGroundPush } from "./on-back-ground-push";
import { onCloserPush } from "./on-closer-push";
import { onEnemyBatteryMinusPush } from "./on-enemy-battery-minus-push";
import { onEnemyBatteryPlusPush } from "./on-enemy-battery-plus-push";
import { onPlayerBatteryMinusPush } from "./on-player-battery-minus-push";
import { onPlayerBatteryPlusPush } from "./on-player-battery-plus-push";

/**
 * ボタンがdisabledでない場合にPushDOMストリームを流す
 * iPhone、iPadでは、disabled属性が付与されているボタンを押下しても、
 * touchstartが発火するため、disabled属性のチェックが必要
 * @param button 対象となるボタン要素
 * @returns 通知ストリーム
 */
const pushStreamIfNotDisabled = (button: HTMLButtonElement) =>
  domPushStream(button).pipe(filter(() => !button.disabled));

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
    pushStreamIfNotDisabled(playerElements.batteryPlus).subscribe((action) => {
      onPlayerBatteryPlusPush(props, action);
    }),
    pushStreamIfNotDisabled(playerElements.batteryMinus).subscribe((action) => {
      onPlayerBatteryMinusPush(props, action);
    }),
    pushStreamIfNotDisabled(enemyElements.batteryPlus).subscribe((action) => {
      onEnemyBatteryPlusPush(props, action);
    }),
    pushStreamIfNotDisabled(enemyElements.batteryMinus).subscribe((action) => {
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
