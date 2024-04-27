import { Unsubscribable } from "rxjs";

import { domClickStream } from "../../../../dom/push-dom";
import { BurstButtonProps } from "../props";
import { onButtonPush } from "./on-button-push";

/**
 * バーストボタンにイベントを関連付ける
 * @param props コンポネントプロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(props: BurstButtonProps): Unsubscribable[] {
  return [
    // accesskeyの挙動でボタンを押させるために、clickイベントを仕込む
    domClickStream(props.root).subscribe((action) => {
      onButtonPush(props, action);
    }),
  ];
}
