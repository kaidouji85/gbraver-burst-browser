import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../../action/game-object-action";
import { LightningShotProps } from "../props/lightning-shot-props";
import { onUpdate } from "./on-update";

/**
 * イベントリスナーをバインドする
 * @param options オプション
 * @param options.props プロパティ
 * @param options.action アクション
 */
export function bindEventListeners(options: {
  props: LightningShotProps;
  gameObjectAction: Observable<GameObjectAction>;
}): Unsubscribable[] {
  const { props, gameObjectAction } = options;
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        onUpdate({ props, action });
      }
    }),
  ];
}
