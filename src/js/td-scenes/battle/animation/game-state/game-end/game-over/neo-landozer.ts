import { all } from "../../../../../../animation/all";
import { Animate } from "../../../../../../animation/animate";
import { empty } from "../../../../../../animation/delay";
import { onStart } from "../../../../../../animation/on-start";
import { play } from "../../../../../../bgm/bgm-operators";
import { NeoLandozerTD } from "../../../../view/td/armdozer-objects/neo-landozer";
import { GameOverParamX } from "./game-over-param";

/**
 * ネオランドーザにフォーカスを合わせる
 * @param param パラメータ
 * @returns アニメーション
 */
function focusToNeoLandozer(param: GameOverParamX<NeoLandozerTD>): Animate {
  const duration = 800;
  const x = param.winnerTdArmdozer.neoLandozer.getObject3D().position.x;
  const z = "-60";
  return all(
    param.tdCamera.move({ x, z }, duration),
    param.tdCamera.lookAt({ x, z }, duration),
  );
}

/**
 * ネオランドーザ 勝利
 * @param param パラメータ
 * @returns アニメーション
 */
export function neoLandozerWin(param: GameOverParamX<NeoLandozerTD>): Animate {
  return all(
    param.winnerTdArmdozer.neoLandozer.guts(),
    focusToNeoLandozer(param),
    onStart(() => param.bgm.do(play(param.battleEndBGM))),
  ).chain(empty(), param.winnerHUD.resultIndicator.slideInToEdge());
}
