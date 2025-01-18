import { Animate } from "../../../../../../animation/animate";
import { empty } from "../../../../../../animation/delay";
import { GenesisBraverTD } from "../../../../view/td/armdozer-objects/genesis-braver";
import { LightningDozerTD } from "../../../../view/td/armdozer-objects/lightning-dozer";
import { NeoLandozerTD } from "../../../../view/td/armdozer-objects/neo-landozer";
import { ShinBraverTD } from "../../../../view/td/armdozer-objects/shin-braver";
import { WingDozerTD } from "../../../../view/td/armdozer-objects/wing-dozer";
import { toGameOverParam } from "./game-over-param";
import { genesisBraverWin } from "./genesis-braver";
import { lightningDozerWin } from "./lightning-dozer";
import { neoLandozerWin } from "./neo-landozer";
import { shinBraverWin } from "./shin-braver";
import { wingDozerWin } from "./wing-dozer";
import { StateAnimationProps } from "../../state-animation-props";
import { GameEndX, GameOver, GameStateX } from "gbraver-burst-core";

/**
 * ゲームオーバアニメーション
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲームの状態
 * @returns アニメーション
 */
export function gameOverAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<GameEndX<GameOver>>,
): Animate {
  const param = toGameOverParam(props, gameState.effect.result);
  if (!param) {
    return empty();
  }

  const { winnerTdArmdozer } = param;
  if (winnerTdArmdozer instanceof ShinBraverTD) {
    return shinBraverWin({ ...param, winnerTdArmdozer });
  }

  if (winnerTdArmdozer instanceof NeoLandozerTD) {
    return neoLandozerWin({ ...param, winnerTdArmdozer });
  }

  if (winnerTdArmdozer instanceof LightningDozerTD) {
    return lightningDozerWin({ ...param, winnerTdArmdozer });
  }

  if (winnerTdArmdozer instanceof WingDozerTD) {
    return wingDozerWin({ ...param, winnerTdArmdozer });
  }

  if (winnerTdArmdozer instanceof GenesisBraverTD) {
    return genesisBraverWin({ ...param, winnerTdArmdozer });
  }

  return empty();
}
