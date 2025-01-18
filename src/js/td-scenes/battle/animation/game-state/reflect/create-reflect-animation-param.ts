import { GameStateX, Reflect } from "gbraver-burst-core";

import { StateAnimationProps } from "../state-animation-props";
import { ReflectAnimationParam } from "./animation-param";

/**
 * ダメージ反射のアニメーションパラメータを生成する
 * @param props ステートアニメーションプロパティ
 * @param gameState ゲームステート
 * @returns 生成結果、生成できない場合はnullを返す
 */
export function createReflectAnimationParam(
  props: StateAnimationProps,
  gameState: GameStateX<Reflect>,
): ReflectAnimationParam | null {
  const { view } = props;
  const { effect, players } = gameState;
  const stateOfDamaged = players.find(
    (v) => v.playerId === effect.damagedPlayer,
  );
  const tdArmdozerOfDamaged = view.td.armdozers.find(
    (v) => v.playerId === effect.damagedPlayer,
  );
  const tdPlayerOfDamaged = view.td.players.find(
    (v) => v.playerId === effect.damagedPlayer,
  );
  const hudPlayerOfDamaged = view.hud.players.find(
    (v) => v.playerId === effect.damagedPlayer,
  );
  const stateOfReflecting = players.find(
    (v) => v.playerId !== effect.damagedPlayer,
  );
  const hudPlayerOfReflecting = view.hud.players.find(
    (v) => v.playerId !== effect.damagedPlayer,
  );
  if (
    !stateOfDamaged ||
    !tdArmdozerOfDamaged ||
    !tdPlayerOfDamaged ||
    !hudPlayerOfDamaged ||
    !stateOfReflecting ||
    !hudPlayerOfReflecting
  ) {
    return null;
  }

  const { drawIndicator } = view.hud.gameObjects;
  const damaged = {
    state: stateOfDamaged,
    sprite: tdArmdozerOfDamaged.sprite(),
    td: tdPlayerOfDamaged,
    hud: hudPlayerOfDamaged,
  };
  const reflecting = {
    state: stateOfReflecting,
    hud: hudPlayerOfReflecting,
  };
  return { effect, drawIndicator, damaged, reflecting };
}
