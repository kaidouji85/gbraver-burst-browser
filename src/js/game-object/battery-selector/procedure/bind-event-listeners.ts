import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../action/game-object-action";
import { BatterySelectorProps } from "../props/battery-selector-props";
import { onPreRender } from "./on-pre-render";
import { onUpdate } from "./on-update";

/**
 * イベントリスナーをバインドする
 * @param props ゲームオブジェクトプロパティ
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: BatterySelectorProps,
  gameObjectAction: Observable<GameObjectAction>,
): Unsubscribable[] {
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        onUpdate(props, action);
      } else if (action.type === "PreRender") {
        onPreRender(props, action);
      }
    }),
  ];
}
