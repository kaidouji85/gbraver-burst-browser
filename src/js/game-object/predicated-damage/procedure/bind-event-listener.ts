import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../action/game-object-action";
import { PredicatedDamageProps } from "../props/predicated-damage-props";
import { onUpdate } from "./on-update";

/** パラメータ */
type Params = {
  /** ゲームオブジェクトプロパティ */
  props: PredicatedDamageProps;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * イベントリスナを登録する
 * @param params パラメータ
 * @returns アンサブスクライバ
 */
export function bindEventListener(params: Params): Unsubscribable[] {
  const { props, gameObjectAction } = params;
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        onUpdate(props);
      }
    }),
  ];
}