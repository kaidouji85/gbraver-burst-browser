// @flow
import type {ArmDozerSprite} from "../../../../armdozer/armdozer-sprite";
import type {Resources} from "../../../../resource/resource-manager";
import {ArmDozerIdList} from 'gbraver-burst-core';
import {PlayerShinBraver} from "../../../../armdozer/shin-breaver";
import {PlayerNeoLandozer} from "../../../../armdozer/neo-landozer";
import type {BattleSceneState} from "../../state";
import type {ArmDozerId, PlayerBattleState} from "gbraver-burst-core/lib/flow-type";

/** 与えられたパラメータからプレイヤースプライを生成する */
export function PlayerSprite(props: {resources: Resources, state: BattleSceneState}): ArmDozerSprite {
  const playerInfo: ?PlayerBattleState = props.state.battleState.players.find(v => v.playerId === props.state.playerId);
  if (!playerInfo) {
    return new PlayerShinBraver(props.resources);
  }
  return createSprite(playerInfo.armDozer.id, props.resources);
}

/** アームドーザIDからスプライトを生成する */
function createSprite(id: ArmDozerId, resources: Resources) {
  switch(id) {
    case ArmDozerIdList.SHIN_BRAVER:
      return new PlayerShinBraver(resources);
    case ArmDozerIdList.NEO_LANDOZER:
      return new PlayerNeoLandozer(resources);
    default:
      return new PlayerShinBraver(resources);
  }
}
