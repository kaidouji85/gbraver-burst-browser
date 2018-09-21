// @flow

import {BattleSceneView} from "../../view";
import {createEmptyTween} from "../../../../tween/empty-tween";
import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";

/** バッテリー決定に伴い、UIを非表示にする */
export function invisibleUIByBatteryDesicion(view: BattleSceneView): MultiTween {
  const start = createEmptyTween();

  const pushOkButton = view.hudLayer.batterySelector.pushOkButton();
  const invisibleBurstButton = view.hudLayer.burstButton.invisible(200);

  const end = createEmptyTween();

  start.chain(pushOkButton.start, invisibleBurstButton.start);
  pushOkButton.end.chain(end);

  return {
    start: start,
    end: end
  };
}