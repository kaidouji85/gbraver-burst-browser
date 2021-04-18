// @flow

import type {PilotId} from "gbraver-burst-core";
import {PilotIcon} from "./pilot-icon";
import type {Resources} from "../../../../resource";
import {PilotIds} from "gbraver-burst-core";
import {PathIds} from "../../../../resource/path";

/**
 * パイロットアイコンを生成する
 *
 * @param resources リソース管理オブジェクト
 * @param pilotId パイロットID
 * @return 生成結果
 */
export function createPilotIcon(resources: Resources, pilotId: PilotId): PilotIcon {
  switch (pilotId) {
    case PilotIds.SHINYA:
      return shinyaIcon(resources);
    case PilotIds.GAI:
      return gaiIcon(resources);
    case PilotIds.RAITO:
      return raitoIcon(resources);
    case PilotIds.TSUBASA:
      return tsubasaIcon(resources);
    default:
      return shinyaIcon(resources);
  }
}

/**
 * シンヤ アイコン
 * 
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function shinyaIcon(resources: Resources): PilotIcon {
  const path = resources.paths.find(v => v.id === PathIds.SHINYA_ICON)
    ?.path ?? '';
  return new PilotIcon(resources, path, 'シンヤ アイコン');
}

/**
 *
 * ガイ アイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function gaiIcon(resources: Resources): PilotIcon {
  const path = resources.paths.find(v => v.id === PathIds.GAI_ICON)
    ?.path ?? '';
  return new PilotIcon(resources, path, 'ガイ アイコン');
}

/**
 * ライト アイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function raitoIcon(resources: Resources): PilotIcon {
  const path = resources.paths.find(v => v.id === PathIds.RAITO_ICON)
    ?.path ?? '';
  return new PilotIcon(resources, path, 'ライト アイコン');
}

/**
 * ツバサ アイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function tsubasaIcon(resources: Resources): PilotIcon {
  const path = resources.paths.find(v => v.id === PathIds.TSUBASA_ICON)
    ?.path ?? '';
  return new PilotIcon(resources, path, 'ツバサ アイコン');
}