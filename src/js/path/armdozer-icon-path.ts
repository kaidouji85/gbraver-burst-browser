import type { ArmDozerId } from "gbraver-burst-core";
import { ArmDozerIds } from "gbraver-burst-core";

import { PathIds } from "../resource/path/ids";
import { PathId } from "../resource/path/resource";

/**
 * アームドーザIDに対応するアイコンのパスIDを返す
 *
 * @param armDozerId アームドーザID
 * @return パスID
 */
export function getArmdozerIconPathId(armDozerId: ArmDozerId): PathId {
  switch (armDozerId) {
    case ArmDozerIds.SHIN_BRAVER:
      return PathIds.SHIN_BRAVER_ICON;
    case ArmDozerIds.NEO_LANDOZER:
      return PathIds.NEO_LANDOZER_ICON;
    case ArmDozerIds.LIGHTNING_DOZER:
      return PathIds.LIGHTNING_DOZER_ICON;
    case ArmDozerIds.WING_DOZER:
      return PathIds.WING_DOZER_ICON;
    case ArmDozerIds.GENESIS_BRAVER:
      return PathIds.GENESIS_BRAVER_ICON;
    default:
      return PathIds.SHIN_BRAVER_ICON;
  }
}
