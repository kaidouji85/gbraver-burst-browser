import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { empty } from "../../../../../../animation/delay";
import { onStart } from "../../../../../../animation/on-start";
import { play } from "../../../../../../bgm/bgm-operators";
import { WingDozerTD } from "../../../../view/td/armdozer-objects/wing-dozer";
import { GameOverParamX } from "./game-over-param";

/**
 * ウィングドーザにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToWingDozer(param: GameOverParamX<WingDozerTD>): Animate {
  const duration = 800;
  const x = param.winnerTdArmdozer.wingDozer.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * ウィングドーザ 勝利
 * @param param パラメータ
 * @returns アニメーション
 */
export function wingDozerWin(param: GameOverParamX<WingDozerTD>): Animate {
  return all(
    param.winnerTdArmdozer.wingDozer.dash(),
    focusToWingDozer(param),
    onStart(() => param.bgm.do(play(param.battleEndBGM))),
  ).chain(empty(), param.winnerHUD.resultIndicator.slideInToEdge());
}
