import { PilotIds } from "gbraver-burst-core";

import {
  gaiPilotButton,
  raitoPilotButton,
  shinyaPilotButton,
  tsubasaPilotButton,
  yuuyaPilotButton,
} from "../../../../../game-object/pilot-button";
import { PilotButton } from "../../../../../game-object/pilot-button/pilot-button";
import { GenerateHUDLayerObjectParams } from "../generate-params";

/**
 * パイロットIDに対応したパイロットボタンを生成する
 * @param params 生成パラメータ
 * @return パイロットボタン
 */
export function createPilotButton(
  params: GenerateHUDLayerObjectParams,
): PilotButton {
  const { resources, player, gameObjectAction } = params;
  switch (player.pilot.id) {
    case PilotIds.SHINYA:
      return shinyaPilotButton(resources, gameObjectAction);
    case PilotIds.GAI:
      return gaiPilotButton(resources, gameObjectAction);
    case PilotIds.RAITO:
      return raitoPilotButton(resources, gameObjectAction);
    case PilotIds.TSUBASA:
      return tsubasaPilotButton(resources, gameObjectAction);
    case PilotIds.YUUYA:
      return yuuyaPilotButton(resources, gameObjectAction);
    default:
      return shinyaPilotButton(resources, gameObjectAction);
  }
}
