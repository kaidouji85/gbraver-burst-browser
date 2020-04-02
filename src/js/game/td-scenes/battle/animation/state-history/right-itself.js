// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState, RightItself} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {empty} from "../../../../../animation/delay";

/**
 * 防御側 体勢整え
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームんp状態
 * @return アニメーション
 */
export function rightItselfAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'RightItself') {
    return empty();
  }

  const effect: RightItself = gameState.effect;
  const defenderSprite = view.td.sprites.find(v => v.playerId === effect.defender);
  if (!defenderSprite) {
    return empty();
  }

  switch(effect.battleResult.name) {
    case 'NormalHit':
    case 'CriticalHit':
      return defenderSprite.sprite.knockBackToStand();
    case 'Guard':
      return defenderSprite.sprite.guardToStand();
    case 'Miss':
      return defenderSprite.sprite.avoidToStand();
    default:
      return empty();
  }
}