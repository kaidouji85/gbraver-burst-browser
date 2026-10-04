import { Unsubscribable } from "rxjs";

import { GameObjectActionContainer } from "../../../action/game-object-action-container";
import { LightningShotProps } from "../props/lightning-shot-props";
import { onPreRender } from "./on-pre-render";
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
      switch (action.type) {
        case "Update":
          return onUpdate({ props, action });
        case "PreRender":
          return onPreRender({ props, action });
      }
    }),
  ];
}
