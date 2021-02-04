// @flow

import {ArmdozerIcon} from "./armdozer-icon";
import type {Resources} from "../../../../resource";
import type {ArmDozerId} from "gbraver-burst-core";
import {ArmDozerIdList} from "gbraver-burst-core";
import {PathIds} from "../../../../resource/path";

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
  const path = resources.paths.find(v => v.id === PathIds.SHIN_BRAVER_ICON)
    ?.path ?? '';
  return new ArmdozerIcon(resources, path, 'シンブレイバー アイコン');
}

/**
 * ネオランドーザアイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function neoLandozerIcon(resources: Resources): ArmdozerIcon {
  const path = resources.paths.find(v => v.id === PathIds.NEO_LANDOZER_ICON)
    ?.path ?? '';
  return new ArmdozerIcon(resources, path, 'ネオランドーザ アイコン');
}

/**
 * ライトニングドーザアイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function lightningDozerIcon(resources: Resources): ArmdozerIcon {
  const path = resources.paths.find(v => v.id === PathIds.LIGHTNING_DOZER_ICON)
    ?.path ?? '';
  return new ArmdozerIcon(resources, path, 'ライトニングドーザ アイコン');
}

/**
 * ウィングドーザアイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function wingDozerIcon(resources: Resources): ArmdozerIcon {
  const path = resources.paths.find(v => v.id === PathIds.WING_DOZER_ICON)
    ?.path ?? '';
  return new ArmdozerIcon(resources, path, 'ウィングドーザ アイコン');
}