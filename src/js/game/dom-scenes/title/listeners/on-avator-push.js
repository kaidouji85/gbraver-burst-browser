// @flow
import {pop} from "../../../../dom/animation";
import type {PushDOM} from "../../../../dom/event-stream";
import type {TitleProps} from "../props";
import {openAccountMenu} from "./open-account-menu";

/**
 * アバターが押された時の処理
 * 
 * @param action アクション
 */
export function onAvatarPush(props: TitleProps, action: PushDOM): void {
  action.event.preventDefault();
  if (!props.isAccountMenuOpen) {
    action.event.stopPropagation();
    props.changeValue.play();
    pop(props.avatar, 1.2);
    openAccountMenu(props);
  }
}