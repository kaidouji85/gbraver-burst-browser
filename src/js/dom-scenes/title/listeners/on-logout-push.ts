import { PushDOM } from "../../../dom/push-dom";
import type { TitleProps } from "../props";

/**
 * ログアウトが押された際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onLogoutPush(
  props: TitleProps,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();
  props.changeValue.sound.play();
  props.pushLogout.next();
}
