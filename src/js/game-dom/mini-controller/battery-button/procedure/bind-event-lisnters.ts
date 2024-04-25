import { Unsubscribable } from "rxjs";

import { domClickStream } from "../../../../dom/push-dom";
import { BatteryButtonProps } from "../props";
import { onBatteryPush } from "./on-battery-push";

/**
 * イベントリスナをバインドする
 * @param props 画面プロパティ
 * @returns バインドしたイベントリスナのアンサブスクライバ
 */
export function bindEventListeners(
  props: BatteryButtonProps,
): Unsubscribable[] {
  return [
    // accesskeyの挙動でボタンを押させるために、clickイベントを仕込む
    domClickStream(props.root).subscribe((action) => {
      onBatteryPush(props, action);
    }),
  ];
}
