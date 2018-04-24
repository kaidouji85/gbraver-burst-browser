// @flow

import type {ArmDozerSprite} from "../../../../game-object/armdozer/armdozer-sprite";
import type {Resources} from "../../../../resource/index";
import type {BattleSceneState} from "../../state";
import {EnemyShinBraver} from '../../../../game-object/armdozer/shin-breaver';
import type {PlayerState} from "gbraver-burst-core/lib/game-state/player-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";

/** 与えられたパラメータから敵スプライを生成する */
export function createEnemySprite(props: {resources: Resources, state: BattleSceneState}): ArmDozerSprite {
  // TODO 配列の要素数チェックをする
  const lastState: GameState = props.state.battleState[props.state.battleState.length - 1];
  const enemyInfo: ?PlayerState = lastState.players.find(v => v.playerId !== props.state.playerId);
  if (!enemyInfo) {
    return new EnemyShinBraver(props.resources);
  }
  return createSprite(enemyInfo.armdozer.appearance, props.resources);
}

/** アームドーザの外見パラメータからスプライトを生成する */
function createSprite(appearance: string, resources: Resources) {
  switch(appearance) {
    case 'shin-breaver':
    default:
      return new EnemyShinBraver(resources);
  }
}
