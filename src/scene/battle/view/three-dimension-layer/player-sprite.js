// @flow
import type {Resources} from "../../../../resource/index";
import {ArmDozerIdList} from 'gbraver-burst-core';
import type {BattleSceneState} from "../../state";
import type {ArmDozerId, PlayerBattleState} from "gbraver-burst-core/lib/flow-type";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {PlayerShinBraver} from "../../../../game-object/armdozer/shin-breaver";

/** 与えられたパラメータからプレイヤースプライを生成する */
export function createPlayerSprite(props: {resources: Resources, state: BattleSceneState}): ArmDozerSprite {
  const playerInfo: ?PlayerBattleState = props.state.battleState.players.find(v => v.playerId === props.state.playerId);
  if (!playerInfo) {
    return PlayerShinBraver(props.resources);
  }
  return createSprite(playerInfo.armDozer.id, props.resources);
}

/** アームドーザIDからスプライトを生成する */
function createSprite(id: ArmDozerId, resources: Resources) {
  switch(id) {
    case ArmDozerIdList.SHIN_BRAVER:
    case ArmDozerIdList.NEO_LANDOZER:
    default:
      return PlayerShinBraver(resources);
  }
}
