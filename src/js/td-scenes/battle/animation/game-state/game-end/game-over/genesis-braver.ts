import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { GenesisBraverTD } from "../../../../view/td/armdozer-objects/genesis-braver";
import { dolly, track } from "../../../td-camera";
import { GameOverParamX } from "./game-over-param";

/**
 * ジェネシスブレイバー 勝利
 * @param param パラメータ
 * @returns アニメーション
 */
export function genesisBraverWin(
  param: GameOverParamX<GenesisBraverTD>,
): Animate {
  return all(
    param.winnerTdArmdozer.genesisBraver.burst(),
    track(
      param.tdCamera,
      param.winnerTdArmdozer.genesisBraver.getObject3D().position.x,
      800,
    ),
    dolly(param.tdCamera, "-60", 800),
  );
}
