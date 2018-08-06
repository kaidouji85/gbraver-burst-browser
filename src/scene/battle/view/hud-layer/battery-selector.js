// @flow

import {BatterySelector} from "../../../../game-object/battery-selector";
import type {Resources} from "../../../../resource";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";

/** バッテリースライダーを生成する */
export function createBatterySelector(resources: Resources, notifier: BattleSceneNotifier): BatterySelector {
  return new BatterySelector({
    resources: resources,
    onBatteryChange: (battery: number) => console.log(battery),
    isVisible: true
  });
}