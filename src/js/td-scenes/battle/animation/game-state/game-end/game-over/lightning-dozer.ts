import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { LightningDozerTD } from "../../../../view/td/armdozer-objects/lightning-dozer";
import type { GameOverParamX } from "./game-over-param";

/**
 * ライトニングドーザにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToLightningDozer(param: GameOverParamX<LightningDozerTD>): Animate {
  const duration = 800;
  const x = param.winnerTdArmdozer.lightningDozer.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * ライトニングドーザ  勝利
 * @param param パラメータ
 * @returns アニメーション
 */
export function lightningDozerWin(
  param: GameOverParamX<LightningDozerTD>,
): Animate {
  return all(
    param.winnerTdArmdozer.lightningDozer.guts(),
    focusToLightningDozer(param),
  );
}
