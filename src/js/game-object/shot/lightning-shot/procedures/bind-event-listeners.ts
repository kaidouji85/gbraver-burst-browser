import { Unsubscribable } from "rxjs";

import { GameObjectActionContainer } from "../../../action/game-object-action-container";
import { LightningShotProps } from "../props/lightning-shot-props";
import { onUpdate } from "./on-update";

/**
 * イベントリスナーをバインドする
 * @param options オプション
 * @param options.props プロパティ
 */
export function bindEventListeners(
  options: GameObjectActionContainer & {
    props: LightningShotProps;
  },
): Unsubscribable[] {
  const { props, gameObjectAction } = options;
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        onUpdate({ props, action });
      }
    }),
  ];
}
