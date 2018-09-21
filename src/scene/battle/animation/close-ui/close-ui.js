// @flow

import {BattleSceneView} from "../../view";
import {createEmptyTween} from "../../../../tween/empty-tween";
import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";

/** UIを閉じるアニメーション */
export function closeUI(view: BattleSceneView): MultiTween {
  const start = createEmptyTween();
  const pushOkButton = view.hudLayer.batterySelector.pushOkButton();
  const invisibleBurstButton = view.hudLayer.burstButton.invisible();
  const end = createEmptyTween();

  start.chain(pushOkButton.start, invisibleBurstButton.start);
  pushOkButton.end.chain(end);

  return {
    start: start,
    end: end
  };
}