import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../action/game-object-action";
import { DeathAlertProps } from "../props/death-alert-props";
import { onUpdate } from "./on-update";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @param gameObjectAction ゲームオブジェクトアクション
 * @returns アンサブスクライバの配列
 */
export const bindEventListeners = (
  props: DeathAlertProps,
  gameObjectAction: Observable<GameObjectAction>,
): Unsubscribable[] => {
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        onUpdate(props);
      }
    }),
  ];
};
