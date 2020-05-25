// @flow

import {Animate} from "../../../../../../animation/animate";
import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState, PlayerId, UpdateRemainingTurn} from "gbraver-burst-core";
import {delay, empty} from "../../../../../../animation/delay";
import type {EndArmdozerEffectParam} from "./animation-param";
import {all} from "../../../../../../animation/all";
import {lightningDozer, toLightningDozerEndArmdozerEffect} from "./lightning-dozer";

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

/**
 * プレイヤー毎 効果継続ターン更新アニメーション
 *
 * @param playerId プレイヤーID
 * @param view ビュー
 * @param sceneState シーンの状態
 * @param gameState ゲームの状態
 * @return アニメーション
 */
function playerUnderRemainingTurn(playerId: PlayerId, view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'UpdateRemainingTurn') {
    return empty();
  }

  const effect: UpdateRemainingTurn = gameState.effect;
  const state = gameState.players.find(v => v.playerId === playerId);
  const sprite = view.td.sprites.find(v => v.playerId === playerId);
  const tdArmdozer = view.td.armdozerObjects.find(v => v.playerId === playerId);
  const endArmdozerEffects = effect.endArmdozerEffects.filter(v => v.playerId === playerId);
  if (!state || !sprite || !tdArmdozer || (endArmdozerEffects.length <= 0)) {
    return empty();
  }

  const endArmdozerEffectAnimation: Animate = endArmdozerEffects
    .map((armdozerEffect): EndArmdozerEffectParam => ({
      sprite: sprite.sprite,
      tdArmdozer: tdArmdozer,
      endArmdozerEffect: armdozerEffect.effect
    }))
    .map((param: EndArmdozerEffectParam): Animate => {
      const lightningDozerParam = toLightningDozerEndArmdozerEffect(param);
      if (lightningDozerParam) {
        return lightningDozer(lightningDozerParam);
      }
      return empty();
    })
    .reduce((a, b) => a.chain(b), empty());

  return endArmdozerEffectAnimation
    .chain(delay(500));
}