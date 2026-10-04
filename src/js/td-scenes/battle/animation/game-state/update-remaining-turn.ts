import type { GameStateX, UpdateRemainingTurn } from "gbraver-burst-core";

import { all } from "../../../../animation/object-animation/all";
import { Animate } from "../../../../animation/object-animation/animate";
import { empty } from "../../../../animation/object-animation/delay";
import { LightningDozerTD } from "../../view/td/armdozer-objects/lightning-dozer";
import type { StateAnimationProps } from "./state-animation-props";

/**
 * 効果継続ターン更新アニメーション
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームの状態
 * @returns アニメーション
 */
export function updateRemainingTurnAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<UpdateRemainingTurn>,
): Animate {
  const endLightningBarrier = gameState.effect.endArmdozerEffects.filter(
    (end) =>
      end.effect.type === "TryReflect" && end.effect.effect === "Lightning",
  );
  const endLightningBarrierAnimates: Animate[] = props.view.td.armdozers
    .filter((td) =>
      endLightningBarrier.find((end) => end.playerId === td.playerId),
    )
    .map((td) =>
      td instanceof LightningDozerTD ? td.lightningBarrier.hidden() : empty(),
    );
  return all(...endLightningBarrierAnimates);
}
