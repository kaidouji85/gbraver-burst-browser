// @flow

import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../state";
import {EnemyShinBraver} from '../../../../game-object/armdozer/shin-breaver';
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/** 与えられたパラメータから敵スプライを生成する */
export function createEnemySprite(params: {resources: Resources, playerId: PlayerId, players: Player[]}): ArmDozerSprite {
  const enemyInfo: ?Player = params.players.find(v => v.playerId !== params.playerId);
  if (!enemyInfo) {
    return new EnemyShinBraver(params.resources);
  }
  return createSprite(enemyInfo.armdozer.appearance, params.resources);
}

/** アームドーザの外見パラメータからスプライトを生成する */
function createSprite(appearance: string, resources: Resources) {
  switch(appearance) {
    case 'shin-breaver':
    default:
      return new EnemyShinBraver(resources);
  }
}
