import type { ArmDozerId, PilotId } from "gbraver-burst-core";
import { ArmDozerIds, PilotIds } from "gbraver-burst-core";

/**
 * アームドーザの専用パイロットを取得する
 * @param armdozerId アームドーザ
 * @return 専用パイロット
 */
export function getDedicatedPilot(armdozerId: ArmDozerId): PilotId {
  switch (armdozerId) {
    case ArmDozerIds.SHIN_BRAVER:
      return PilotIds.SHINYA;
    case ArmDozerIds.NEO_LANDOZER:
      return PilotIds.GAI;
    case ArmDozerIds.LIGHTNING_DOZER:
      return PilotIds.RAITO;
    case ArmDozerIds.WING_DOZER:
      return PilotIds.TSUBASA;
    case ArmDozerIds.GENESIS_BRAVER:
      return PilotIds.YUUYA;
    default:
      return PilotIds.SHINYA;
  }
}
