import {NPCEndingProps} from "../props";
import {Unsubscribable} from "rxjs";
import {domPushStream} from "../../../dom/push-dom";
import {onScreenPush} from "./on-screen-push";

/**
 * 画面にイベントを関連づける
 * @param props 画面プロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(
  props: NPCEndingProps,
): Unsubscribable[] {
  return [
    domPushStream(props.root).subscribe((action) => {
      onScreenPush(props, action);
    }),
  ];
}