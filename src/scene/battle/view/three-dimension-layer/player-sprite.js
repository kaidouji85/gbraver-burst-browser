// @flow
import type {Resources} from "../../../../resource/index";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/common/armdozer-sprite";
import {PlayerShinBraver} from "../../../../game-object/armdozer/shin-breaver";
import type {Player} from "gbraver-burst-core/lib/player/player";
import {PlayerNeoLandozer} from "../../../../game-object/armdozer/neo-landozer";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action";

/** 与えられたパラメータからプレイヤースプライを生成する */
export function createPlayerSprite(resources: Resources, listener: Observable<GameObjectAction>, playerInfo: Player): ArmDozerSprite {
  switch(playerInfo.armdozer.appearance) {
    case 'neo-landozer':
      return PlayerNeoLandozer(resources, listener);
    case 'shin-braver':
    default:
      return PlayerShinBraver(resources, listener);
  }
}