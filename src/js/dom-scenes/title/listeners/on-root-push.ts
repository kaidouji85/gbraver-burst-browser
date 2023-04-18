import type { PushDOM } from "../../../dom/event-stream";
import type { TitleProps } from "../props";
import { closeAccountMenu } from "./close-account-menu";
import { closeHelpMenu } from "./close-help-menu";
import { isHelpMenuOpen } from "./is-help-menu-open";

/**
 * ルート要素が押された時の処理
 * 本画面でウインドウ外が押された時に呼び出される想定
 *
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onRootPush(props: TitleProps, action: Readonly<PushDOM>): void {
  action.event.stopPropagation();

  if (props.isAccountMenuOpen) {
    closeAccountMenu(props);
  }

  if (isHelpMenuOpen(props)) {
    closeHelpMenu(props);
  }
}
