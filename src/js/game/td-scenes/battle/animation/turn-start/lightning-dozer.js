// @flow

import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {Animate} from "../../../../../animation/animate";
import {all} from "../../../../../animation/all";
import {delay} from "../../../../../animation/delay";
import {LightningDozer} from "../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";

/**
 * ライトニングドーザ ターンスタート
 *
 * @param sprite スプライト
 * @param turnStart ターンスタートインジケータ
 * @return アニメーション
 */
export function lightningDozerTurnStart(sprite: LightningDozer, turnStart: TurnStart): Animate {
  return all(
    sprite.gutsForTurnStart(),
    delay(900)
      .chain(turnStart.popUp())
  );
}

/**
 * ライトニングドーザ ターンスタート -> 立ち
 *
 * @param sprite スプライト
 * @return アニメーション
 */
export function lightningDozerTurnStartToStand(sprite: LightningDozer): Animate {
  return sprite.gutsToStand();
}