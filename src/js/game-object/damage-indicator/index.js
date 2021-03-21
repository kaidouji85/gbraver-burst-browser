// @flow

import type {Resources} from "../../resource";
import {DamageIndicator} from "./damage-indicator";
import {PlayerDamageIndicatorView} from "./view/player-damage-indicator-view";
import {EnemyDamageIndicatorView} from "./view/enemy-damage-indicator-view";
import type {GameObjectAction} from "../action/game-object-action";
import type {Stream} from "../../stream/core";

type Param = {
  resources: Resources,
  listener: Stream<GameObjectAction>
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
