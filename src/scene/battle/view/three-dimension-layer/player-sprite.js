// @flow
import type {Resources} from "../../../../resource/index";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {PlayerShinBraver} from "../../../../game-object/armdozer/shin-breaver";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {PlayerNeoLandozer} from "../../../../game-object/armdozer/neo-landozer";
import {Observable} from "rxjs";
import type {SpriteGameLoop} from "../../../../action/sprite-game-loop/sprite-game-loop";

/** 与えられたパラメータからプレイヤースプライを生成する */
export function createPlayerSprite(resources: Resources, listener: Observable<SpriteGameLoop>, playerInfo: Player): ArmDozerSprite {
  switch(playerInfo.armdozer.appearance) {
    case 'neo-landozer':
      return PlayerNeoLandozer(resources, listener);
    case 'shin-braver':
    default:
      return PlayerShinBraver(resources, listener);
  }
}