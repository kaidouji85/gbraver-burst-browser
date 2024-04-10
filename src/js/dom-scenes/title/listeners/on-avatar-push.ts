import { pop } from "../../../dom/pop";
import { PushDOM } from "../../../dom/push-dom";
import type { TitleProps } from "../props";
import { isAccountMenuOpen } from "./is-account-menu-open";
import { openAccountMenu } from "./open-account-menu";

/**
 * アバターが押された時の処理
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onAvatarPush(
  props: TitleProps,
  action: Readonly<PushDOM>,
): void {
  action.event.preventDefault();

  if (!isAccountMenuOpen(props)) {
    action.event.stopPropagation();
    props.changeValue.sound.play();
    pop(props.avatar, 1.2);
    openAccountMenu(props);
  }
}
