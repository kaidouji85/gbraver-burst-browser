import { ArmdozerId, ArmdozerIds } from "gbraver-burst-core";

import { PathIds } from "../resource/path/ids";
import { PathId } from "../resource/path/resource";

/** アームドーザIDと対応するバストショットのパスIDのマッピング */
const ArmdozerBurstShotPathIds: Record<ArmdozerId, PathId> = {
  [ArmdozerIds.SHIN_BRAVER]: PathIds.SHIN_BRAVER_BUST_SHOT,
  [ArmdozerIds.WING_DOZER]: PathIds.WING_DOZER_BUST_SHOT,
  [ArmdozerIds.NEO_LANDOZER]: PathIds.NEO_LANDOZER_BUST_SHOT,
  [ArmdozerIds.LIGHTNING_DOZER]: PathIds.LIGHTNING_DOZER_BUST_SHOT,
  [ArmdozerIds.GENESIS_BRAVER]: PathIds.GENESIS_BRAVER_BUST_SHOT,
};

/**
 * アームドーザIDに対応するバストショットのパスIDを返す
 * @param armdozerId アームドーザID
 * @returns パスID
 */
export const getArmdozerBustShotPathId = (armdozerId: ArmdozerId): PathId =>
  ArmdozerBurstShotPathIds[armdozerId] ?? PathIds.SHIN_BRAVER_BUST_SHOT;
