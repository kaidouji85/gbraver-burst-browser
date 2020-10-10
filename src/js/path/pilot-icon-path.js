// @flow

import type {PilotId} from "gbraver-burst-core/lib/player/pilot";
import {PilotIds} from "gbraver-burst-core/lib/master/pilots";
import {PathIds} from "../resource/path";
import type {PathId} from "../resource/path";

/**
 * パイロットIDに対応したアイコンのパスIDを取得する
 *
 * @param pilotId パイロットID
 * @return 対応するアイコンのパスID
 */
export function getPilotIconPathId(pilotId: PilotId): PathId {
  switch (pilotId) {
    case PilotIds.SHINYA:
      return PathIds.SHINYA_ICON;
    case PilotIds.GAI:
      return PathIds.GAI_ICON;
    default:
      return PathIds.SHINYA_ICON;
  }
}
