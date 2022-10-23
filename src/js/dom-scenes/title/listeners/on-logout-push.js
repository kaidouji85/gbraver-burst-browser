// @flow
import type { PushDOM } from "../../../dom/event-stream";
import type { TitleProps } from "../props";

/**
 * ログアウトが押された際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onLogoutPush(
  props: TitleProps,
  action: $ReadOnly<PushDOM>
): void {
  action.event.preventDefault();
  props.changeValue.play();
  props.pushLogout.next();
}
