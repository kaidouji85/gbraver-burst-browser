// @flow

import {BattleSceneView} from "../../view";
import type {BattleSceneState} from "../../state/battle-scene-state";
import type {GameState} from "gbraver-burst-core";
import {Animate} from "../../../../../animation/animate";
import {delay, empty} from "../../../../../animation/delay";
import type {ArmDozerSprite} from "../../../../../game-object/armdozer/armdozer-sprite";
import type {TDPlayer} from "../../view/td/player";
import {all} from "../../../../../animation/all";
import type {PlayerState} from "gbraver-burst-core";
import type {Reflect} from "gbraver-burst-core";

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
  if (!state || !sprite || !tdPlayer) {
    return empty();
  }

  const animationParam: ReflectAnimationParam = {
    effect: effect,
    state: state,
    sprite: sprite.sprite,
    tdPlayer: tdPlayer
  };

  if (effect.effect === 'Lightning' && effect.isDeath) {
    return deathLightning(animationParam);
  }

  if (effect.effect === 'Lightning') {
    return lightning(animationParam);
  }

  return empty();
}

type ReflectAnimationParam = {
  effect: Reflect,
  state: PlayerState,
  sprite: ArmDozerSprite,
  tdPlayer: TDPlayer,
};

function lightning(param: ReflectAnimationParam): Animate {
  return all(
    param.sprite.knockBack(),
    param.tdPlayer.damageIndicator.popUp(param.effect.damage),
    param.tdPlayer.gauge.hp(param.state.armdozer.hp),
  ).chain(delay(500)
  ).chain(param.sprite.knockBackToStand()
  ).chain(delay(500));
}

function deathLightning(param: ReflectAnimationParam): Animate {
  return all(
    param.sprite.down(),
    param.tdPlayer.damageIndicator.popUp(param.effect.damage),
    param.tdPlayer.gauge.hp(param.state.armdozer.hp),
  ).chain(delay(500));
}