// @flow

import {BatteryNumber} from "../../../../game-object/battery-number/battery-number";
import type {Resources} from "../../../../resource/index";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action/index";
import {enemyBatteryNumber} from "../../../../game-object/battery-number";

/** 敵のバッテリー数字を生成する */
export function createEnemyBatteryNumber(resources: Resources, listener: Observable<GameObjectAction>): BatteryNumber {
  return enemyBatteryNumber({
    resources: resources,
    listener: listener
  });
}