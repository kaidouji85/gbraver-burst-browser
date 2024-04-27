import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { WingDozerTD } from "../../../../view/td/armdozer-objects/wing-dozer";
import { dolly, track } from "../../../td-camera";
import type { GameOverParamX } from "./game-over-param";

/**
 * ウィングドーザ 勝利
 *
 * @param param パラメータ
 * @returns アニメーション
 */
export function wingDozerWin(param: GameOverParamX<WingDozerTD>): Animate {
  return all(
    param.winnerTdArmdozer.wingDozer.dash(),
    track(
      param.tdCamera,
      param.winnerTdArmdozer.wingDozer.getObject3D().position.x,
      800,
    ),
    dolly(param.tdCamera, "-60", 800),
  );
}
