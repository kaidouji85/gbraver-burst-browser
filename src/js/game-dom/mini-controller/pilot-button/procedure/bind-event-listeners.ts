import { Unsubscribable } from "rxjs";
import { PilotButtonProps } from "../props";
import { pushDOMStream } from "../../../../dom/event-stream";
import { onPilotPush } from "./on-pilot-push";

/**
 * パイロットボタンにイベントを関連付ける
 * @param props コンポネントプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(props: Readonly<PilotButtonProps>): Unsubscribable[] {
  return [
    pushDOMStream(props.root).subscribe(action => {
      onPilotPush(props, action);
    })
  ];  
}