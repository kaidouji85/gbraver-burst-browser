// @flow

import {BatteryNumber} from "./battery-number";
import type {Resources} from "../../resource";
import {PlayerBatteryNumberView} from "./view/player-battery-number-view";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
};

/** プレイヤーのバッテリービュー */
export function playerBatteryNumber(param: Param): BatteryNumber {
  const view = new PlayerBatteryNumberView(param.resources);
  return new BatteryNumber({
    resources: param.resources,
    listener: param.listener,
    view: view
  });
}