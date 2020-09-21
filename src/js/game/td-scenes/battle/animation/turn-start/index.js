// @flow

import {Animate} from "../../../../../animation/animate";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import {TurnStart} from "../../../../../game-object/turn-start/turn-start";
import {ShinBraver} from "../../../../../game-object/armdozer/shin-braver/shin-braver";
import {shinBraverTurnStart, shinBraverTurnStartToStand} from "./shin-braver";
import {neoLandozerTurnStart, neoLandozerTurnStartToStand} from "./neo-landozer";
import {NeoLandozer} from "../../../../../game-object/armdozer/neo-landozer/neo-landozer";
import {LightningDozer} from "../../../../../game-object/armdozer/lightning-dozer/lightning-dozer";
import {lightningDozerTurnStart, lightningDozerTurnStartToStand} from "./lightning-dozer";
import {WingDozer} from "../../../../../game-object/armdozer/wing-dozer/wing-dozer";
import {wingDozerTurnStart, wingDozerTurnStartToStand} from "./wing-dozer";
import {empty} from "../../../../../animation/delay";

/**
 * ターンスタート
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

  return turnStart.popUp();
}

/**
 * ターンスタート -> 立ち
 *
 * @param sprite スプライト
 * @return アニメーション
 */
export function turnStartToStandAnimation(sprite: ArmDozerSprite): Animate {
  if (sprite instanceof ShinBraver) {
    return shinBraverTurnStartToStand(sprite);
  }

  if (sprite instanceof NeoLandozer) {
    return neoLandozerTurnStartToStand(sprite);
  }

  if (sprite instanceof LightningDozer) {
    return lightningDozerTurnStartToStand(sprite);
  }

  if (sprite instanceof WingDozer) {
    return wingDozerTurnStartToStand(sprite);
  }

  return empty();
}