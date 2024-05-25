import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../action/game-object-action";
import { BurstButtonProps } from "../props/burst-button-props";
import { onPreRender } from "./on-pre-render";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @param gameObjectAction ゲームオブジェクトアクション
 */
export function bindEventListener(
  props: BurstButtonProps,
  gameObjectAction: Observable<GameObjectAction>,
): Unsubscribable[] {
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "PreRender") {
        onPreRender(props, action);
      }
    }),
  ];
}
