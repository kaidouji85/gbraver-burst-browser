// @flow

import type {Resources} from "../../../../resource";
import {BatterySelector} from "../../../../game-object/battery-selector";
import type {Player} from "gbraver-burst-core/lib/player/player";
import type {OverlapListener} from "../../../../deperecated-observer/overlap/overlap-listener";
import type {BattleSceneNotifier} from "../../../../deperecated-observer/battle-scene/battle-scene-notifier";
import type {GameLoop} from "../../../../action/game-loop/game-loop";
import {Observable} from "rxjs";
import type {OverlapAction} from "../../../../action/overlap";

type Param = {
  resources: Resources,
  gameLoopListener: Observable<GameLoop>,
  overlapListener: Observable<OverlapAction>,
  deprecatedListener: OverlapListener,
  notifier: BattleSceneNotifier,
  playerInfo: Player
}

/** バッテリーセレクタを生成する */
export function createBatterySelector(param: Param): BatterySelector {
  return new BatterySelector({
    listener: param.gameLoopListener,
    overlapListener: param.deprecatedListener,
    maxBattery: param.playerInfo.armdozer.maxBattery,
    resources: param.resources,
    onBatteryChange: (battery: number) => param.notifier.notify({
      type: 'changeBattery',
      battery: battery}),
    onOkButtonPush: () => param.notifier.notify({
      type: 'decideBattery'
    })
  });
}