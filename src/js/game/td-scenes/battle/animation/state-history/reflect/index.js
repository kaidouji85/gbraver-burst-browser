// @flow

import {BattleSceneView} from "../../../view";
import type {BattleSceneState} from "../../../state/battle-scene-state";
import type {GameState, Reflect} from "gbraver-burst-core";
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
export function reflectAnimation(view: BattleSceneView, sceneState: BattleSceneState, gameState: GameState): Animate {
  if (gameState.effect.name !== 'Reflect') {
    return empty();
  }

  const effect: Reflect = gameState.effect;
  const state = gameState.players.find(v => v.playerId === effect.damagedPlayer);
  const sprite = view.td.sprites.find(v => v.playerId === effect.damagedPlayer);
  const tdPlayer = view.td.players.find(v => v.playerId === effect.damagedPlayer);
  const hudPlayer = view.hud.playres.find(v => v.playerId === effect.damagedPlayer);
  if (!state || !sprite || !tdPlayer || !hudPlayer) {
    return empty();
  }

  const animationParam: ReflectAnimationParam = {
    effect: effect,
    state: state,
    sprite: sprite.sprite,
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