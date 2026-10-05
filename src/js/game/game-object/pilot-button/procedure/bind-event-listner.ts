import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../action/game-object-action";
import { PilotButtonProps } from "../props/pilot-button-props";
import { onPreRender } from "./on-pre-render";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @param gameObjectAction ゲームオブジェクトアクション
 */
export function bindEventListener(
  props: PilotButtonProps,
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
