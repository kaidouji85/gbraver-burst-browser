import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { GenesisBraverTD } from "../../../../view/td/armdozer-objects/genesis-braver";
import { GameOverParamX } from "./game-over-param";

/**
 * ジェネシスブレイバーにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToGenesisBraver(param: GameOverParamX<GenesisBraverTD>): Animate {
  const duration = 800;
  const x = param.winnerTdArmdozer.genesisBraver.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );

}

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
    focusToGenesisBraver(param),
  );
}
