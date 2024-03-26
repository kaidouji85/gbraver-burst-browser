import { PilotId, PilotIds } from "gbraver-burst-core";

import { PathIds } from "../resource/path/ids";
import { PathId } from "../resource/path/resource";

/**
 * パイロットIDに対応するアイコンのパスIDを返す
 * @param pilotId パイロットID
 * @return パスID
 */
export function getPilotIconPathId(pilotId: PilotId): PathId {
  switch (pilotId) {
    case PilotIds.SHINYA:
      return PathIds.SHINYA_ICON;
    case PilotIds.TSUBASA:
      return PathIds.TSUBASA_ICON;
    case PilotIds.GAI:
      return PathIds.GAI_ICON;
    case PilotIds.RAITO:
      return PathIds.RAITO_ICON;
    case PilotIds.YUUYA:
      return PathIds.YUUYA_ICON;
    default:
      return PathIds.SHINYA_ICON;
  }
}
