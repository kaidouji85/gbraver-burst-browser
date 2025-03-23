import { GameEndX, GameOver, GameStateX } from "gbraver-burst-core";

import { Animate } from "../../../../../../animation/animate";
import { empty } from "../../../../../../animation/delay";
import { GenesisBraverTD } from "../../../../view/td/armdozer-objects/genesis-braver";
import { GranDozerTD } from "../../../../view/td/armdozer-objects/gran-dozer";
import { LightningDozerTD } from "../../../../view/td/armdozer-objects/lightning-dozer";
import { NeoLandozerTD } from "../../../../view/td/armdozer-objects/neo-landozer";
import { ShinBraverTD } from "../../../../view/td/armdozer-objects/shin-braver";
import { WingDozerTD } from "../../../../view/td/armdozer-objects/wing-dozer";
import { StateAnimationProps } from "../../state-animation-props";
import { toGameOverParam } from "./game-over-param";
import { genesisBraverWin } from "./genesis-braver";
import { granDozerWin } from "./gran-dozer";
import { lightningDozerWin } from "./lightning-dozer";
import { neoLandozerWin } from "./neo-landozer";
import { shinBraverWin } from "./shin-braver";
import { wingDozerWin } from "./wing-dozer";

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

  let animation = empty();
  const { winnerTdArmdozer } = param;
  if (winnerTdArmdozer instanceof ShinBraverTD) {
    animation = shinBraverWin({ ...param, winnerTdArmdozer });
  } else if (winnerTdArmdozer instanceof NeoLandozerTD) {
    animation = neoLandozerWin({ ...param, winnerTdArmdozer });
  } else if (winnerTdArmdozer instanceof LightningDozerTD) {
    animation = lightningDozerWin({ ...param, winnerTdArmdozer });
  } else if (winnerTdArmdozer instanceof WingDozerTD) {
    animation = wingDozerWin({ ...param, winnerTdArmdozer });
  } else if (winnerTdArmdozer instanceof GenesisBraverTD) {
    animation = genesisBraverWin({ ...param, winnerTdArmdozer });
  } else if (winnerTdArmdozer instanceof GranDozerTD) {
    animation = granDozerWin({ ...param, winnerTdArmdozer });
  }

  return animation;
}
