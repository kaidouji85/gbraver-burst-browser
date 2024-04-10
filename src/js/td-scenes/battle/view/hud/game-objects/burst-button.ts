import { ArmdozerIds } from "gbraver-burst-core";

import {
  genesisBraverBurstButton,
  lightningDozerBurstButton,
  neoLandozerBurstButton,
  shinBraverBurstButton,
  wingDozerBurstButton,
} from "../../../../../game-object/burst-button";
import { BurstButton } from "../../../../../game-object/burst-button/burst-button";
import { GenerateHUDLayerObjectParams } from "../generate-params";

/**
 * アームドーザIDに対応したバーストボタンを生成する
 * @param params 生成パラメータ
 * @return バーストボタン
 */
export function createBurstButton(
  params: GenerateHUDLayerObjectParams,
): BurstButton {
  const { resources, player, gameObjectAction } = params;
  switch (player.armdozer.id) {
    case ArmdozerIds.SHIN_BRAVER:
      return shinBraverBurstButton(resources, gameObjectAction);
    case ArmdozerIds.NEO_LANDOZER:
      return neoLandozerBurstButton(resources, gameObjectAction);
    case ArmdozerIds.LIGHTNING_DOZER:
      return lightningDozerBurstButton(resources, gameObjectAction);
    case ArmdozerIds.WING_DOZER:
      return wingDozerBurstButton(resources, gameObjectAction);
    case ArmdozerIds.GENESIS_BRAVER:
      return genesisBraverBurstButton(resources, gameObjectAction);
    default:
      return shinBraverBurstButton(resources, gameObjectAction);
  }
}
