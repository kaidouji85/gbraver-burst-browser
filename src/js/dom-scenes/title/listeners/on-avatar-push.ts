import { pop } from "../../../dom/animation";
import type { PushDOM } from "../../../dom/event-stream";
import type { TitleProps } from "../props";
import { openAccountMenu } from "./open-account-menu";

/**
 * アバターが押された時の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onAvatarPush(props: TitleProps, action: Readonly<PushDOM>): void {
  action.event.preventDefault();

  if (!props.isAccountMenuOpen) {
    action.event.stopPropagation();
    props.changeValue.play();
    pop(props.avatar, 1.2);
    openAccountMenu(props);
  }
}