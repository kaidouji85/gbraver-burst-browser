import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { NeoLandozerTD } from "../../../../view/td/armdozer-objects/neo-landozer";
import { dolly, track } from "../../../td-camera";
import type { GameOverParamX } from "./game-over-param";

/**
 * ネオランドーザ 勝利
 *
 * @param param パラメータ
 * @returns アニメーション
 */
export function neoLandozerWin(param: GameOverParamX<NeoLandozerTD>): Animate {
  return all(
    param.winnerTdArmdozer.neoLandozer.guts(),
    track(
      param.tdCamera,
      param.winnerTdArmdozer.neoLandozer.getObject3D().position.x,
      800,
    ),
    dolly(param.tdCamera, "-60", 800),
  );
}
