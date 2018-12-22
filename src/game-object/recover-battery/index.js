// @flow

import {RecoverBattery} from "./recover-battery";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import type {Resources} from "../../resource";
import {PlayerRecoverBatteryView} from "./view/player-recover-battery-view";
import {EnemyRecoverBatteryView} from "./view/enemy-recover-battery-view";

export function playerRecoverBattery(resources: Resources, listener: Observable<GameObjectAction>): RecoverBattery {
  const view = new PlayerRecoverBatteryView(resources);
  return new RecoverBattery({
    resources: resources,
    listener: listener,
    view: view
  });
}

export function enemyRecoverBattery(resources: Resources, listener: Observable<GameObjectAction>): RecoverBattery {
  const view = new EnemyRecoverBatteryView(resources);
  return new RecoverBattery({
    resources: resources,
    listener: listener,
    view: view
  });
}