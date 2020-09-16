// @flow

import {Animate} from "../../../../../animation/animate";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import {shinBraverTurnStart} from "./shin-braver";
import {neoLandozerTurnStart} from "./neo-landozer";
import {NeoLandozer} from "../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {LightningDozer} from "../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {lightningDozerTurnStart} from "./lightning-dozer";
import {WingDozer} from "../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import {wingDozerTurnStart} from "./wing-dozer";

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

  if (sprite instanceof LightningDozer) {
    return lightningDozerTurnStart(sprite, turnStart);
  }

  if (sprite instanceof WingDozer) {
    return wingDozerTurnStart(sprite, turnStart);
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