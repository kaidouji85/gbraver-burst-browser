// @flow

import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../action/game-object-action";
import {DamageIndicator} from "./damage-indicator";
import {PlayerDamageIndicatorView} from "./view/player-damage-indicator-view";

type Param = {
  resources: Resources,
  listener: Observable<GameObjectAction>
}

/** プレイヤーのダメージインジケータ */
export function playerDamageIndicator(param: Param): DamageIndicator {
  const view = new PlayerDamageIndicatorView(param.resources);
  return new DamageIndicator({
    listener: param.listener,
    view: view
  })
}