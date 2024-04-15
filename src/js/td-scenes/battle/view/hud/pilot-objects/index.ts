import { PilotIds } from "gbraver-burst-core";

import { HUDLayerObjectCreatorParams } from "../creator-params";
import { enemyGaiHUD, playerGaiHUD } from "./gai";
import type { HUDPilotObjects } from "./hud-pilot-objects";
import { enemyRaitoHUD, playerRaitoHUD } from "./raito";
import { enemyShinyaHUD, playerShinyaHUD } from "./shinya";
import { enemyTsubasaHUD, playerTsubasaHUD } from "./tsubasa";
import { enemyYuuyaHUD, playerYuuyaHUD } from "./yuuya";

/**
 * プレイヤー側 HUDパイロット
 * @param params 生成パラメータ
 * @return HUDパイロット
 */
export function playerHUDPilotObjects(
  params: HUDLayerObjectCreatorParams,
): HUDPilotObjects {
  const { player } = params;
  switch (player.pilot.id) {
    case PilotIds.SHINYA:
      return playerShinyaHUD(params);
    case PilotIds.GAI:
      return playerGaiHUD(params);
    case PilotIds.RAITO:
      return playerRaitoHUD(params);
    case PilotIds.TSUBASA:
      return playerTsubasaHUD(params);
    case PilotIds.YUUYA:
      return playerYuuyaHUD(params);
    default:
      return playerShinyaHUD(params);
  }
}

/**
 * 敵側 HUDパイロット
 * @param params 生成パラメータ
 * @return HUDパイロット
 */
export function enemyHUDPilotObjects(
  params: HUDLayerObjectCreatorParams,
): HUDPilotObjects {
  const { enemy } = params;
  switch (enemy.pilot.id) {
    case PilotIds.SHINYA:
      return enemyShinyaHUD(params);
    case PilotIds.GAI:
      return enemyGaiHUD(params);
    case PilotIds.RAITO:
      return enemyRaitoHUD(params);
    case PilotIds.TSUBASA:
      return enemyTsubasaHUD(params);
    case PilotIds.YUUYA:
      return enemyYuuyaHUD(params);
    default:
      return enemyShinyaHUD(params);
  }
}
