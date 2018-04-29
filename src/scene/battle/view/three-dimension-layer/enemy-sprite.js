// @flow

import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../resource/index";
import {EnemyShinBraver} from '../../../../game-object/armdozer/shin-breaver';
import type {Player} from "gbraver-burst-core/lib/player/player";

/** 与えられたパラメータから敵スプライを生成する */
export function createEnemySprite(resources: Resources, enemyInfo: Player): ArmDozerSprite {
  switch(enemyInfo.armdozer.appearance) {
    case 'shin-breaver':
    default:
      return new EnemyShinBraver(resources);
  }
}
