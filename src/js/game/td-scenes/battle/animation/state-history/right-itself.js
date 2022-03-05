// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {BattleResult, GameStateX, RightItself} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";

/**
 * 防御側 体勢整え
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function rightItselfAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<RightItself>): Animate {
  if (gameState.effect.name !== 'RightItself') {
    return empty();
  }

  const effect: RightItself = gameState.effect;
  const defenderArmdozer = view.td.armdozerObjects.find(v => v.playerId === effect.defender);
  if (!defenderArmdozer) {
    return empty();
  }

  return empty().chain(
    delay(0),
    getMotion(defenderArmdozer.sprite(), effect.battleResult)
  );
}

/**
 * 戦闘結果に応じたモーションを取得する
 *
 * @param sprite スプライト
 * @param battleResult 戦闘結果
 * @return アニメーション
 */
function getMotion(sprite: ArmDozerSprite, battleResult: BattleResult): Animate {
  if (battleResult.name === 'NormalHit') {
    return sprite.knockBackToStand();
  }

  if (battleResult.name === 'CriticalHit') {
    return sprite.knockBackToStand();
  }

  if (battleResult.name === 'Guard') {
    return sprite.guardToStand();
  }

  if (battleResult.name === 'Miss') {
    return sprite.avoidToStand();
  }

  if (battleResult.name === 'Feint' && battleResult.isDefenderMoved) {
    return sprite.avoidToStand();
  }

  return empty();
}