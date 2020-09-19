// @flow

import {Animate} from "../../../../../animation/animate";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {all} from "../../../../../animation/all";
import {delay} from "../../../../../animation/delay";

/**
 * シンブレイバー ターンスタート
 *
 * @param sprite スプライト
 * @param turnStart ターンスタートインジケータ
 * @return アニメーション
 */
export function shinBraverTurnStart(sprite: ShinBraver, turnStart: TurnStart): Animate {
  return all(
    sprite.gutsForTurnStart(),
    delay(600)
      .chain(turnStart.popUp())
  );
}

/**
 * シンブレイバー ターンスタート -> 立ち
 *
 * @param sprite スプライト
 * @return アニメーション
 */
export function shinBraverTurnStartToStand(sprite: ShinBraver): Animate {
  return sprite.gutsToStand();
}