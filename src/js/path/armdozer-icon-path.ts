import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { PathIds } from "../resource/path/ids";
import { PathId } from "../resource/path/resource";

/** アームドーザIDと対応するアイコンのパスIDのマッピング */
const ArmdozerIconPathIds: Record<ArmdozerId, PathId> = {
  [ArmdozerIds.SHIN_BRAVER]: PathIds.SHIN_BRAVER_ICON,
  [ArmdozerIds.NEO_LANDOZER]: PathIds.NEO_LANDOZER_ICON,
  [ArmdozerIds.LIGHTNING_DOZER]: PathIds.LIGHTNING_DOZER_ICON,
  [ArmdozerIds.WING_DOZER]: PathIds.WING_DOZER_ICON,
  [ArmdozerIds.GENESIS_BRAVER]: PathIds.GENESIS_BRAVER_ICON,
  [ArmdozerIds.GRAN_DOZER]: PathIds.GRAN_DOZER_ICON,
};

/**
 * アームドーザIDに対応するアイコンのパスIDを返す
 * @param armdozerId アームドーザID
 * @returns パスID
 */
export const getArmdozerIconPathId = (armdozerId: ArmdozerId): PathId =>
  ArmdozerIconPathIds[armdozerId] ?? PathIds.SHIN_BRAVER_ICON;
