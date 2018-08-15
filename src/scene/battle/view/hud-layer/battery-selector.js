// @flow

import type {Resources} from "../../../../resource";
import {BatterySelector} from "../../../../game-object/battery-selector";
import type {Player} from "gbraver-burst-core/lib/player/player";
import type {OverlapListener} from "../../../../observer/overlap/overlap-listener";
import type {BattleSceneNotifier} from "../../../../observer/battle-scene/battle-scene-notifier";

/** バッテリーセレクタを生成する */
export function createBatterySelector(resources: Resources, listener: OverlapListener, notifier: BattleSceneNotifier, playerInfo: Player): BatterySelector {
  return new BatterySelector({
    overlapListener: listener,
    maxBattery: playerInfo.armdozer.maxBattery,
    resources: resources,
    onBatteryChange: (battery: number) => notifier.notify({
      type: 'changeBattery',
      battery: battery}),
    onOkButtonPush: () => console.log('ok button push')
  });
}