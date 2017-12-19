// @flow

import type {DepricatedArmDozerSprite} from "../../../../game-object/armdozer/depuricated-armdozer-sprite";
import type {Resources} from "../../../../resource/resource-manager";
import {ArmDozerIdList} from 'gbraver-burst-core';
import {EnemyShinBraver} from "../../../../game-object/armdozer/depuricated-shin-breaver";
import {EnemyNeoLandozer} from "../../../../game-object/armdozer/neo-landozer";
import type {BattleSceneState} from "../../index";
import type {ArmDozerId, PlayerBattleState} from "gbraver-burst-core/lib/flow-type";

/** 与えられたパラメータから敵スプライを生成する */
export function EnemySprite(props: {resources: Resources, state: BattleSceneState}): DepricatedArmDozerSprite {
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
      return new EnemyShinBraver(resources);
    case ArmDozerIdList.NEO_LANDOZER:
      return new EnemyNeoLandozer(resources);
    default:
      return new EnemyShinBraver(resources);
  }
}
