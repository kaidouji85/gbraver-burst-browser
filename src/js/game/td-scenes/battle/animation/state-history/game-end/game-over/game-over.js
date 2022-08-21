// @flow
import {Animate} from "../../../../../../../animation/animate";
import {empty} from "../../../../../../../animation/delay";
import {ShinBraverTD} from "../../../../view/td/armdozer-objects/shin-braver";
import type {GameOverParam} from "./game-over-param";
import {castLightningDozerGameOver, lightningDozerWin} from "./lightning-dozer";
import {castNeoLandozerGameOver, neoLandozerWin} from "./neo-landozer";
import {shinBraverWin} from "./shin-braver";
import {castWingDozerGameOver, wingDozerWin} from "./wing-dozer";

/**
 * ゲームオーバアニメーション
 *
 * @param param アニメーションパラメータ
 * @return アニメーション
 */
export function gameOverAnimation(param: GameOverParam): Animate {
  if (param.winnerTdArmdozer instanceof ShinBraverTD) {
    const winnerTdArmdozer: ShinBraverTD = param.winnerTdArmdozer;
    return shinBraverWin({...param, winnerTdArmdozer});
  }

  const neoLandozer = castNeoLandozerGameOver(param);
  if (neoLandozer) {
    return neoLandozerWin(neoLandozer);
  }

  const lightningDozer = castLightningDozerGameOver(param);
  if (lightningDozer) {
    return lightningDozerWin(lightningDozer);
  }

  const wingDozer = castWingDozerGameOver(param);
  if (wingDozer) {
    return wingDozerWin(wingDozer);
  }

  return empty();
}