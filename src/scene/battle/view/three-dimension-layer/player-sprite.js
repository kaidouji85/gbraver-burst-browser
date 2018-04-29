// @flow
import type {Resources} from "../../../../resource/index";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {PlayerShinBraver} from "../../../../game-object/armdozer/shin-breaver";
import type {Player, PlayerId} from "gbraver-burst-core/lib/player/player";

/** 与えられたパラメータからプレイヤースプライを生成する */
export function createPlayerSprite(params: {resources: Resources, playerId: PlayerId, players: Player[]}): ArmDozerSprite {
  const playerInfo: ?Player = params.players.find(v => v.playerId === params.playerId);
  if (!playerInfo) {
    return PlayerShinBraver(params.resources);
  }
  return createSprite(playerInfo.armdozer.appearance, params.resources);
}

/** アームドーザの外見パラメータからスプライトを生成する */
function createSprite(appearance: string, resources: Resources) {
  switch(appearance) {
    case 'shin-braver':
    default:
      return PlayerShinBraver(resources);
  }
}
