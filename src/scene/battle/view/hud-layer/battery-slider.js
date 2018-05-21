// @flow

import type {Resources} from "../../../../resource";
import {BatterySlider} from "../../../../game-object/slider/battery-slider";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";

/** バッテリースライダーを生成する */
export function createBatterySlider(resources: Resources, notifier: BattleSceneNotifier): BatterySlider {
  const slider = new BatterySlider({
    resources,
    onBatteryChange: (battery: number) => {
      // TODO オブザーバに通知する
      console.log(`change battery ${battery}`);
    },
    isVisible: false
  });
  return slider;
}