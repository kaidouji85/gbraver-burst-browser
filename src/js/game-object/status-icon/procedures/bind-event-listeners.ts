import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../action/game-object-action";
import { StatusIconProps } from "../props/status-icon-props";
import { onPreRender } from "./on-pre-render";

/**
 * イベントリスナーを登録する
 * @param props ステータスアイコンのプロパティ
 * @param gameObjectAction ゲームオブジェクトのアクション
 * @returns アンサブスクライバ
 */
export function bindEventListeners(
  props: StatusIconProps,
  gameObjectAction: Observable<GameObjectAction>,
): Unsubscribable[] {
  return [
    gameObjectAction.subscribe((action) => {
      switch (action.type) {
        case "PreRender":
          return onPreRender({ props, action });
      }
    }),
  ];
}
