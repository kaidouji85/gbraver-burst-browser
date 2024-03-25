import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import type { Resources } from "../../../resource";
import { PathIds } from "../../../resource/path/ids";
import { ArmdozerIcon } from "./armdozer-icon";

/**
 * シンブレイバーアイコン
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function shinBraverIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(
    resources,
    PathIds.SHIN_BRAVER_ICON,
    "シンブレイバー アイコン",
  );
}

/**
 * ネオランドーザアイコン
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function neoLandozerIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(
    resources,
    PathIds.NEO_LANDOZER_ICON,
    "ネオランドーザ アイコン",
  );
}

/**
 * ライトニングドーザアイコン
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function lightningDozerIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(
    resources,
    PathIds.LIGHTNING_DOZER_ICON,
    "ライトニングドーザ アイコン",
  );
}

/**
 * ウィングドーザアイコン
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function wingDozerIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(
    resources,
    PathIds.WING_DOZER_ICON,
    "ウィングドーザ アイコン",
  );
}

/**
 * ジェネシスブレイバーアイコン
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function genesisBraverIcon(resources: Resources): ArmdozerIcon {
  return new ArmdozerIcon(
    resources,
    PathIds.GENESIS_BRAVER_ICON,
    "ジェネシスブレイバー アイコン",
  );
}

/**
 * アームドーザアイコンを生成する
 * @param resources リソース管理オブジェクト
 * @param armdozerId アームドーザID
 * @return 生成結果
 */
export function createArmdozerIcon(
  resources: Resources,
  armdozerId: ArmdozerId,
): ArmdozerIcon {
  switch (armdozerId) {
    case ArmdozerIds.SHIN_BRAVER:
      return shinBraverIcon(resources);
    case ArmdozerIds.NEO_LANDOZER:
      return neoLandozerIcon(resources);
    case ArmdozerIds.LIGHTNING_DOZER:
      return lightningDozerIcon(resources);
    case ArmdozerIds.WING_DOZER:
      return wingDozerIcon(resources);
    case ArmdozerIds.GENESIS_BRAVER:
      return genesisBraverIcon(resources);
    default:
      return shinBraverIcon(resources);
  }
}
