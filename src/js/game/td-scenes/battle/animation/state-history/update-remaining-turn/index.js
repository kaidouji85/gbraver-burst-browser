// @flow

import {Animate} from "../../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {empty} from "../../../../../../animation/delay";
import type {UpdateRemainingTurn} from "gbraver-burst-core";
import type {PlayerId} from "gbraver-burst-core";
import type {EndArmdozerAnimationParam} from "./animation-param";
import {all} from "../../../../../../animation/all";

/**
 * 効果継続ターン更新アニメーション
 *
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
export function updateRemainingTurnAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  const animations: Animate[] = gameState.players.map(player => playerUnderRemainingTurn(player.playerId, view, sceneState, gameState));
  return all(...animations);
}

function playerUnderRemainingTurn(playerId: PlayerId, view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'UpdateRemainingTUrn') {
    return empty();
  }

  const effect: UpdateRemainingTurn = gameState.effect;
  const state = gameState.players.find(v => v.playerId === playerId);
  const sprite = view.td.sprites.find(v => v.playerId === playerId);
  const tdArmdozer = view.td.armdozers.find(v => v.playerId === playerId);
  const endArmdozerEffects = effect.endArmdozerEffects.filter(v => v.playerId === playerId);
  if (!state || !sprite || !tdArmdozer || (endArmdozerEffects.length <= 0)) {
    return empty();
  }

  const endArmdozerEffectAnimation: Animate = endArmdozerEffects
    .map((armdozerEffect): EndArmdozerAnimationParam => ({
      sprite: sprite.sprite,
      tdArmdozer: tdArmdozer,
      endArmdozerEffect: armdozerEffect.effect
    }))
    .map((param: EndArmdozerAnimationParam) => {
      // アームドーザゴトのパラメータに振り分ける
      return empty();
    })
    .reduce((a, b) => a.chain(b), empty());

  return endArmdozerEffectAnimation;
}