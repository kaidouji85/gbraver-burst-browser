import { PushDOM } from "../../../dom/event-stream";
import { MiniControllerProps } from "../props";

/**
 * バーストが押された時の処理
 * @param props コンポネントプロパティ
 * @param action アクション
 */
export function onBurstPush(
  props: Readonly<MiniControllerProps>,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.burstPush.next();
}
