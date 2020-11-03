// @flow

import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameStateX, Reflect} from "gbraver-burst-core";
import {Animate} from "../../../../../../animation/animate";
import {empty} from "../../../../../../animation/delay";
import type {ReflectAnimationParam} from "./animation-param";
import {deathLightning, lightning} from "./lightning";

/**
 * ダメージ反射のアニメーション
 *
 * @param view ビュー
 * @param sceneState シーンステート
 * @param gameState ゲームステート
 * @return アニメーション
 */
export function reflectAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameStateX<Reflect>): Animate {
  const effect: Reflect = gameState.effect;
  const state = gameState.players.find(v => v.playerId === effect.damagedPlayer);
  const tdArmdozer = view.td.armdozerObjects.find(v => v.playerId === effect.damagedPlayer);
  const tdPlayer = view.td.players.find(v => v.playerId === effect.damagedPlayer);
  const hudPlayer = view.hud.players.find(v => v.playerId === effect.damagedPlayer);
  if (!state || !tdArmdozer || !tdPlayer || !hudPlayer) {
    return empty();
  }

  const animationParam: ReflectAnimationParam = {
    effect: effect,
    state: state,
    sprite: tdArmdozer.sprite(),
    tdPlayer: tdPlayer,
    hudPlayer: hudPlayer,
  };

  if (effect.effect === 'Lightning' && effect.isDeath) {
    return deathLightning(animationParam);
  }

  if (effect.effect === 'Lightning') {
    return lightning(animationParam);
  }

  return empty();
}