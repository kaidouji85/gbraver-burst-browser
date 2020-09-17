// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameEnd, GameStateX} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";

/**
 * ゲーム終了アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function gameEndAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<GameEnd>): Animate {
  const effect: GameEnd = gameState.effect;
  if (effect.result.type !== 'GameOver') {
    return empty();
  }

  const gameOver = effect.result;
  const winnerSprite = view.td.sprites.find(v => v.playerId === gameOver.winner);
  if (!winnerSprite) {
    return empty();
  }

  return winnerSprite.sprite.turnStart()
    .chain(delay(500));
}
