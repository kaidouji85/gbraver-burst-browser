// @flow

import type {Resources} from "../../../../resource";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";
import {BatterySelector} from "../../../../game-object/battery-selector";

/** バッテリースライダーを生成する */
export function createBatterySlider(resources: Resources, notifier: BattleSceneNotifier): BatterySelector {
  return new BatterySelector({
    // TODO プレイヤーステータスから取得する
    maxBattery: 5,
    resources: resources,
    onBatteryChange: (battery: number) => console.log(battery),
  });
}