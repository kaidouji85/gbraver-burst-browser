import { Observable, Unsubscribable } from "rxjs";

import { GameObjectAction } from "../../action/game-object-action";
import { TimeScaleButtonProps } from "../props/time-scale-button-props";
import { onButtonPush } from "./on-button-push";
import { onPreRender } from "./on-pre-render";
import { onUpdate } from "./on-update";

/**
 * イベントリスナーをバインドする
 * @param props プロパティ
 * @param gameObjectAction ゲームオブジェクトアクション
 */
export function bindEventListener(
  props: TimeScaleButtonProps,
  gameObjectAction: Observable<GameObjectAction>,
): Unsubscribable[] {
  const { view } = props;
  return [
    gameObjectAction.subscribe((action) => {
      if (action.type === "Update") {
        onUpdate(props, action);
      } else if (action.type === "PreRender") {
        onPreRender(props, action);
      }
    }),
    view.notifyPressed().subscribe(() => {
      onButtonPush(props);
    }),
  ];
}
