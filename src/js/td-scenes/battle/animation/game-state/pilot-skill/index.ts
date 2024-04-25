import type { GameStateX, PilotSkillEffect } from "gbraver-burst-core";

import { Animate } from "../../../../../animation/animate";
import { empty } from "../../../../../animation/delay";
import { GaiHUD } from "../../../view/hud/pilot-objects/gai";
import { RaitoHUD } from "../../../view/hud/pilot-objects/raito";
import { ShinyaHUD } from "../../../view/hud/pilot-objects/shinya";
import { TsubasaHUD } from "../../../view/hud/pilot-objects/tsubasa";
import { YuuyaHUD } from "../../../view/hud/pilot-objects/yuuya";
import type { StateAnimationProps } from "../state-animation-props";
import type { PilotSkillAnimationParam } from "./animation-param";
import { toPilotSkillAnimationParam } from "./animation-param";
import { gaiAnimation } from "./gai";
import { raitoAnimation } from "./raito";
import { shinyaAnimation } from "./shinya";
import { tsubasaAnimation } from "./tsubasa";
import { yuuyaAnimation } from "./yuuya";

/**
 * パイロット効果 アニメーション
 * @param props 戦闘シーンプロパティ
 * @param gameState ゲーム状態
 * @returns アニメーション
 */
export function pilotSkillAnimation(
  props: StateAnimationProps,
  gameState: GameStateX<PilotSkillEffect>,
): Animate {
  const param = toPilotSkillAnimationParam(props, gameState);
  if (!param) {
    return empty();
  }

  return cutIn(param);
}

/**
 * パイロットカットイン
 * @param param パラメータ
 * @returns アニメーション
 */
function cutIn(param: PilotSkillAnimationParam): Animate {
  if (param.pilot instanceof ShinyaHUD) {
    const pilot: ShinyaHUD = param.pilot;
    return shinyaAnimation({ ...param, pilot });
  }

  if (param.pilot instanceof GaiHUD) {
    const pilot: GaiHUD = param.pilot;
    return gaiAnimation({ ...param, pilot });
  }

  if (param.pilot instanceof RaitoHUD) {
    const pilot: RaitoHUD = param.pilot;
    return raitoAnimation({ ...param, pilot });
  }

  if (param.pilot instanceof TsubasaHUD) {
    const pilot: TsubasaHUD = param.pilot;
    return tsubasaAnimation({ ...param, pilot });
  }

  if (param.pilot instanceof YuuyaHUD) {
    const pilot: YuuyaHUD = param.pilot;
    return yuuyaAnimation({ ...param, pilot });
  }

  return empty();
}
