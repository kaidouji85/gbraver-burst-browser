// @flow

import type {PilotId} from "gbraver-burst-core/lib/player/pilot";
import {PilotIcon} from "./pilot-icon";
import type {Resources} from "../../../../resource";
import {PilotIds} from "gbraver-burst-core/lib/master/pilots";

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
    default:
      return shinyaIcon(resources);
  }
}

/**
 * シンヤアイコン
 * 
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function shinyaIcon(resources: Resources): PilotIcon {
  return new PilotIcon(resources, PilotIds.SHINYA);
}

/**
 *
 * ガイアイコン
 *
 * @param resources リソース管理オブジェクト
 * @return 生成結果
 */
function gaiIcon(resources: Resources): PilotIcon {
  return new PilotIcon(resources, PilotIds.GAI)
}