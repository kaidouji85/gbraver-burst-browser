// @flow

import {ArmdozerIconView} from "./armdozer-icon-view";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {ResourcePath} from "../../../../resource/path/resource-path";
import type {ArmDozerId} from "gbraver-burst-core";

/**
 * アームドーザアイコンを生成する
 *
 * @param armDozerId アームドーザID
 * @param resourcePath リソースパス
 * @return 生成結果
 */
export function createArmdozerIcon(armDozerId: ArmDozerId, resourcePath: ResourcePath): ArmdozerIconView {
  switch (armDozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return shinBraverIcon(resourcePath);
    case ArmDozerIdList.NEO_LANDOZER:
      return neoLandozerIcon(resourcePath);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return lightningDozerIcon(resourcePath);
    default:
      return shinBraverIcon(resourcePath);
  }
}

/**
 * シンブレイバー アイコン を生成する
 *
 * @param resourcePath リソースパス
 * @return 生成結果
 */
function shinBraverIcon(resourcePath: ResourcePath): ArmdozerIconView {
  return new ArmdozerIconView(
    ArmDozerIdList.SHIN_BRAVER,
    `${resourcePath.get()}/armdozer/shin-braver/player-select.png`
  );
}

/**
 * ネオランドーザ アイコン を生成する
 *
 * @param resourcePath リソースパス
 * @return 生成結果
 */
function neoLandozerIcon(resourcePath: ResourcePath): ArmdozerIconView {
  return new ArmdozerIconView(
    ArmDozerIdList.NEO_LANDOZER,
    `${resourcePath.get()}/armdozer/neo-landozer/player-select.png`
  );
}

/**
 * ライトニングドーザ アイコン を生成する
 *
 * @param resourcePath リソースパス
 * @return 生成結果
 */
function lightningDozerIcon(resourcePath: ResourcePath): ArmdozerIconView {
  return new ArmdozerIconView(
    ArmDozerIdList.LIGHTNING_DOZER,
    `${resourcePath.get()}/armdozer/ligjtning-dozer/player-select.png`
  );
}
