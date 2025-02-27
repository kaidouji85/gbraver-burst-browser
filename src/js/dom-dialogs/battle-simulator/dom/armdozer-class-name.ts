import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { ROOT } from "./class-name";

/**
 * アームドーザのクラス名のサフィックスを取得する
 * @param armdozerId アームドーザID
 * @returns クラス名のサフィックス
 */
function getArmdozerClassNameSuffix(armdozerId: ArmdozerId) {
  switch (armdozerId) {
    case ArmdozerIds.NEO_LANDOZER:
      return "neo-landozer";
    case ArmdozerIds.LIGHTNING_DOZER:
      return "lightning-dozer";
    case ArmdozerIds.WING_DOZER:
      return "wing-dozer";
    case ArmdozerIds.GENESIS_BRAVER:
      return "genesis-braver";
    case ArmdozerIds.GRAN_DOZER:
      return "gran-dozer";
    default:
      return "shin-braver";
  }
}

/**
 * プレイヤーのアームドーザのクラス名を取得する
 * @param armdozerId アームドーザID
 * @returns クラス名
 */
export const getPlayerArmdozerClassName = (armdozerId: ArmdozerId) =>
  `${ROOT}__player-${getArmdozerClassNameSuffix(armdozerId)}`;

/**
 * 敵のアームドーザのクラス名を取得する
 * @param armdozerId アームドーザID
 * @returns クラス名
 */
export const getEnemyArmdozerClassName = (armdozerId: ArmdozerId) =>
  `${ROOT}__enemy-${getArmdozerClassNameSuffix(armdozerId)}`;
