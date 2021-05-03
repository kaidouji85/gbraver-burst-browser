// @flow

import type {ArmDozerId, PilotId} from "gbraver-burst-core";
import {ArmDozerIdList, PilotIds} from "gbraver-burst-core";

/**
 * アームドーザの専用パイロットを取得する
 *
 * @param armdozerId アームドーザ
 * @return 専用パイロット
 */
export function getDedicatedPilot(armdozerId: ArmDozerId): PilotId {
  switch(armdozerId) {
    case ArmDozerIdList.SHIN_BRAVER:
      return PilotIds.SHINYA;
    case ArmDozerIdList.NEO_LANDOZER:
      return PilotIds.GAI;
    case ArmDozerIdList.LIGHTNING_DOZER:
      return PilotIds.RAITO;
    case ArmDozerIdList.WING_DOZER:
      return PilotIds.TSUBASA;
    default:
      return PilotIds.SHINYA;
  }
}