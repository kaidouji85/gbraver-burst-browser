// @flow

import {ArmdozerIcon} from "./armdozer-icon";
import type {Resources} from "../../../../resource";
import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer";
import {ArmDozerIdList} from "gbraver-burst-core/lib/master/armdozers";

/**
 * アームドーザアイコンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param armdozerId アームドーザID
 * @return 生成結果
 */
export function createArmdozerIcon(resources: Resources, armdozerId: ArmDozerId): ArmdozerIcon {
  switch (armdozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return shinBraverIcon(resources);
    case ArmDozerIdList.NEO_LANDOZER:
      return neoLandozerIcon(resources);
    case ArmDozerIdList.LIGHTNING_DOZER:
      return lightningDozerIcon(resources);
    case ArmDozerIdList.WING_DOZER:
      return wingDozerIcon(resources);
    default:
      return shinBraverIcon(resources);
  }
}

/**
 * シンブレイバーアイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function shinBraverIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(resources, ArmDozerIdList.SHIN_BRAVER);
}

/**
 * ネオランドーザアイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function neoLandozerIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(resources, ArmDozerIdList.NEO_LANDOZER);
}

/**
 * ライトニングドーザアイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function lightningDozerIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(resources, ArmDozerIdList.LIGHTNING_DOZER);
}

/**
 * ウィングドーザアイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function wingDozerIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(resources, ArmDozerIdList.WING_DOZER);
}