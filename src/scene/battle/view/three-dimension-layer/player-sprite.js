// @flow
import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../state";
import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import {PlayerShinBraver} from "../../../../game-object/armdozer/shin-breaver";
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

/** 与えられたパラメータからプレイヤースプライを生成する */
export function createPlayerSprite(props: {resources: Resources, state: BattleSceneState}): ArmDozerSprite {
  // TODO 配列の要素数チェックをする
  const lastState: GameState = props.state.battleState[props.state.battleState.length - 1];
  const playerInfo: ?PlayerState = lastState.players.find(v => v.playerId === props.state.playerId);
  if (!playerInfo) {
    return PlayerShinBraver(props.resources);
  }
  return createSprite(playerInfo.armdozer.appearance, props.resources);
}

/** アームドーザの外見パラメータからスプライトを生成する */
function createSprite(appearance: string, resources: Resources) {
  switch(appearance) {
    case 'shin-braver':
    default:
      return PlayerShinBraver(resources);
  }
}
