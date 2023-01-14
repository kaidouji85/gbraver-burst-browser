import {Burst} from "gbraver-burst-core";
import {BurstAnimationParamX} from "./animation-param";
import {GenesisBraverTD} from "../../../view/td/armdozer-objects/genesis-braver";
import {HUDArmdozerObjects} from "../../../view/hud/armdozer-objects/hud-armdozer-ibjects";
import {Animate} from "../../../../../animation/animate";
import {empty} from "../../../../../animation/delay";

/**
 * ジェネシスブレイバー バーストアニメーションパラメータ
 *
 * @template BURST バースト
 */
export type GenesisBraverBurst<BURST extends Burst> = BurstAnimationParamX<
  GenesisBraverTD,
  HUDArmdozerObjects,
  BURST
>;

/**
 * ジェネシスブレイバー バーストアニネーション
 * @param param パラメータ
 * @return アニメーション
 */
export function genesisBraverBurst(param: GenesisBraverBurst<Burst>): Animate {
  return empty();
}