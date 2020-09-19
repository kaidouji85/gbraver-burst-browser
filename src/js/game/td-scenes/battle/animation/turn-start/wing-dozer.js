// @flow

import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {Animate} from "../../../../../animation/animate";
import {all} from "../../../../../animation/all";
import {delay} from "../../../../../animation/delay";
import {WingDozer} from "../../../../../game-object/armdozer/wing-dozer/wing-dozer";

/**
 * ウィングドーザ ターンスタート
 *
 * @param sprite スプライト
 * @param turnStart ターンスタートインジケータ
 * @return アニメーション
 */
export function wingDozerTurnStart(sprite: WingDozer, turnStart: TurnStart): Animate {
  return all(
    sprite.dashForTurnStart(),
    delay(900)
      .chain(turnStart.popUp())
  );
}

/**
 * ウィングドーザ ターンスタート -> 立ち
 *
 * @param sprite スプライト
 * @return アニメーション
 */
export function wingDozerTurnStartToStand(sprite: WingDozer): Animate {
  return sprite.dashToStand();
}