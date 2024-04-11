import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../../action/game-object-action";
import { GenesisBraverProps } from "../props/genesis-braver-props";
import { onPreRender } from "./on-pre-render";
import { onUpdate } from "./on-update";

/** パラメータ */
type Params = {
  /** ゲームオブジェクトプロパティ */
  props: GenesisBraverProps;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * イベントリスナーを登録する
 * @param props ログインダイアログのプロパティ
 * @return アンサブスクライバ
 */
export function bindEventListeners(params: Params): Unsubscribable[] {
  const { props, gameObjectAction } = params;
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "PreRender") {
        onPreRender(props, action);
      } else if (action.type === "Update") {
        onUpdate(props);
      }
    }),
  ];
}
