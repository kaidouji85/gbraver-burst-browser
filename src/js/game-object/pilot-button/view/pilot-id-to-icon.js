// @flow

import type {PilotIcon} from "./pilot-icon";
import type {PilotId} from "gbraver-burst-core";
import {PilotIds} from "gbraver-burst-core";
import type {Resources} from "../../../resource";
import {ShinyaIcon} from "./shinya";
import {GaiIcon} from "./gai";

/**
 * パイロットIDに対応したパイロットアイコンを生成する
 *
 * @param pilotId パイロットID
 * @param resources リソース管理オブジェクト
 * @return パイロットアイコン
 */
export function createPilotIcon(pilotId: PilotId, resources: Resources): PilotIcon {
  switch(pilotId) {
    case PilotIds.SHINYA:
      return new ShinyaIcon(resources);
    case PilotIds.GAI:
      return new GaiIcon(resources);
    default:
      return new ShinyaIcon(resources);
  }
}