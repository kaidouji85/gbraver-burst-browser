// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState, RightItself, BattleResult} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

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

  return getMotion(defenderSprite.sprite, effect.battleResult)
    .chain(delay(500));
}

/**
 * 戦闘結果に応じたモーションを取得する
 *
 * @param sprite スプライト
 * @param battleResult 戦闘結果
 * @return アニメーション
 */
function getMotion(sprite: ArmDozerSprite, battleResult: BattleResult): Animate {
  switch(battleResult.name) {
    case 'NormalHit':
    case 'CriticalHit':
      return sprite.knockBackToStand();
    case 'Guard':
      return sprite.guardToStand();
    default:
      return empty();
  }
}