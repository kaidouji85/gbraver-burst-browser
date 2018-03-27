// @flow

import type {Resources} from "../../../../resource";
import type {BattleSceneState} from "../../state";
import {Observer} from "../../../observer";
import {BatterySlider} from "../../../../game-object/slider/battery-slider";

/** バッテリースライダーを生成する */
export function createBatterySlider(resources: Resources, state: BattleSceneState, observer: Observer): BatterySlider {
  return new BatterySlider(resources);
}