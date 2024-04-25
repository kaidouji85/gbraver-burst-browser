import type { GameStateX, Reflect } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import type { StateAnimationProps } from "../state-animation-props";
import type { ReflectAnimationParam } from "./animation-param";
import { deathLightning, lightning } from "./lightning";

/**
 * ダメージ反射のアニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns アニメーション
 */
export function reflectAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<Reflect>,
): Animate {
  const effect: Reflect = gameState.effect;
  const stateOfDamaged = gameState.players.find(
    (v) => v.playerId === effect.damagedPlayer,
  );
  const tdArmdozerOfDamaged = props.view.td.armdozers.find(
    (v) => v.playerId === effect.damagedPlayer,
  );
  const tdPlayerOfDamaged = props.view.td.players.find(
    (v) => v.playerId === effect.damagedPlayer,
  );
  const hudPlayerOfDamaged = props.view.hud.players.find(
    (v) => v.playerId === effect.damagedPlayer,
  );
  const hudPlayerOfReflecting = props.view.hud.players.find(
    (v) => v.playerId !== effect.damagedPlayer,
  );

  if (
    !stateOfDamaged ||
    !tdArmdozerOfDamaged ||
    !tdPlayerOfDamaged ||
    !hudPlayerOfDamaged ||
    !hudPlayerOfReflecting
  ) {
    return empty();
  }

  const damaged = {
    state: stateOfDamaged,
    sprite: tdArmdozerOfDamaged.sprite(),
    td: tdPlayerOfDamaged,
    hud: hudPlayerOfDamaged,
  };
  const reflecting = {
    hud: hudPlayerOfReflecting,
  };
  const animationParam: ReflectAnimationParam = {
    effect,
    damaged,
    reflecting,
  };

  if (effect.effect === "Lightning" && effect.isDeath) {
    return deathLightning(animationParam);
  }

  if (effect.effect === "Lightning") {
    return lightning(animationParam);
  }

  return empty();
}
