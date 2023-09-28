import { Unsubscribable } from "rxjs";

import { GameProps } from "../game-props";
import { onGameAction } from "./on-game-action";
import { onVisibilityChange } from "./on-visibility-change";

/**
 * ゲーム管理オブジェクトにイベントリスナーをバインドする
 * @param props ゲームプロパティ
 * @return アンサブスクライバ
 */
export function bindListeners(props: GameProps): Unsubscribable[] {
  return [
    props.gameAction.subscribe((action) => {
      onGameAction(props, action);
    }),
    props.visibilityChange.subscribe(() => {
      onVisibilityChange();
    }),
  ];
}
