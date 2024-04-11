import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../../action/game-object-action";
import { WingDozerProps } from "../props/wing-dozer-props";
import { onPreRender } from "./on-pre-render";
import { onUpdate } from "./on-update";

/** パラメータ */
type Params = {
  /** ゲームオブジェクトプロパティ */
  props: WingDozerProps;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * イベントリスナを登録する
 * @param params パラメータ
 * @return アンサブスクライバ
 */
export function bindEventListeners(params: Params): Unsubscribable[] {
  const { props, gameObjectAction } = params;
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        onUpdate(props);
      } else if (action.type === "PreRender") {
        onPreRender(props, action);
      }
    }),
  ];
}
