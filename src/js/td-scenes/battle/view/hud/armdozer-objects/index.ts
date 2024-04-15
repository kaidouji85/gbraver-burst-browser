import { ArmdozerIds } from "gbraver-burst-core";

import { HUDLayerObjectCreatorParams } from "../creator-params";
import { EmptyHUDArmdozer } from "./empty";
import {
  enemyGenesisBraverHUD,
  playerGenesisBraverHUD,
} from "./genesis-braver";
import type { HUDArmdozerObjects } from "./hud-armdozer-objects";
import {
  enemyLightningDozerHUD,
  playerLightningDozerHUD,
} from "./lightning-dozer";
import { enemyNeoLandozerHUD, playerNeoLandozerHUD } from "./neo-landozer";
import { enemyShinBraverHUD, playerShinBraverHUD } from "./shin-braver";
import { enemyWingDozerHUD, playerWingDozerHUD } from "./wing-dozer";

/**
 * プレイヤー側 HUDアームドーザ
 * @param params 生成パラメータ
 * @return HUDアームドーザ
 */
export function playerArmdozerHUD(
  params: HUDLayerObjectCreatorParams,
): HUDArmdozerObjects {
  const { player } = params;
  switch (player.armdozer.id) {
    case ArmdozerIds.SHIN_BRAVER:
      return playerShinBraverHUD(params);
    case ArmdozerIds.NEO_LANDOZER:
      return playerNeoLandozerHUD(params);
    case ArmdozerIds.LIGHTNING_DOZER:
      return playerLightningDozerHUD(params);
    case ArmdozerIds.WING_DOZER:
      return playerWingDozerHUD(params);
    case ArmdozerIds.GENESIS_BRAVER:
      return playerGenesisBraverHUD(params);
    default:
      return new EmptyHUDArmdozer(player);
  }
}

/**
 * 敵側 HUDアームドーザ
 * @param params 生成パラメータ
 * @return HUDアームドーザ
 */
export function enemyArmdozerHUD(
  params: HUDLayerObjectCreatorParams,
): HUDArmdozerObjects {
  const { enemy } = params;
  switch (enemy.armdozer.id) {
    case ArmdozerIds.SHIN_BRAVER:
      return enemyShinBraverHUD(params);
    case ArmdozerIds.NEO_LANDOZER:
      return enemyNeoLandozerHUD(params);
    case ArmdozerIds.LIGHTNING_DOZER:
      return enemyLightningDozerHUD(params);
    case ArmdozerIds.WING_DOZER:
      return enemyWingDozerHUD(params);
    case ArmdozerIds.GENESIS_BRAVER:
      return enemyGenesisBraverHUD(params);
    default:
      return new EmptyHUDArmdozer(enemy);
  }
}
