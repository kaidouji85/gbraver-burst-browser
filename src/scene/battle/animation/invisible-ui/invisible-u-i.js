// @flow

import {BattleSceneView} from "../../view";
import {createEmptyTween} from "../../../../tween/empty-tween";
import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";

/** バッテリー決定に伴い、UIを非表示にする */
export function invisibleUI(view: BattleSceneView): MultiTween {
  const start = createEmptyTween();
  const closeBatterySelector = view.hudLayer.batterySelector.close();
  const invisibleBurstButton = view.hudLayer.burstButton.invisible();
  const invisibleTurnIndicator = view.threeDimensionLayer.turnIndicator.invisible();
  const end = createEmptyTween();

  start.chain(closeBatterySelector.start, invisibleBurstButton.start, invisibleTurnIndicator);
  invisibleBurstButton.end.chain(end);

  return {
    start: start,
    end: end
  };

}