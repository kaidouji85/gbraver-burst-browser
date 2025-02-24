import { PushDOM } from "../../../../dom/push-dom";
import { BurstButtonProps } from "../props";

/**
 * ボタンが押された時の処理
 * @param props コンポネントプロパティ
 * @param action アクション
 */
export function onButtonPush(
  props: Readonly<BurstButtonProps>,
  action: Readonly<PushDOM>,
): void {
  const { push } = props;
  const { event } = action;
  event.preventDefault();
  event.stopPropagation();
  push.next({ event });
}
