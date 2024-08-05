import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { ShinBraverTD } from "../../../../view/td/armdozer-objects/shin-braver";
import type { GameOverParamX } from "./game-over-param";

/**
 * シンブレイバーにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToShinBraver(param: GameOverParamX<ShinBraverTD>): Animate {
  const duration = 800;
  const x = param.winnerTdArmdozer.shinBraver.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * シンブレイバー 勝利
 * @param param パラメータ
 * @returns アニメーション
 */
export function shinBraverWin(param: GameOverParamX<ShinBraverTD>): Animate {
  return all(
    param.winnerTdArmdozer.shinBraver.guts(),
    focusToShinBraver(param),
  );
}
