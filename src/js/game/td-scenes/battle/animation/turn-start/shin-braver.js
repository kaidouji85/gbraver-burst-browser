// @flow

import {Animate} from "../../../../../animation/animate";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {all} from "../../../../../animation/all";
import {delay} from "../../../../../animation/delay";

/**
 * シンブレイバー ターンスタートアニメーション
 *
 * @param sprite スプライト
 * @param turnStart ターンスタートインジケータ
 * @return アニメーション
 */
export function shinBraverTurnStart(sprite: ShinBraver, turnStart: TurnStart): Animate {
  return all(
    sprite.turnStart(),
    delay(500)
      .chain(turnStart.popUp())
  );
}