// @flow

import type {ArmDozerId} from "gbraver-burst-core/lib/player/armdozer";
import {ArmDozerIdList} from "gbraver-burst-core";
import type {PathId} from "../resource/path";
import {PathIds} from "../resource/path";

/**
 * アームドーザIDに対応するアイコンのパスIDを返す
 *
 * @param armDozerId アームドーザID
 * @return パスID
 */
export function getArmdozerIconPathId(armDozerId: ArmDozerId): PathId {
  switch (armDozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return PathIds.SHIN_BRAVER_ICON
    case ArmDozerIdList.NEO_LANDOZER:
      return PathIds.NEO_LANDOZER_ICON;
    case ArmDozerIdList.LIGHTNING_DOZER:
      return PathIds.LIGHTNING_DOZER_ICON;
    case ArmDozerIdList.WING_DOZER:
      return PathIds.WING_DOZER_ICON;
    default:
      return PathIds.SHIN_BRAVER_ICON;
  }
}