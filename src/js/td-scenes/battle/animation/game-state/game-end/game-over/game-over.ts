import { Animate } from "../../../../../../animation/animate";
import { empty } from "../../../../../../animation/delay";
import { GenesisBraverTD } from "../../../../view/td/armdozer-objects/genesis-braver";
import { LightningDozerTD } from "../../../../view/td/armdozer-objects/lightning-dozer";
import { NeoLandozerTD } from "../../../../view/td/armdozer-objects/neo-landozer";
import { ShinBraverTD } from "../../../../view/td/armdozer-objects/shin-braver";
import { WingDozerTD } from "../../../../view/td/armdozer-objects/wing-dozer";
import type { GameOverParam } from "./game-over-param";
import { genesisBraverWin } from "./genesis-braver";
import { lightningDozerWin } from "./lightning-dozer";
import { neoLandozerWin } from "./neo-landozer";
import { shinBraverWin } from "./shin-braver";
import { wingDozerWin } from "./wing-dozer";

/**
 * ゲームオーバアニメーション
 *
 * @param param アニメーションパラメータ
 * @returns アニメーション
 */
export function gameOverAnimation(param: GameOverParam): Animate {
  if (param.winnerTdArmdozer instanceof ShinBraverTD) {
    const winnerTdArmdozer: ShinBraverTD = param.winnerTdArmdozer;
    return shinBraverWin({ ...param, winnerTdArmdozer });
  }

  if (param.winnerTdArmdozer instanceof NeoLandozerTD) {
    const winnerTdArmdozer: NeoLandozerTD = param.winnerTdArmdozer;
    return neoLandozerWin({ ...param, winnerTdArmdozer });
  }

  if (param.winnerTdArmdozer instanceof LightningDozerTD) {
    const winnerTdArmdozer: LightningDozerTD = param.winnerTdArmdozer;
    return lightningDozerWin({ ...param, winnerTdArmdozer });
  }

  if (param.winnerTdArmdozer instanceof WingDozerTD) {
    const winnerTdArmdozer: WingDozerTD = param.winnerTdArmdozer;
    return wingDozerWin({ ...param, winnerTdArmdozer });
  }

  if (param.winnerTdArmdozer instanceof GenesisBraverTD) {
    const winnerTdArmdozer: GenesisBraverTD = param.winnerTdArmdozer;
    return genesisBraverWin({ ...param, winnerTdArmdozer });
  }

  return empty();
}
