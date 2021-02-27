// @flow

import type {Resources} from "../../resource";
import {Observable} from "rxjs";
import {DamageIndicator} from "./damage-indicator";
import {PlayerDamageIndicatorView} from "./view/player-damage-indicator-view";
import {EnemyDamageIndicatorView} from "./view/enemy-damage-indicator-view";
import type {GameObjectAction} from "../action/game-object-action";

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

/** 敵のダメージインジケータ */
export function enemyDamageIndicator(param: Param): DamageIndicator {
  const view = new EnemyDamageIndicatorView(param.resources);
  return new DamageIndicator({
    listener: param.listener,
    view: view
  })
}
