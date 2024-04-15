import { PilotIds } from "gbraver-burst-core";

import {
  gaiPilotButton,
  raitoPilotButton,
  shinyaPilotButton,
  tsubasaPilotButton,
  yuuyaPilotButton,
} from "../../../../../game-object/pilot-button";
import { PilotButton } from "../../../../../game-object/pilot-button/pilot-button";
import { HUDLayerObjectCreatorParams } from "../creator-params";

/**
 * パイロットIDに対応したパイロットボタンを生成する
 * @param params 生成パラメータ
 * @return パイロットボタン
 */
export function createPilotButton(
  params: HUDLayerObjectCreatorParams,
): PilotButton {
  const { player } = params;
  switch (player.pilot.id) {
    case PilotIds.SHINYA:
      return shinyaPilotButton(params);
    case PilotIds.GAI:
      return gaiPilotButton(params);
    case PilotIds.RAITO:
      return raitoPilotButton(params);
    case PilotIds.TSUBASA:
      return tsubasaPilotButton(params);
    case PilotIds.YUUYA:
      return yuuyaPilotButton(params);
    default:
      return shinyaPilotButton(params);
  }
}
