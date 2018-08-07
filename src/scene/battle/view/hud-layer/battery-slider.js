// @flow

import type {Resources} from "../../../../resource";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import {BatterySlider} from "../../../../game-object/battery-slider";

/** バッテリースライダーを生成する */
export function createBatterySlider(resources: Resources, notifier: BattleSceneNotifier): BatterySlider {
  return new BatterySlider({
    resources: resources,
    isVisible: true,
    onBatteryChange: (battery: number) => console.log(battery),
  });
}