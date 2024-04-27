import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { LightningDozerTD } from "../../../../view/td/armdozer-objects/lightning-dozer";
import { dolly, track } from "../../../td-camera";
import type { GameOverParamX } from "./game-over-param";

/**
 * ライトニングドーザ  勝利
 *
 * @param param パラメータ
 * @returns アニメーション
 */
export function lightningDozerWin(
  param: GameOverParamX<LightningDozerTD>,
): Animate {
  return all(
    param.winnerTdArmdozer.lightningDozer.guts(),
    track(
      param.tdCamera,
      param.winnerTdArmdozer.lightningDozer.getObject3D().position.x,
      800,
    ),
    dolly(param.tdCamera, "-60", 800),
  );
}
