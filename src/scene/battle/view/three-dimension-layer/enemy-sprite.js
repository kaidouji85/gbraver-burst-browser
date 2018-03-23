// @flow

import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../resource/index";
import {ArmDozerIdList} from 'gbraver-burst-core';
import type {BattleSceneState} from "../../state";
import type {ArmDozerId, PlayerBattleState} from "gbraver-burst-core/lib/flow-type";
import {EnemyShinBraver} from '../../../../game-object/armdozer/shin-breaver';

/** 与えられたパラメータから敵スプライを生成する */
export function createEnemySprite(props: {resources: Resources, state: BattleSceneState}): ArmDozerSprite {
  const enemyInfo: ?PlayerBattleState = props.state.battleState.players.find(v => v.playerId !== props.state.playerId);
  if (!enemyInfo) {
    return new EnemyShinBraver(props.resources);
  }
  return createSprite(enemyInfo.armDozer.id, props.resources);
}

/** アームドーザIDからスプライトを生成する */
function createSprite(id: ArmDozerId, resources: Resources) {
  switch(id) {
    case ArmDozerIdList.SHIN_BRAVER:
    case ArmDozerIdList.NEO_LANDOZER:
    default:
      return new EnemyShinBraver(resources);
  }
}
