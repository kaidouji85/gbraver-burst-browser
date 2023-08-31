import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { PathIds } from "../resource/path/ids";
import { PathId } from "../resource/path/resource";

/**
 * アームドーザIDに対応するアイコンのパスIDを返す
 *
 * @param armdozerId アームドーザID
 * @return パスID
 */
export function getArmdozerIconPathId(armdozerId: ArmdozerId): PathId {
  switch (armdozerId) {
    case ArmdozerIds.SHIN_BRAVER:
      return PathIds.SHIN_BRAVER_ICON;
    case ArmdozerIds.NEO_LANDOZER:
      return PathIds.NEO_LANDOZER_ICON;
    case ArmdozerIds.LIGHTNING_DOZER:
      return PathIds.LIGHTNING_DOZER_ICON;
    case ArmdozerIds.WING_DOZER:
      return PathIds.WING_DOZER_ICON;
    case ArmdozerIds.GENESIS_BRAVER:
      return PathIds.GENESIS_BRAVER_ICON;
    default:
      return PathIds.SHIN_BRAVER_ICON;
  }
}
