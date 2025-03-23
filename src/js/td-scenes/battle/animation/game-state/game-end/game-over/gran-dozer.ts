import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { GranDozerTD } from "../../../../view/td/armdozer-objects/gran-dozer";
import { GameOverParamX } from "./game-over-param";

/**
 * グランドーザにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToGranDozer(param: GameOverParamX<GranDozerTD>): Animate {
  const duration = 800;
  const x = param.winnerTdArmdozer.granDozer.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * グランドーザ 勝利
 * @param param パラメータ
 * @returns アニメーション
 */
export function granDozerWin(param: GameOverParamX<GranDozerTD>): Animate {
  return all(param.winnerTdArmdozer.granDozer.burst(), focusToGranDozer(param));
}
