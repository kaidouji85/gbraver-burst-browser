import { ArmdozerIds } from "gbraver-burst-core";

import {
  genesisBraverBurstButton,
  lightningDozerBurstButton,
  neoLandozerBurstButton,
  shinBraverBurstButton,
  wingDozerBurstButton,
} from "../../../../../game-object/burst-button";
import { BurstButton } from "../../../../../game-object/burst-button/burst-button";
import { HUDLayerObjectCreatorParams } from "../creator-params";

/**
 * アームドーザIDに対応したバーストボタンを生成する
 * @param params 生成パラメータ
 * @return バーストボタン
 */
export function createBurstButton(
  params: HUDLayerObjectCreatorParams,
): BurstButton {
  const { player } = params;
  switch (player.armdozer.id) {
    case ArmdozerIds.SHIN_BRAVER:
      return shinBraverBurstButton(params);
    case ArmdozerIds.NEO_LANDOZER:
      return neoLandozerBurstButton(params);
    case ArmdozerIds.LIGHTNING_DOZER:
      return lightningDozerBurstButton(params);
    case ArmdozerIds.WING_DOZER:
      return wingDozerBurstButton(params);
    case ArmdozerIds.GENESIS_BRAVER:
      return genesisBraverBurstButton(params);
    default:
      return shinBraverBurstButton(params);
  }
}
