// @flow

import {BatteryNumber} from "./battery-number";
import type {Resources} from "../../resource";
import {PlayerBatteryNumberView} from "./view/player-battery-number-view";
import {Observable} from "rxjs";
import {EnemyBatteryNumberView} from "./view/enemy-battery-number-view";
import type {GameObjectAction} from "../action/game-object-action";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
};

/** プレイヤーのバッテリービュー */
export function playerBatteryNumber(param: Param): BatteryNumber {
  const view = new PlayerBatteryNumberView(param.resources);
  return new BatteryNumber({
    listener: param.listener,
    view: view
  });
}

/** 敵のバッテリービュー */
export function enemyBatteryNumber(param: Param): BatteryNumber {
  const view = new EnemyBatteryNumberView(param.resources);
  return new BatteryNumber({
    listener: param.listener,
    view: view
  });
}