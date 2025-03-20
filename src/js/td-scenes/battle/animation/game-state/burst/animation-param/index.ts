import { Burst, BurstEffect, GameStateX } from "gbraver-burst-core";

import { HUDArmdozerObjects } from "../../../../view/hud/armdozer-objects/hud-armdozer-objects";
import { TDArmdozerObjects } from "../../../../view/td/armdozer-objects/armdozer-objects";
import { StateAnimationProps } from "../../state-animation-props";
import { AttackerParam, toAttackerParam } from "./attacker-param";
import { BurstPlayerParam, toBurstPlayerParam } from "./burst-player-param";
import { OtherParam, toOtherParam } from "./other-param";
import { OtherPlayerParam, toOtherPlayerParam } from "./other-player-param";

/**
 * バーストアニメーションのパラメータ
 * 本typeを直接指定してはいけない
 * @template TD_ARMDOZER TDアームドーザ
 * @template HUD_ARMDOZER HUDアームドーザ
 * @template BURST バースト
 */
export type BurstAnimationParamX<
  TD_ARMDOZER extends TDArmdozerObjects,
  HUD_ARMDOZER extends HUDArmdozerObjects,
  BURST extends Burst,
> = BurstPlayerParam<TD_ARMDOZER, HUD_ARMDOZER, BURST> &
  AttackerParam &
  OtherPlayerParam &
  OtherParam;

/** バーストアニメーションのパラメータ */
export type BurstAnimationParam = BurstAnimationParamX<
  TDArmdozerObjects,
  HUDArmdozerObjects,
  Burst
>;

/**
 * バーストアニメーションパラメータを生成する
 *
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームステート
 * @returns バーストアニメーションパラメータ
 */
export function toBurstAnimationParam(
  props: StateAnimationProps,
  gameState: GameStateX<BurstEffect>,
): BurstAnimationParam | null {
  const burstPlayerParam = toBurstPlayerParam(props, gameState);
  const otherPlayerParam = toOtherPlayerParam(props, gameState);
  const attackerParam = toAttackerParam(props, gameState);
  if (!burstPlayerParam || !otherPlayerParam || !attackerParam) {
    return null;
  }

  return {
    ...burstPlayerParam,
    ...otherPlayerParam,
    ...attackerParam,
    ...toOtherParam(props),
  };
}
