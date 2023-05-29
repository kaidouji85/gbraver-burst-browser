import type { TitleProps } from "../props";
import {PushDOM} from "../../../dom/push-dom";

/**
 * ログアウトが押された際の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onLogoutPush(
  props: TitleProps,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();
  props.changeValue.play();
  props.pushLogout.next();
}
