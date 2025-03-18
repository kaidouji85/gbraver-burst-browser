import { BurstEffect, GameStateX } from "gbraver-burst-core";

import { TDArmdozerObjects } from "../../../../view/td/armdozer-objects/armdozer-objects";
import { StateAnimationProps } from "../../state-animation-props";

/** 攻撃側バーストアニメーションのパラメータ */
export type AttackerParam = {
  /** 攻撃側3Dアームドーザ */
  readonly attackerArmdozerTD: TDArmdozerObjects;
};

/**
 * 攻撃側バーストアニメーションパラメータを生成する
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns 生成結果、生成できない場合はnull
 */
export function toAttackerParam(
  props: StateAnimationProps,
  gameState: GameStateX<BurstEffect>,
): AttackerParam | null {
  const attackerArmdozerTD = props.view.td.armdozers.find(
    (v) => v.playerId === gameState.activePlayerId,
  );

  if (!attackerArmdozerTD) {
    return null;
  }

  return { attackerArmdozerTD };
}
