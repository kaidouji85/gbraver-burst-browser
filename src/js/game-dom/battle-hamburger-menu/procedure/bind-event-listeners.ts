import { Unsubscribable } from "rxjs";

import { domPushStream } from "../../../dom/push-dom";
import { BattleHamburgerMenuProps } from "../props";
import { onHamburgerIconPush } from "./on-hamburger-icon-push";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @returns アンサブスクライバー
 */
export function bindEventListeners(
  props: BattleHamburgerMenuProps,
): Unsubscribable[] {
  return [
    domPushStream(props.hamburgerIcon).subscribe((action) => {
      onHamburgerIconPush(props, action);
    }),
  ];
}
