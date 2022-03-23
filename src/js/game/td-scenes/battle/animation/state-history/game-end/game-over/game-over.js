// @flow
import type {GameOverParam} from "./game-over-param";
import {castShinBraverGameOver, shinBraverWin} from "./shin-braver";
import {castNeoLandozerGameOver, neoLandozerWin} from "./neo-landozer";
import {castLightningDozerGameOver, lightningDozerWin} from "./lightning-dozer";
import {castWingDozerGameOver, wingDozerWin} from "./wing-dozer";
import {empty} from "../../../../../../../animation/delay";
import {Animate} from "../../../../../../../animation/animate";

/**
 * ゲームオーバアニメーション
 *
 * @param param アニメーションパラメータ
 * @return アニメーション
 */
export function gameOverAnimation(param: GameOverParam): Animate {
  const shinBraver = castShinBraverGameOver(param);
  if (shinBraver) {
    return shinBraverWin(shinBraver);
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