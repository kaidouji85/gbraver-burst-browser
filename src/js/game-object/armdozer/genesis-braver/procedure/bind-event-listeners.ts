import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../../action/game-object-action";
import { GenesisBraverProps } from "../props/genesis-braver-props";
import { onPreRender } from "./on-pre-render";
import { onUpdate } from "./on-update";

/** オプション */
type Options = {
  /** ゲームオブジェクトプロパティ */
  props: GenesisBraverProps;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * イベントリスナーを登録する
 * @param options オプション
 * @returns アンサブスクライバ
 */
export function bindEventListeners(options: Options): Unsubscribable[] {
  const { props, gameObjectAction } = options;
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
