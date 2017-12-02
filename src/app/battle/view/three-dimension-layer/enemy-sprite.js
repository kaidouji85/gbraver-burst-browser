// @flow

import type {ArmDozerSprite} from "../../../../armdozer/armdozer-sprite";
import type {Resources} from "../../../../resource/resource-manager";
import {ArmDozerIdList} from 'gbraver-burst-core';
import {EnemyShinBraver} from "../../../../armdozer/shin-breaver";
import {EnemyNeoLandozer} from "../../../../armdozer/neo-landozer";
import type {BattleAppState} from "../../state";
import type {PlayerBattleState} from "gbraver-burst-core/lib/flow-type";
import type {ArmDozerId} from "gbraver-burst-core/lib/flow-type";

/** 与えられたパラメータから敵スプライを生成する */
export function EnemySprite(props: {resources: Resources, state: BattleAppState}): ArmDozerSprite {
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
