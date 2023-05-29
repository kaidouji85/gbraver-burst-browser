import { pop } from "../../../dom/animation";
import { TitleProps } from "../props";
import { isHelpMenuOpen } from "./is-help-menu-open";
import { openHelpMenu } from "./open-help-menu";
import {PushDOM} from "../../../dom/push-dom";

/**
 * ヘルプアイコンを押した際の処理
 * @param props 画面プロパティ
 * @param action アクション
 */
export function onHelpIconPush(
  props: TitleProps,
  action: Readonly<PushDOM>
): void {
  action.event.preventDefault();

  if (!isHelpMenuOpen(props)) {
    action.event.stopPropagation();
    props.changeValue.play();
    pop(props.helpIcon, 1.3);
    openHelpMenu(props);
  }
}
