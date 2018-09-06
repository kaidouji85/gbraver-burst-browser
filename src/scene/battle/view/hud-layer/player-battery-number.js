// @flow

import {BatteryNumber} from "../../../../game-object/battery-number/battery-number";
import {playerBatteryNumber} from "../../../../game-object/battery-number/index";
import type {Resources} from "../../../../resource/index";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action/index";

/** プレイヤーのバッテリー数字を生成する */
export function createPlayerBatteryNumber(resources: Resources, listener: Observable<GameObjectAction>): BatteryNumber {
  return playerBatteryNumber({
    resources: resources,
    listener: listener
  });
}