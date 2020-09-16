// @flow

import {Animate} from "../../../../../animation/animate";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import {shinBraverTurnStart} from "./shin-braver";
import {neoLandozerTurnStart} from "./neo-landozer";
import {NeoLandozer} from "../../../../../game-object/armdozer/neo-landozer/neo-landozer";

/**
 * ターンスタートアニメーション
 *
 * @param sprite スプライト
 * @param turnStart ターンスタートインジケータ
 * @return アニメーション
 */
export function turnStartAnimation(sprite: ArmDozerSprite, turnStart: TurnStart): Animate {
  if (sprite instanceof ShinBraver) {
    return shinBraverTurnStart(sprite, turnStart);
  }

  if (sprite instanceof NeoLandozer) {
    return neoLandozerTurnStart(sprite, turnStart);
  }

  return defaultTurnStartAnimation(sprite, turnStart);
}

/**
 * デフォルト ターンスタートアニメーション
 *
 * @param sprite スプライト
 * @param turnStart ターンスタートインジケータ
 * @return アニメーション
 */
function defaultTurnStartAnimation(sprite: ArmDozerSprite, turnStart: TurnStart): Animate {
  return sprite.turnStart()
    .chain(turnStart.popUp());
}