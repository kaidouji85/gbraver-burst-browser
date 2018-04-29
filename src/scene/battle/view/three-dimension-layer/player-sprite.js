// @flow
import type {Resources} from "../../../../resource/index";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {PlayerShinBraver} from "../../../../game-object/armdozer/shin-breaver";
import type {Player} from "gbraver-burst-core/lib/player/player";

/** 与えられたパラメータからプレイヤースプライを生成する */
export function createPlayerSprite(resources: Resources, playerInfo: Player): ArmDozerSprite {
  switch(playerInfo.armdozer.appearance) {
    case 'shin-braver':
    default:
      return PlayerShinBraver(resources);
  }
}