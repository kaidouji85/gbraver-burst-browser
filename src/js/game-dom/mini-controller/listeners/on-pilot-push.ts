import { PushDOM } from "../../../dom/event-stream";
import { MiniControllerProps } from "../props";

/**
 * パイロットボタンが押された時の処理
 * @param props コンポネントプロパティ
 * @param action アクション
 */
export function onPilotPush(
  props: Readonly<MiniControllerProps>,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.pilotPush.next();
}
