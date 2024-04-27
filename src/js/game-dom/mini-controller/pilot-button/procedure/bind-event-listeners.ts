import { Unsubscribable } from "rxjs";

import { domClickStream } from "../../../../dom/push-dom";
import { PilotButtonProps } from "../props";
import { onPilotPush } from "./on-pilot-push";

/**
 * パイロットボタンにイベントを関連付ける
 * @param props コンポネントプロパティ
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: Readonly<PilotButtonProps>,
): Unsubscribable[] {
  return [
    // accesskeyの挙動でボタンを押させるために、clickイベントを仕込む
    domClickStream(props.root).subscribe((action) => {
      onPilotPush(props, action);
    }),
  ];
}
