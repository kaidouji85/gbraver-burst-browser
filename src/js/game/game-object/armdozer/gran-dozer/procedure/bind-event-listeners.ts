import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../../action/game-object-action";
import { GranDozerProps } from "../props/gran-dozer-props";
import { onPreRender } from "./on-pre-render";
import { onUpdate } from "./on-update";

/** オプション */
type Options = {
  /** プロパティ */
  props: GranDozerProps;
  /** ゲームオブジェクトアクション */
  gameObjectAction: Observable<GameObjectAction>;
};

/**
 * イベントリスナーを登録する
 * @param options オプション
 * @returns アンサブスクライバ
 */
export function bindEventListeners(options: Options): Unsubscribable[] {
  const { gameObjectAction, props } = options;
  return [
    gameObjectAction.subscribe((action) => {
      switch (action.type) {
        case "Update":
          return onUpdate({ props, action });
        case "PreRender":
          return onPreRender({ props, action });
      }
    }),
  ];
}
