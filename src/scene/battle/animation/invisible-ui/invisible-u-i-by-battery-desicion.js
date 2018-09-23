// @flow

import {BattleSceneView} from "../../view";
import {createEmptyTween} from "../../../../tween/empty-tween";
import type {MultiTween} from "../../../../tween/multi-tween/multi-tween";

/** バッテリー決定に伴い、UIを非表示にする */
export function invisibleUIByBatteryDesicion(view: BattleSceneView): MultiTween {
  const invisibleBurstButton = view.hudLayer.burstButton.invisible();
  invisibleBurstButton.start.delay(200);
  return invisibleBurstButton;
}