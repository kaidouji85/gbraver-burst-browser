import type { BattleResult, GameStateX, RightItself } from "gbraver-burst-core";

import { Animate } from "../../../../animation/animate";
import { delay, empty } from "../../../../animation/delay";
import type { ArmdozerSprite } from "../../../../game-object/armdozer/armdozer-sprite";
import type { StateAnimationProps } from "./state-animation-props";

/**
 * 防御側 体勢整え
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲーム状態
 * @return アニメーション
 */
export function rightItselfAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<RightItself>,
): Animate {
  if (gameState.effect.name !== "RightItself") {
    return empty();
  }

  const effect: RightItself = gameState.effect;
  const defenderArmdozer = props.view.td.armdozers.find(
    (v) => v.playerId === effect.defender,
  );

  if (!defenderArmdozer) {
    return empty();
  }

  return getMotion(defenderArmdozer.sprite(), effect.battleResult).chain(
    delay(300),
  );
}

/**
 * 戦闘結果に応じたモーションを取得する
 *
 * @param sprite スプライト
 * @param battleResult 戦闘結果
 * @return アニメーション
 */
function getMotion(
  sprite: ArmdozerSprite,
  battleResult: BattleResult,
): Animate {
  if (battleResult.name === "NormalHit") {
    return sprite.knockBackToStand();
  }

  if (battleResult.name === "CriticalHit") {
    return sprite.knockBackToStand();
  }

  if (battleResult.name === "Guard") {
    return sprite.guardToStand();
  }

  if (battleResult.name === "Miss") {
    return sprite.avoidToStand();
  }

  if (battleResult.name === "Feint" && battleResult.isDefenderMoved) {
    return sprite.avoidToStand();
  }

  return empty();
}
