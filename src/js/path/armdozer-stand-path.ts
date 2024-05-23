import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { PathIds } from "../resource/path/ids";
import { PathId } from "../resource/path/resource";

/** アームドーザIDと対応する立ち絵のパスIDのマッピング */
const ArmdozerStandPathIds: Record<ArmdozerId, PathId> = {
  [ArmdozerIds.SHIN_BRAVER]: PathIds.SHIN_BRAVER_STAND,
  [ArmdozerIds.WING_DOZER]: PathIds.WING_DOZER_STAND,
  [ArmdozerIds.NEO_LANDOZER]: PathIds.NEO_LANDOZER_STAND,
  [ArmdozerIds.LIGHTNING_DOZER]: PathIds.LIGHTNING_DOZER_STAND,
  [ArmdozerIds.GENESIS_BRAVER]: PathIds.GENESIS_BRAVER_STAND,
};

/**
 * アームドーザIDに対応する立ち絵のパスIDを返す
 * @param armdozerId アームドーザID
 * @returns パスID
 */
export const getArmdozerStandPathId = (armdozerId: ArmdozerId): PathId =>
  ArmdozerStandPathIds[armdozerId] ?? PathIds.SHIN_BRAVER_STAND;
