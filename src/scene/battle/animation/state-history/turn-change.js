// @flow

import {Animate} from "../../../../animation/animate";
import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core/lib/game-state/game-state";
import type {TurnChange} from "gbraver-burst-core/lib/effect/turn-change/turn-change";
import {empty} from '../../../../animation/delay';

export function turnChangeAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState, effect: TurnChange): Animate {
  // TODO アニメーションを作成する
  console.log('turn-change');
  return empty();
}