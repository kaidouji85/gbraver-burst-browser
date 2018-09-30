// @flow

import type {ArmDozerSprite} from "../../../../game-object/armdozer/common/armdozer-sprite";
import type {Resources} from "../../../../resource/index";
import {EnemyShinBraver} from '../../../../game-object/armdozer/shin-breaver';
import type {Player} from "gbraver-burst-core/lib/player/player";
import {EnemyNeoLandozer} from "../../../../game-object/armdozer/neo-landozer";
import {Observable} from "rxjs";
import type {GameObjectAction} from "../../../../action/game-object-action";

/** 与えられたパラメータから敵スプライを生成する */
export function createEnemySprite(resources: Resources, listener: Observable<GameObjectAction>, enemyInfo: Player): ArmDozerSprite {
  switch(enemyInfo.armdozer.appearance) {
    case 'neo-landozer':
      return EnemyNeoLandozer(resources, listener);
    case 'shin-breaver':
    default:
      return EnemyShinBraver(resources, listener);
  }
}
