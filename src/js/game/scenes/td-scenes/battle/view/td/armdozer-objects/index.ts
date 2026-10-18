import { ArmdozerIds } from "gbraver-burst-core";

import { TDLayerObjectCreatorParams } from "../creator-params";
import type { TDArmdozerObjects } from "./armdozer-objects";
import { enemyGenesisBraverTD, playerGenesisBraverTD } from "./genesis-braver";
import { enemyGranDozerTD, playerGranDozerTD } from "./gran-dozer";
import {
  enemyLightningDozerTD,
  playerLightningDozerTD,
} from "./lightning-dozer";
import { enemyNeoLandozerTD, playerNeoLandozerTD } from "./neo-landozer";
import { enemyShinBraverTD, playerShinBraverTD } from "./shin-braver";
import { enemyWingDozerTD, playerWingDozerTD } from "./wing-dozer";

/**
 * プレイヤー側  3Dレイヤー アームドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function playerTDArmdozer(
  params: TDLayerObjectCreatorParams,
): TDArmdozerObjects {
  const { player } = params;
  switch (player.armdozer.id) {
    case ArmdozerIds.SHIN_BRAVER:
      return playerShinBraverTD(params);
    case ArmdozerIds.LIGHTNING_DOZER:
      return playerLightningDozerTD(params);
    case ArmdozerIds.WING_DOZER:
      return playerWingDozerTD(params);
    case ArmdozerIds.NEO_LANDOZER:
      return playerNeoLandozerTD(params);
    case ArmdozerIds.GENESIS_BRAVER:
      return playerGenesisBraverTD(params);
    case ArmdozerIds.GRAN_DOZER:
      return playerGranDozerTD(params);
    default:
      return playerShinBraverTD(params);
  }
}

/**
 * 敵側  3Dレイヤー アームドーザ固有オブジェクト
 * @param params 生成パラメータ
 * @returns 生成結果
 */
export function enemyTDArmdozer(
  params: TDLayerObjectCreatorParams,
): TDArmdozerObjects {
  const { enemy } = params;
  switch (enemy.armdozer.id) {
    case ArmdozerIds.SHIN_BRAVER:
      return enemyShinBraverTD(params);
    case ArmdozerIds.LIGHTNING_DOZER:
      return enemyLightningDozerTD(params);
    case ArmdozerIds.WING_DOZER:
      return enemyWingDozerTD(params);
    case ArmdozerIds.NEO_LANDOZER:
      return enemyNeoLandozerTD(params);
    case ArmdozerIds.GENESIS_BRAVER:
      return enemyGenesisBraverTD(params);
    case ArmdozerIds.GRAN_DOZER:
      return enemyGranDozerTD(params);
    default:
      return enemyShinBraverTD(params);
  }
}
