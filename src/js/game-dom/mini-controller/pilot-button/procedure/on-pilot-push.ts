import { PushDOM } from "../../../../dom/push-dom";
import { PilotButtonProps } from "../props";

/**
 * パイロットボタンが押された時の処理
 * @param props コンポネントプロパティ
 * @param action アクション
 */
export function onPilotPush(
  props: Readonly<PilotButtonProps>,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  action.event.stopPropagation();
  props.push.next();
}
