// @flow

import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {Animate} from "../../../../../animation/animate";
import {all} from "../../../../../animation/all";
import {delay} from "../../../../../animation/delay";
import {LightningDozer} from "../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";

/**
 * ライトニングドーザ ターンスタートアニメーション
 *
 * @param sprite スプライト
 * @param turnStart ターンスタートインジケータ
 * @return アニメーション
 */
export function lightningDozerTurnStart(sprite: LightningDozer, turnStart: TurnStart): Animate {
  return all(
    sprite.turnStart(),
    delay(600)
      .chain(turnStart.popUp())
  );
}